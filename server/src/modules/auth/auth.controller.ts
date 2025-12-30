import { Controller, Get, Query, Res } from '@nestjs/common';
import { Response } from 'express';
import { GoogleAuthService } from './services';
import { Public } from './decorators';
import { Config } from '$config';
import { ConfigService } from '@nestjs/config';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly googleAuthService: GoogleAuthService,
    private readonly configService: ConfigService<Config>,
  ) {}

  @Public()
  @Get('google')
  async startAuth(@Res() res: Response) {
    const url = this.googleAuthService.getAuthUrl();
    return res.redirect(url);
  }


  @Public()
  @Get('google/callback')
  async callback(@Query('code') code: string, @Res() res: Response) {
    const result = await this.googleAuthService.loginByCode(code, res);
    if (result.isLeft()) {
      throw result.value;
    }
    return res.redirect(this.configService.getOrThrow('security.origin', { infer: true }));
  }
}