import { Field, ObjectType } from '@nestjs/graphql';
import { Column, Entity } from 'typeorm';

import { BaseEntity } from '$modules/database/entities';

@ObjectType()
@Entity('songs')
export class Song extends BaseEntity {
  @Column({ nullable: false })
  @Field()
  readonly name: string;
}
