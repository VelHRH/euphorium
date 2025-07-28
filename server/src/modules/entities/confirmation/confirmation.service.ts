import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectRepository } from '@nestjs/typeorm';
import { Either, left, right } from '@sweet-monads/either';
import { AuthExceptionMessage } from 'common/exceptions/constants/auth';
import { add, isBefore } from 'date-fns';
import { ConfirmationType } from 'shared';
import { DataSource, FindOptionsWhere, QueryRunner, Repository } from 'typeorm';

import { ConfirmationEntity } from './confirmation.entity';
import { CreateConfirmationParams, SendConfirmationParams } from './types';

import { Config } from '$config';
import { CryptoService } from '$modules/crypto/crypto.service';
import { MailTemplateConfig } from '$modules/mail/constants';
import { MailService } from '$modules/mail/mail.service';

@Injectable()
export class ConfirmationService {
  private readonly appConfig: Config['app'];

  constructor(
    @InjectRepository(ConfirmationEntity)
    private readonly confirmationRepository: Repository<ConfirmationEntity>,
    private readonly mailService: MailService,
    private readonly cryptoService: CryptoService,
    private readonly dataSource: DataSource,
    configService: ConfigService<Config>,
  ) {
    this.appConfig = configService.getOrThrow('app', { infer: true });
  }

  async validate(
    token: string,
  ): Promise<Either<UnauthorizedException, ConfirmationEntity>> {
    const confirmationResult = await this.findOne({ token });

    if (confirmationResult.isLeft()) {
      return left(confirmationResult.value);
    }

    const confirmation = confirmationResult.value;

    const isTokenExpired = isBefore(new Date(confirmation.expires), new Date());

    if (isTokenExpired) {
      await this.delete(
        { token: confirmation.token },
        {
          user: confirmation.user,
          type: ConfirmationType.PASSWORD,
        },
      );

      return left(
        new UnauthorizedException(AuthExceptionMessage.SESSION_EXPIRED),
      );
    }

    return confirmationResult;
  }

  async send(params: SendConfirmationParams): Promise<ConfirmationEntity> {
    const { user, type } = params;

    const { id, email } = user;

    const { subject, template } = MailTemplateConfig[type];

    const queryRunner = this.dataSource.createQueryRunner();

    await queryRunner.connect();
    await queryRunner.startTransaction();

    // to add confirmation to DB and send in to the client
    try {
      const confirmation = await this.save(
        {
          type,
          userId: id,
        },
        queryRunner,
      );

      const confirmationLink = this.buildConfirmationLink(confirmation.token);

      await this.mailService.send({
        subject,
        template,
        email,
        confirmationLink,
      });
      await queryRunner.commitTransaction();

      return confirmation;
    } catch (error) {
      await queryRunner.rollbackTransaction();

      throw error;
    } finally {
      await queryRunner.release();
    }
  }

  private async save(
    params: CreateConfirmationParams,
    queryRunner: QueryRunner,
  ): Promise<ConfirmationEntity> {
    const { id, userId, type } = params;

    const expires = add(new Date(), {
      seconds: this.appConfig.confirmationTokenExpire,
    });

    const uuid = this.cryptoService.generateUUID();

    const token = await queryRunner.manager.save(ConfirmationEntity, {
      id,
      user: { id: userId },
      token: uuid,
      type,
      expires,
    });

    return token;
  }

  private buildConfirmationLink(token: string): string {
    const { domain, port } = this.appConfig;

    return `http://${domain}:${port}/confirmation&token=${token}`;
  }

  async findOne(
    where: FindOptionsWhere<ConfirmationEntity>,
  ): Promise<Either<NotFoundException, ConfirmationEntity>> {
    const confirmationToken = await this.confirmationRepository.findOne({
      where,
      relations: { user: true },
    });

    if (!confirmationToken) {
      return left(new NotFoundException());
    }

    return right(confirmationToken);
  }

  async delete(
    where: FindOptionsWhere<ConfirmationEntity>,
    sendParams: SendConfirmationParams,
  ): Promise<ConfirmationEntity> {
    // Todo: session
    await this.confirmationRepository.delete(where);

    return this.send(sendParams);
  }
}
