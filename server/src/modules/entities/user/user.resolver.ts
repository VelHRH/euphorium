import { Resolver } from '@nestjs/graphql';
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
}
