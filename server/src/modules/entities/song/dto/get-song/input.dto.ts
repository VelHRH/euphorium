import { Field, InputType, Int } from '@nestjs/graphql';
import { createZodDto } from 'nestjs-zod';
import { getSongSchema } from 'shared';

@InputType()
export class GetSongInputDto extends createZodDto(getSongSchema) {
  @Field(() => Int)
  id: number;
}
