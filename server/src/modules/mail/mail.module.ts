import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { MailerModule } from '@nestjs-modules/mailer';

import { MailService } from './mail.service';

@Module({
  providers: [MailService],
  imports: [
    MailerModule.forRootAsync({
      useFactory: (configService: ConfigService) => ({
        transport: {
          service: 'gmail',
          auth: {
            user: configService.getOrThrow('mail.user', { infer: true }),
            pass: configService.getOrThrow('mail.pass', { infer: true }),
          },
        },
      }),
      inject: [ConfigService],
    }),
  ],
  exports: [MailService],
})
export class MailModule {}
