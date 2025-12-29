import { Resolver, Query } from '@nestjs/graphql';
import {
  GetUserInput,
  getUserInputSchema,
  GetUserOutput,
  getUserOutputSchema,
  ListUsersOutput,
  listUsersOutputSchema,
} from 'shared';

import { UserEntity } from './user.entity';
import { UserService } from './user.service';

import { handleEitherResponse } from '$helpers';
import { InputSchema, QueryOutputSchema } from '$lib/nestjs-graphql-zod';
import { CurrentUser } from '$modules/auth/decorators/current-user';
import { UserInGqlContext } from '$modules/app/types';

@Resolver(() => UserEntity)
export class UserResolver {
  constructor(private readonly service: UserService) {}

  @QueryOutputSchema(getUserOutputSchema)
  async user(
    @InputSchema(getUserInputSchema) input: GetUserInput,
  ): Promise<GetUserOutput> {
    return this.service.get(input).then(handleEitherResponse);
  }

  @QueryOutputSchema(listUsersOutputSchema)
  async users(): Promise<ListUsersOutput> {
    return this.service.list();
  }

  // TODO: separate schema for me query
  @QueryOutputSchema(getUserOutputSchema)
  async me(@CurrentUser() user?: UserInGqlContext): Promise<GetUserOutput | null> {   
    if (!user?.userId) {
      return null;
    }
    return this.service.get({id: user.userId}).then(handleEitherResponse);
  }
}
