import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Either, left, right } from '@sweet-monads/either';
import { LogoutOutput } from 'shared';
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

import { NotFoundException } from '$exceptions';
import { AuthExceptionMessage } from '$exceptions/constants/auth';
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

  async create(
    params: CreateParams,
  ): Promise<Either<UnauthorizedException, void>> {
    const { response, userId, email } = params;

    const queryRunner = this.dataSource.createQueryRunner();

    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      const tokens = await this.save({ userId, email }, queryRunner);

      this.tokenService.insertInCookies({ response, ...tokens });
      await queryRunner.commitTransaction();

      return right(undefined);
    } catch (error) {
      await queryRunner.rollbackTransaction();

      return left(new UnauthorizedException());
    } finally {
      await queryRunner.release();
    }
  }

  async verify(
    params: VerifyParams,
  ): Promise<
    Either<UnauthorizedException | NotFoundException, VerifyResponse>
  > {
    const { signedAccessToken, signedRefreshToken, response } = params;

    if (signedAccessToken === undefined || signedRefreshToken === undefined) {
      return this.update(signedRefreshToken, response);
    }

    const decodedResult = await this.tokenService.decode(
      signedAccessToken,
      'accessToken',
    );

    if (decodedResult.isLeft()) {
      return this.update(signedRefreshToken, response);
    }

    const { userId, email } = decodedResult.value;

    const userResult = await this.userService.findOne({ id: userId, email });

    if (userResult.isLeft()) {
      return this.update(signedRefreshToken, response);
    }

    return right({
      userId,
      email,
      signedAccessToken,
      signedRefreshToken,
    });
  }

  async refresh(
    response: GqlContext['res'],
  ): Promise<Either<UnauthorizedException | NotFoundException, boolean>> {
    try {
      const { signedRefreshToken } = this.tokenService.getFromCookies(response);

      const updateResult = await this.update(signedRefreshToken, response);

      if (updateResult.isLeft()) {
        return left(updateResult.value);
      }

      const { signedAccessToken, signedRefreshToken: newRefreshToken } =
        updateResult.value;

      this.tokenService.insertInCookies({
        response,
        signedAccessToken,
        signedRefreshToken: newRefreshToken,
      });

      return right(true);
    } catch (error) {
      return left(
        new UnauthorizedException(AuthExceptionMessage.COOKIE_FAILED),
      );
    }
  }

  async update(
    signedRefreshToken?: string,
    response?: GqlContext['res'],
  ): Promise<
    Either<UnauthorizedException | NotFoundException, UpdateResponse>
  > {
    if (signedRefreshToken === undefined) {
      return left(new UnauthorizedException());
    }

    // IMPERATIVE WAY

    const decodedResult = await this.tokenService.decode(
      signedRefreshToken,
      'refreshToken',
    );

    if (decodedResult.isLeft()) {
      return left(decodedResult.value);
    }

    const userResult = await this.userService.getBySession(
      decodedResult.value.decodedRefreshToken,
    );

    if (userResult.isLeft()) {
      return left(userResult.value);
    }

    const { id: userId, email } = userResult.value;

    const tokensResult = await this.save({
      userId,
      email,
      decodedRefreshToken: signedRefreshToken,
    });

    // Set new tokens in cookies if response is provided
    if (response) {
      this.tokenService.insertInCookies({ response, ...tokensResult });
    }

    return right({
      email,
      userId,
      ...tokensResult,
    });

    // FUNCTIONAL WAY WITH .THEN()

    // return this.tokenService
    //   .decode(signedRefreshToken, 'refreshToken')
    //   .then((result) =>
    //     result.asyncChain(({ decodedRefreshToken }) =>
    //       this.userService.getBySession(decodedRefreshToken),
    //     ),
    //   )
    //   .then((result) =>
    //     result.asyncChain(async ({ id: userId, email }) => {
    //       const tokensResult = await this.save({
    //         userId,
    //         email,
    //       });

    //       return tokensResult.map((tokens) => ({
    //         email,
    //         userId,
    //         ...tokens,
    //       }));
    //     }),
    //   );

    // FUNCTIONAL WAY WITH AWAIT

    // return (
    //   await (
    //     await this.tokenService.decode(signedRefreshToken, 'refreshToken')
    //   ).asyncChain(({ decodedRefreshToken }) =>
    //     this.userService.getBySession(decodedRefreshToken),
    //   )
    // ).asyncChain(async ({id: userId, email}) => {
    //   const tokensResult = await this.save({
    //     userId,
    //     email,
    //   });

    //   return tokensResult.map((tokens) => ({
    //     email,
    //     userId,
    //     ...tokens,
    //   }));
    // });
  }

  async delete(
    response: GqlContext['res'],
  ): Promise<Either<UnauthorizedException, LogoutOutput>> {
    try {
      const { signedRefreshToken } = this.tokenService.getFromCookies(response);

      if (signedRefreshToken === undefined) {
        return left(new UnauthorizedException());
      }

      const decodedResult = await this.tokenService.decode(
        signedRefreshToken,
        'refreshToken',
      );

      if (decodedResult.isLeft()) {
        return left(decodedResult.value);
      }

      const queryRunner = this.dataSource.createQueryRunner();

      await queryRunner.connect();
      await queryRunner.startTransaction();

      try {
        const sessionDeleteResult = await queryRunner.manager.delete(
          SessionEntity,
          {
            refreshToken: decodedResult.value.decodedRefreshToken,
          },
        );

        if (sessionDeleteResult.affected === 0) {
          await queryRunner.rollbackTransaction();

          return left(new UnauthorizedException());
        }

        this.tokenService.removeFromCookies(response);
        await queryRunner.commitTransaction();

        return right({
          success: true,
        });
      } catch (error) {
        await queryRunner.rollbackTransaction();

        return left(new UnauthorizedException());
      } finally {
        await queryRunner.release();
      }
    } catch (error) {
      return left(new UnauthorizedException());
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
