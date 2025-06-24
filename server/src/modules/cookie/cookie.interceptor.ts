import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { tap } from 'rxjs/operators';

import { GqlContext } from '$modules/app/types';
import { TokenService } from '$modules/token/token.service';

// This in needed instead of handleRequest in jwt-guard (since we can't use it in GQL)
@Injectable()
export class SetCookiesInterceptor implements NestInterceptor {
  constructor(private readonly tokenService: TokenService) {}

  intercept(context: ExecutionContext, next: CallHandler) {
    const ctx = GqlExecutionContext.create(context);

    const { req, res: response } = ctx.getContext<GqlContext>();

    return next.handle().pipe(
      tap(() => {
        if (req.user) {
          const { signedAccessToken, signedRefreshToken } = req.user;

          if (response !== undefined) {
            this.tokenService.insertInCookies({
              response,
              signedAccessToken,
              signedRefreshToken,
            });
          }
        }
      }),
    );
  }
}
