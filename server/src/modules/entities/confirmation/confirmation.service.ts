import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectRepository } from '@nestjs/typeorm';
import { add } from 'date-fns';
import { Repository } from 'typeorm';

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
    configService: ConfigService<Config>,
  ) {
    this.appConfig = configService.getOrThrow('app', { infer: true });
  }

  async send(params: SendConfirmationParams): Promise<ConfirmationEntity> {
    const { user, type } = params;

    const { id, email } = user;

    const { subject, template } = MailTemplateConfig[type];

    const confirmationEmailToken = await this.save({
      type,
      userId: id,
    });

    const confirmationLink = this.buildConfirmationLink(
      confirmationEmailToken.token,
    );

    await this.mailService.send({
      subject,
      template,
      email,
      confirmationLink,
    });

    return confirmationEmailToken;
  }

  private async save(
    params: CreateConfirmationParams,
  ): Promise<ConfirmationEntity> {
    const { id, userId, type } = params;

    const expires = add(new Date(), {
      seconds: this.appConfig.confirmationTokenExpire,
    });

    const uuid = this.cryptoService.generateUUID();

    const token = await this.confirmationRepository.save({
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
}
