import { Module } from '@nestjs/common';
import { registerEnumType } from '@nestjs/graphql';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfirmationType } from 'shared';

import { ConfirmationEntity } from './confirmation.entity';
import { ConfirmationService } from './confirmation.service';

import { CryptoModule } from '$modules/crypto/crypto.module';
import { MailModule } from '$modules/mail/mail.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([ConfirmationEntity]),
    MailModule,
    CryptoModule,
  ],
  providers: [ConfirmationService],
  exports: [ConfirmationService],
})
export class ConfirmationModule {
  constructor() {
    registerEnumType(ConfirmationType, {
      name: 'ConfirmationType',
      description: 'Type of confirmation (e.g., EMAIL, PHONE)',
    });
  }
}
