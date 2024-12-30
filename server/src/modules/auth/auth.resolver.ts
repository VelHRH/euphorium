import { UseGuards } from '@nestjs/common';
import { Context, Mutation, Resolver } from '@nestjs/graphql';
import { ZodArgs } from 'nestjs-graphql-zod';
import {
  ForgotPasswordInput,
  forgotPasswordInputSchema,
  LoginInput,
  loginInputSchema,
  RevokePasswordInput,
  revokePasswordInputSchema,
  SignUpInput,
  signUpInputSchema,
  UpdatePasswordInput,
  updatePasswordInputSchema,
  User,
} from 'shared';

import { Public } from './decorators';
import { CurrentUser } from './decorators/current-user';
import { GoogleAuthGuard } from './guards';
import { AuthService, PasswordService } from './services';
import { GoogleAuthService } from './services/google-auth.service';

import { GqlContext, UserInGqlContext } from '$modules/app/types';
import { UserEntity } from '$modules/entities/user/user.entity';

@Resolver()
export class AuthResolver {
  constructor(
    private readonly authService: AuthService,
    private readonly passwordService: PasswordService,
    private readonly googleAuthService: GoogleAuthService,
  ) {}

  @Public()
  @Mutation(() => UserEntity)
  signUp(
    @ZodArgs(signUpInputSchema, 'input') input: SignUpInput,
  ): Promise<UserEntity> {
    return this.authService.signUp(input);
  }

  @Public()
  @Mutation(() => UserEntity, { nullable: true })
  login(
    @ZodArgs(loginInputSchema, 'input') input: LoginInput,
    @Context() ctx: GqlContext,
  ): Promise<UserEntity> {
    return this.authService.login(input, ctx.res);
  }

  @Public()
  @UseGuards(GoogleAuthGuard)
  @Mutation(() => UserEntity, { nullable: true })
  googleLogin(@Context() ctx: GqlContext): Promise<boolean> {
    return this.googleAuthService.createSession(ctx.req.user!, ctx.res);
  }

  @Public()
  @Mutation(() => Boolean)
  logout(@Context() ctx: GqlContext): Promise<boolean> {
    return this.authService.logout(ctx.res);
  }

  @Public()
  @Mutation(() => Boolean)
  forgotPassword(
    @ZodArgs(forgotPasswordInputSchema, 'input') input: ForgotPasswordInput,
  ): Promise<boolean> {
    return this.passwordService.forgot(input);
  }

  @Public()
  @Mutation(() => Boolean)
  revokePassword(
    @ZodArgs(revokePasswordInputSchema, 'input') input: RevokePasswordInput,
  ): Promise<User> {
    return this.passwordService.revoke(input);
  }

  @Mutation(() => UserEntity, { nullable: true })
  updatePassword(
    @CurrentUser() { userId }: UserInGqlContext,
    @ZodArgs(updatePasswordInputSchema, 'input')
    input: UpdatePasswordInput,
  ): Promise<User | null> {
    return this.passwordService.update(userId, input);
  }
}
