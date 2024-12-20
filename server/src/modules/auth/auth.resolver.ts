import { Context, Mutation, Resolver } from '@nestjs/graphql';
import { ZodArgs } from 'nestjs-graphql-zod';
import { LoginInput, loginSchema, SignUpInput, signUpSchema } from 'shared';

import { AuthService } from './auth.service';
import { Public } from './decorators';

import { GqlContext } from '$modules/app/types';
import { UserEntity } from '$modules/entities/user/user.entity';

@Resolver()
export class AuthResolver {
  constructor(private readonly service: AuthService) {}

  @Mutation(() => UserEntity)
  signUp(
    @ZodArgs(signUpSchema, 'input') input: SignUpInput,
  ): Promise<UserEntity> {
    return this.service.signUp(input);
  }

  @Public()
  @Mutation(() => UserEntity, { nullable: true })
  login(
    @ZodArgs(loginSchema, 'input') input: LoginInput,
    @Context() ctx: GqlContext,
  ): Promise<UserEntity | null> {
    return this.service.login(input, ctx.res);
  }

  @Public()
  @Mutation(() => Boolean)
  logout(@Context() ctx: GqlContext): Promise<boolean> {
    return this.service.logout(ctx.res);
  }
}
