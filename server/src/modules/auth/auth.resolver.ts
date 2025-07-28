import { Context, Resolver } from '@nestjs/graphql';
import { handleEitherResponse } from 'common/helpers';
import {
  ForgotPasswordInput,
  forgotPasswordInputSchema,
  ForgotPasswordOutput,
  forgotPasswordOutputSchema,
  GoogleLoginInput,
  googleLoginInputSchema,
  GoogleLoginOutput,
  googleLoginOutputSchema,
  LoginInput,
  loginInputSchema,
  LoginOutput,
  loginOutputSchema,
  LogoutOutput,
  logoutOutputSchema,
  RevokePasswordInput,
  revokePasswordInputSchema,
  RevokePasswordOutput,
  revokePasswordOutputSchema,
  SignUpInput,
  signUpInputSchema,
  SignUpOutput,
  signUpOutputSchema,
  UpdatePasswordInput,
  updatePasswordInputSchema,
  UpdatePasswordOutput,
  updatePasswordOutputSchema,
} from 'shared';

import { Public } from './decorators';
import { CurrentUser } from './decorators/current-user';
import { AuthService, GoogleAuthService, PasswordService } from './services';

import { InputSchema, MutationOutputSchema } from '$lib/nestjs-graphql-zod';
import { GqlContext, UserInGqlContext } from '$modules/app/types';

@Resolver()
export class AuthResolver {
  constructor(
    private readonly authService: AuthService,
    private readonly passwordService: PasswordService,
    private readonly googleAuthService: GoogleAuthService,
  ) {}

  @Public()
  @MutationOutputSchema(signUpOutputSchema)
  async signUp(
    @InputSchema(signUpInputSchema) input: SignUpInput,
  ): Promise<SignUpOutput> {
    return this.authService.signUp(input).then(handleEitherResponse);
  }

  @Public()
  @MutationOutputSchema(loginOutputSchema)
  async login(
    @InputSchema(loginInputSchema, 'input') input: LoginInput,
    @Context() ctx: GqlContext,
  ): Promise<LoginOutput> {
    return this.authService.login(input, ctx.res).then(handleEitherResponse);
  }

  @Public()
  @MutationOutputSchema(googleLoginOutputSchema)
  async googleLogin(
    @InputSchema(googleLoginInputSchema, 'input') input: GoogleLoginInput,
    @Context() ctx: GqlContext,
  ): Promise<GoogleLoginOutput> {
    return this.googleAuthService
      .login(input, ctx.res)
      .then(handleEitherResponse);
  }

  @Public()
  @MutationOutputSchema(logoutOutputSchema)
  async logout(@Context() ctx: GqlContext): Promise<LogoutOutput> {
    return this.authService.logout(ctx.res).then(handleEitherResponse);
  }

  @Public()
  @MutationOutputSchema(forgotPasswordOutputSchema)
  async forgotPassword(
    @InputSchema(forgotPasswordInputSchema, 'input') input: ForgotPasswordInput,
  ): Promise<ForgotPasswordOutput> {
    return this.passwordService.forgot(input).then(handleEitherResponse);
  }

  @Public()
  @MutationOutputSchema(revokePasswordOutputSchema)
  async revokePassword(
    @InputSchema(revokePasswordInputSchema, 'input') input: RevokePasswordInput,
  ): Promise<RevokePasswordOutput> {
    return this.passwordService.revoke(input).then(handleEitherResponse);
  }

  @MutationOutputSchema(updatePasswordOutputSchema)
  async updatePassword(
    @CurrentUser() { userId }: UserInGqlContext,
    @InputSchema(updatePasswordInputSchema, 'input')
    input: UpdatePasswordInput,
  ): Promise<UpdatePasswordOutput> {
    return this.passwordService
      .update(userId, input)
      .then(handleEitherResponse);
  }
}
