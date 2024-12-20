import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';

import { SessionEntity } from './session.entity';
import { CreateParams, SaveParams, VerifyParams } from './session.types';

import { UserService } from '../user/user.service';

import { Config } from '$config';
import { GqlContext } from '$modules/app/types';
import { CryptoService } from '$modules/crypto/crypto.service';
import { TokenService } from '$modules/token/token.service';
import { JwtPayload, SingedTokens } from '$modules/token/token.types';

@Injectable()
export class SessionService {
  constructor(
    @InjectRepository(SessionEntity)
    private readonly sessionRepository: Repository<SessionEntity>,
    private readonly tokenService: TokenService,
    private readonly userService: UserService,
    private readonly cryptoService: CryptoService,
    private readonly configService: ConfigService<Config>,
    private readonly dataSource: DataSource,
  ) {}

  async create(params: CreateParams): Promise<void> {
    try {
      const { response, userId, email } = params;

      const tokens = await this.save({ userId, email });

      this.tokenService.insertTokensInCookies({ response, ...tokens });
    } catch (error) {
      throw new UnauthorizedException(); // TODO: proper error handling
    }
  }

  async verify(params: VerifyParams): Promise<SingedTokens> {
    const { signedAccessToken, signedRefreshToken } = params;

    try {
      const { userId, email } = await this.tokenService.decode(
        signedAccessToken,
        'accessToken',
      );

      await this.userService.strictFindOne({ id: userId, email });

      return {
        signedAccessToken: signedAccessToken!,
        signedRefreshToken: signedRefreshToken!,
      };
    } catch {
      return this.update(signedRefreshToken);
    }
  }

  async update(signedRefreshToken?: string): Promise<SingedTokens> {
    try {
      const { refreshToken: decodedRefreshToken } =
        await this.tokenService.decode(signedRefreshToken, 'refreshToken');

      const user = await this.userService.getBySession(decodedRefreshToken);
      const { id, email } = user;

      const newTokens = await this.save({
        userId: id,
        email,
        decodedRefreshToken,
      });

      return newTokens;
    } catch {
      throw new UnauthorizedException();
    }
  }

  async delete(response: GqlContext['res']): Promise<boolean> {
    try {
      const { refreshToken } = this.configService.getOrThrow('jwt', {
        infer: true,
      });

      const { refreshToken: decodedRefreshToken } =
        await this.tokenService.decode(
          response.req.signedCookies[refreshToken.cookieName] as string,
          'refreshToken',
        );

      const queryRunner = this.dataSource.createQueryRunner();

      await queryRunner.connect();
      await queryRunner.startTransaction();

      // to remove from database and cookies
      try {
        const sessionDeleteResult = await this.sessionRepository.delete({
          refreshToken: decodedRefreshToken,
        });

        if (sessionDeleteResult.affected === 0) {
          throw new Error();
        }

        this.tokenService.removeTokensFromCookies(response);
        await queryRunner.commitTransaction();
      } catch (error) {
        await queryRunner.rollbackTransaction();
      } finally {
        await queryRunner.release();
      }

      return true;
    } catch (error) {
      throw new Error();
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
      refreshToken: { refreshToken: uuidString },
    };

    const tokens = await this.tokenService.create(createTokensPayload);

    await this.sessionRepository.save({
      id: session?.id,
      user: { id: userId },
      refreshToken: uuidString,
    });

    return tokens;
  }
}
