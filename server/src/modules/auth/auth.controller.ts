import { Controller, Get, Query, Res } from '@nestjs/common';
import { Response } from 'express';
import { GoogleAuthService } from './services';
import { Public } from './decorators';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly googleAuthService: GoogleAuthService,
  ) {}

  // Сюда ведет кнопка с фронтенда
  @Get('google')
  @Public()
  async startAuth(@Res() res: Response) {
    const url = this.googleAuthService.getAuthUrl();
    return res.redirect(url);
  }

  // Сюда Google вернет пользователя с кодом
  @Get('google/callback')
  @Public()
  async callback(@Query('code') code: string, @Res() res: Response) {
    // Вызываем ваш метод, который пропишет HTTP-only куки
    await this.googleAuthService.googleLogin(code, res);

    // Куки уже в ответе (res), теперь просто отправляем юзера на фронт
    return res.redirect('http://localhost:5173');
  }
}