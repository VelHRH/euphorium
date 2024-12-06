import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class GetSongOutputDto {
  @Field()
  name: string;
}
