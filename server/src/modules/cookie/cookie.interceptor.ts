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

@Injectable()
export class SetCookiesInterceptor implements NestInterceptor {
  constructor(private readonly tokenService: TokenService) {}

  intercept(context: ExecutionContext, next: CallHandler) {
    const ctx = GqlExecutionContext.create(context);

    const { req, res: response } = ctx.getContext<GqlContext>();

    return next.handle().pipe(
      tap(() => {
        if (req.newTokens) {
          this.tokenService.insertTokensInCookies({
            response,
            ...req.newTokens,
          });

          delete req.newTokens;
        }
      }),
    );
  }
}
