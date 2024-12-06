import { Field, ObjectType } from '@nestjs/graphql';
import { Song } from 'shared';
import { Column, Entity } from 'typeorm';

import { BaseEntity } from '$modules/database/entities';

@ObjectType()
@Entity('songs')
export class SongEntity extends BaseEntity implements Song {
  @Column({ nullable: false })
  @Field()
  readonly name: string;
}
