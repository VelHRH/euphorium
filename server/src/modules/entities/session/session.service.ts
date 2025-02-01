import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, QueryRunner, Repository } from 'typeorm';

import { SessionEntity } from './session.entity';
import {
  CreateParams,
  SaveParams,
  UpdateResponse,
  VerifyParams,
  VerifyResponse,
} from './types';

import { UserService } from '../user/user.service';

import { GqlContext } from '$modules/app/types';
import { CryptoService } from '$modules/crypto/crypto.service';
import { TokenService } from '$modules/token/token.service';
import { JwtPayload, SignedTokens } from '$modules/token/types';

@Injectable()
export class SessionService {
  constructor(
    @InjectRepository(SessionEntity)
    private readonly sessionRepository: Repository<SessionEntity>,
    private readonly tokenService: TokenService,
    private readonly userService: UserService,
    private readonly cryptoService: CryptoService,
    private readonly dataSource: DataSource,
  ) {}

  async create(params: CreateParams): Promise<void> {
    const { response, userId, email } = params;

    const queryRunner = this.dataSource.createQueryRunner();

    await queryRunner.connect();
    await queryRunner.startTransaction();

    // to add both to database and to cookies
    try {
      const tokens = await this.save({ userId, email }, queryRunner);

      this.tokenService.insertInCookies({ response, ...tokens });
      await queryRunner.commitTransaction();
    } catch (error) {
      await queryRunner.rollbackTransaction();

      throw new UnauthorizedException();
    } finally {
      await queryRunner.release();
    }
  }

  async verify(params: VerifyParams): Promise<VerifyResponse> {
    const { signedAccessToken, signedRefreshToken } = params;

    try {
      if (!signedAccessToken || !signedRefreshToken) {
        throw new UnauthorizedException();
      }

      const { userId, email } = await this.tokenService.decode(
        signedAccessToken,
        'accessToken',
      );

      await this.userService.strictFindOne({ id: userId, email });

      return {
        userId,
        email,
        signedAccessToken,
        signedRefreshToken,
      };
    } catch {
      return this.update(signedRefreshToken);
    }
  }

  async refresh(response: GqlContext['res']): Promise<boolean> {
    try {
      const { signedRefreshToken: inputRefreshToken } =
        this.tokenService.getFromCookies(response);

      const { signedAccessToken, signedRefreshToken } =
        await this.update(inputRefreshToken);

      this.tokenService.insertInCookies({
        response,
        signedAccessToken,
        signedRefreshToken,
      });

      return true;
    } catch (error) {
      throw new UnauthorizedException(); // TODO: proper error handling
    }
  }

  async update(signedRefreshToken?: string): Promise<UpdateResponse> {
    try {
      if (!signedRefreshToken) {
        throw new UnauthorizedException();
      }

      const { decodedRefreshToken } = await this.tokenService.decode(
        signedRefreshToken,
        'refreshToken',
      );

      const user = await this.userService.getBySession(decodedRefreshToken);
      const { id: userId, email } = user;

      const newTokens = await this.save({
        userId,
        email,
        decodedRefreshToken,
      });

      return {
        email,
        userId,
        ...newTokens,
      };
    } catch {
      throw new UnauthorizedException();
    }
  }

  async delete(response: GqlContext['res']): Promise<boolean> {
    try {
      const { signedRefreshToken } = this.tokenService.getFromCookies(response);

      const decodedRefreshToken = signedRefreshToken
        ? (await this.tokenService.decode(signedRefreshToken, 'refreshToken'))
            .decodedRefreshToken
        : null;

      const queryRunner = this.dataSource.createQueryRunner();

      await queryRunner.connect();
      await queryRunner.startTransaction();

      // to remove both from database and from cookies
      try {
        const sessionDeleteResult = await queryRunner.manager.delete(
          SessionEntity,
          {
            refreshToken: decodedRefreshToken,
          },
        );

        if (sessionDeleteResult.affected === 0) {
          throw new UnauthorizedException();
        }

        this.tokenService.removeFromCookies(response);
        await queryRunner.commitTransaction();
      } catch (error) {
        await queryRunner.rollbackTransaction();

        throw new UnauthorizedException();
      } finally {
        await queryRunner.release();
      }

      return true;
    } catch (error) {
      throw new UnauthorizedException();
    }
  }

  private async save(
    params: SaveParams,
    queryRunner?: QueryRunner,
  ): Promise<SignedTokens> {
    const { userId, email, decodedRefreshToken } = params;

    const manager = queryRunner
      ? queryRunner.manager
      : this.sessionRepository.manager;

    const session = await manager.findOne(SessionEntity, {
      where: { refreshToken: decodedRefreshToken, user: { id: userId } },
    });

    const uuidString = this.cryptoService.generateUUID();

    const createTokensPayload: JwtPayload = {
      accessToken: { userId, email },
      refreshToken: { decodedRefreshToken: uuidString },
    };

    const tokens = await this.tokenService.create(createTokensPayload);

    await manager.save(SessionEntity, {
      id: session?.id,
      user: { id: userId },
      refreshToken: uuidString,
    });

    return tokens;
  }
}
