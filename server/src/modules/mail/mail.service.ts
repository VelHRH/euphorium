import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';
import { join, resolve } from 'node:path';
import * as pug from 'pug';

import { SendParams } from './types';

@Injectable()
export class MailService {
  constructor(private readonly mailerService: MailerService) {}

  async send(params: SendParams): Promise<void> {
    try {
      const { subject, template, email, confirmationLink } = params;

      const rootDir = resolve(__dirname, '../../');

      const templatePath = join(rootDir, 'assets', 'mail-templates', template);

      const html = pug.renderFile(templatePath, {
        email,
        confirmationLink,
      });

      await this.mailerService.sendMail({
        to: email,
        from: '"New Blood" <yrchenko644@gmail.com>',
        subject,
        html,
      });
    } catch (error) {
      throw new Error('Failed to send');
    }
  }
}
