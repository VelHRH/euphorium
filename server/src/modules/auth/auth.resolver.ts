import { Context, Mutation, Resolver } from '@nestjs/graphql';
import { handleEitherResponse } from 'common/helpers';
import {
  ForgotPasswordInput,
  forgotPasswordInputSchema,
  GoogleLoginInput,
  googleLoginInputSchema,
  LoginInput,
  loginInputSchema,
  RevokePasswordInput,
  revokePasswordInputSchema,
  SignUpInput,
  signUpInputSchema,
  SignUpOutput,
  signUpOutputSchema,
  UpdatePasswordInput,
  updatePasswordInputSchema,
  User,
} from 'shared';

import { Public } from './decorators';
import { CurrentUser } from './decorators/current-user';
import { AuthService, GoogleAuthService, PasswordService } from './services';

import { InputSchema, MutationOutputSchema } from '$lib/nestjs-graphql-zod';
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
  @MutationOutputSchema(signUpOutputSchema)
  async signUp(
    @InputSchema(signUpInputSchema) input: SignUpInput,
  ): Promise<SignUpOutput> {
    return this.authService.signUp(input).then(handleEitherResponse);
  }

  @Public()
  @Mutation(() => UserEntity, { nullable: true })
  login(
    @InputSchema(loginInputSchema, 'input') input: LoginInput,
    @Context() ctx: GqlContext,
  ): Promise<UserEntity> {
    return this.authService.login(input, ctx.res);
  }

  @Public()
  @Mutation(() => UserEntity, { nullable: true })
  googleLogin(
    @InputSchema(googleLoginInputSchema, 'input') input: GoogleLoginInput,
    @Context() ctx: GqlContext,
  ): Promise<UserEntity | null> {
    return this.googleAuthService.login(input, ctx.res);
  }

  @Public()
  @Mutation(() => Boolean)
  logout(@Context() ctx: GqlContext): Promise<boolean> {
    return this.authService.logout(ctx.res);
  }

  @Public()
  @Mutation(() => Boolean)
  forgotPassword(
    @InputSchema(forgotPasswordInputSchema, 'input') input: ForgotPasswordInput,
  ): Promise<boolean> {
    return this.passwordService.forgot(input);
  }

  @Public()
  @Mutation(() => Boolean)
  revokePassword(
    @InputSchema(revokePasswordInputSchema, 'input') input: RevokePasswordInput,
  ): Promise<User> {
    return this.passwordService.revoke(input);
  }

  @Mutation(() => UserEntity, { nullable: true })
  updatePassword(
    @CurrentUser() { userId }: UserInGqlContext,
    @InputSchema(updatePasswordInputSchema, 'input')
    input: UpdatePasswordInput,
  ): Promise<User | null> {
    return this.passwordService.update(userId, input);
  }
}
