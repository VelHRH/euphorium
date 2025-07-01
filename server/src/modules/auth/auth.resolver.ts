import { Context, Mutation, Resolver } from '@nestjs/graphql';
import { handleEitherResponse } from 'common/helpers';
import { ZodArgs } from 'nestjs-graphql-zod';
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
  SignUpResponse,
  signUpResponseSchema,
  UpdatePasswordInput,
  updatePasswordInputSchema,
  User,
} from 'shared';

import { Public } from './decorators';
import { CurrentUser } from './decorators/current-user';
import { AuthService, GoogleAuthService, PasswordService } from './services';

import { GqlContext, UserInGqlContext } from '$modules/app/types';
import { UserEntity } from '$modules/entities/user/user.entity';
import {
  InputSchema,
  MutationOutputSchema,
} from '$modules/graphql/graphql-schema.decorator';

@Resolver()
export class AuthResolver {
  constructor(
    private readonly authService: AuthService,
    private readonly passwordService: PasswordService,
    private readonly googleAuthService: GoogleAuthService,
  ) {}

  @Public()
  @MutationOutputSchema(signUpResponseSchema)
  async signUp(
    @InputSchema(signUpInputSchema) input: SignUpInput,
  ): Promise<SignUpResponse> {
    return this.authService.signUp(input).then(handleEitherResponse);
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
  @Mutation(() => UserEntity, { nullable: true })
  googleLogin(
    @ZodArgs(googleLoginInputSchema, 'input') input: GoogleLoginInput,
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
