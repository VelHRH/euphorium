import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ExecutionContextHost } from '@nestjs/core/helpers/execution-context-host';
import { GqlExecutionContext } from '@nestjs/graphql';
import { AuthGuard } from '@nestjs/passport';
import { Observable } from 'rxjs';

import { UnauthorizedException } from '../../../common/exceptions/unauthorized.exception';
import { StrategyName } from '../constants';
import { IS_PUBLIC_KEY } from '../decorators';

import { GqlContext } from '$modules/app/types';

@Injectable()
export class JwtAuthGuard
  extends AuthGuard(StrategyName.JWT)
  implements CanActivate
{
  constructor(private readonly reflector: Reflector) {
    super();
  }

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const isPublic = this.reflector.get<boolean>(
      IS_PUBLIC_KEY,
      context.getHandler(),
    );

    if (isPublic) {
      return true;
    }

    const ctx = GqlExecutionContext.create(context);
    const { req } = ctx.getContext<GqlContext>();

    try {
      return super.canActivate(new ExecutionContextHost([req]));
    } catch (error) {
      throw new UnauthorizedException();
    }
  }

  handleRequest<UserType extends Record<string, unknown>>(
    err: Error | null,
    user: UserType | false,
    _info: unknown,
  ): UserType {
    if (err !== null || user === false) {
      throw new UnauthorizedException();
    }

    return user;
  }
}
