import { Field, ObjectType } from '@nestjs/graphql';
import { Show, Venue } from 'shared';
import { Column, Entity, OneToMany } from 'typeorm';

import { BaseEntity } from '$modules/database/entities';
import { ShowEntity } from '../show/show.entity';

@ObjectType()
@Entity('venues')
export class VenueEntity extends BaseEntity implements Venue {
  @Column({ nullable: false })
  @Field()
  readonly name: string;

  @Column({ nullable: false })
  @Field()
  readonly countryCode: string;

  @Column({ nullable: false })
  @Field()
  readonly city: string;

  @Column({ nullable: false })
  @Field()
  readonly latitude: number;

  @Column({ nullable: false })
  @Field()
  readonly longitude: number;

  @OneToMany(() => ShowEntity, (show) => show.venue)
  @Field(() => [ShowEntity])
  readonly shows: Show[];
}
