import { Query, Resolver } from '@nestjs/graphql';
import { ZodArgs } from 'nestjs-graphql-zod';
import { GetUserInput, getUserInputSchema } from 'shared';

import { UserEntity } from './user.entity';
import { UserService } from './user.service';

@Resolver(() => UserEntity)
export class UserResolver {
  constructor(private readonly service: UserService) {}

  @Query(() => UserEntity, { nullable: true })
  user(
    @ZodArgs(getUserInputSchema, 'input') input: GetUserInput,
  ): Promise<UserEntity | null> {
    return this.service.get(input);
  }

  @Query(() => [UserEntity])
  users(): Promise<UserEntity[]> {
    return this.service.list();
  }
}
