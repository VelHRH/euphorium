import { Mutation, Query, Resolver } from '@nestjs/graphql';
import { ZodArgs } from 'nestjs-graphql-zod';
import {
  CreateUserInput,
  createUserInputSchema,
  GetUserInput,
  getUserInputSchema,
} from 'shared';

import { UserEntity } from './user.entity';
import { UserService } from './user.service';

@Resolver(() => UserEntity)
export class UserResolver {
  constructor(private readonly service: UserService) {}

  @Mutation(() => UserEntity)
  createUser(
    @ZodArgs(createUserInputSchema, 'input') input: CreateUserInput,
  ): Promise<UserEntity> {
    return this.service.create(input);
  }

  @Query(() => UserEntity, { nullable: true })
  user(
    @ZodArgs(getUserInputSchema, 'input') input: GetUserInput,
  ): Promise<UserEntity | null> {
    return this.service.get(input);
  }
}
