import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';

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
import { JwtPayload, SingedTokens } from '$modules/token/types';

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
    try {
      const { response, userId, email } = params;

      const queryRunner = this.dataSource.createQueryRunner();

      await queryRunner.connect();
      await queryRunner.startTransaction();

      // to add both to database and from cookies
      try {
        const tokens = await this.save({ userId, email });

        this.tokenService.insertInCookies({ response, ...tokens });
        await queryRunner.commitTransaction();
      } catch (error) {
        await queryRunner.rollbackTransaction();
      } finally {
        await queryRunner.release();
      }
    } catch (error) {
      throw new UnauthorizedException();
    }
  }

  async verify(params: VerifyParams): Promise<VerifyResponse> {
    const { signedAccessToken, signedRefreshToken } = params;

    try {
      const { userId, email } = await this.tokenService.decodeToken(
        signedAccessToken,
        'accessToken',
      );

      await this.userService.strictFindOne({ id: userId, email });

      return {
        user: { userId, email },
        tokens: {
          signedAccessToken: signedAccessToken!,
          signedRefreshToken: signedRefreshToken!,
        },
      };
    } catch {
      return this.update(signedRefreshToken);
    }
  }

  async refresh(response: GqlContext['res']): Promise<boolean> {
    try {
      const { signedRefreshToken } = this.tokenService.getFromCookies(response);

      const { tokens } = await this.update(signedRefreshToken);

      this.tokenService.insertInCookies({ response, ...tokens });

      return true;
    } catch (error) {
      throw new UnauthorizedException(); // TODO: proper error handling
    }
  }

  async update(signedRefreshToken?: string): Promise<UpdateResponse> {
    try {
      const { decodedRefreshToken } = await this.tokenService.decodeToken(
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
        tokens: newTokens,
        user: { email, userId },
      };
    } catch {
      throw new UnauthorizedException();
    }
  }

  async delete(response: GqlContext['res']): Promise<boolean> {
    try {
      const {
        refreshToken: { decodedRefreshToken },
      } = await this.tokenService.decodeFromCookies(response);

      const queryRunner = this.dataSource.createQueryRunner();

      await queryRunner.connect();
      await queryRunner.startTransaction();

      // to remove both from database and from cookies
      try {
        const sessionDeleteResult = await this.sessionRepository.delete({
          refreshToken: decodedRefreshToken,
        });

        if (sessionDeleteResult.affected === 0) {
          throw new UnauthorizedException();
        }

        this.tokenService.removeFromCookies(response);
        await queryRunner.commitTransaction();
      } catch (error) {
        await queryRunner.rollbackTransaction();
      } finally {
        await queryRunner.release();
      }

      return true;
    } catch (error) {
      throw new UnauthorizedException();
    }
  }

  private async save(params: SaveParams): Promise<SingedTokens> {
    const { userId, email, decodedRefreshToken } = params;

    const session = await this.sessionRepository.findOne({
      where: { refreshToken: decodedRefreshToken, user: { id: userId } },
    });

    const uuidString = this.cryptoService.generateUUID();

    const createTokensPayload: JwtPayload = {
      accessToken: { userId, email },
      refreshToken: { decodedRefreshToken: uuidString },
    };

    const tokens = await this.tokenService.create(createTokensPayload);

    await this.sessionRepository.save({
      id: session?.id ?? undefined,
      user: { id: userId },
      refreshToken: uuidString,
    });

    return tokens;
  }
}
