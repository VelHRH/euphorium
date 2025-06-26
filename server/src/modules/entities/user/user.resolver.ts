import { Query, Resolver } from '@nestjs/graphql';
import { GetUserInput, getUserInputSchema } from 'shared';

import { UserEntity } from './user.entity';
import { UserService } from './user.service';

import { QueryInputSchema } from '$modules/graphql/graphql-query-schema.decorator';

@Resolver(() => UserEntity)
export class UserResolver {
  constructor(private readonly service: UserService) {}

  @Query(() => UserEntity, { nullable: true })
  user(
    @QueryInputSchema(getUserInputSchema) input: GetUserInput,
  ): Promise<UserEntity | null> {
    return this.service.get(input);
  }

  @Query(() => [UserEntity])
  users(): Promise<UserEntity[]> {
    return this.service.list();
  }
}
