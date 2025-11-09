import { Field, ObjectType } from '@nestjs/graphql';
import { Venue } from 'shared';
import { Column, Entity } from 'typeorm';

import { BaseEntity } from '$modules/database/entities';

@ObjectType()
@Entity('venues')
export class VenueEntity extends BaseEntity implements Venue {
  @Column({ nullable: false })
  @Field()
  readonly name: string;

  @Column({ nullable: false, length: 2 })
  @Field()
  readonly countryCode: string;

  @Column({ nullable: false })
  @Field()
  readonly city: string;

  @Column({ type: 'decimal', precision: 10, scale: 8, nullable: false })
  @Field(() => Number)
  readonly latitude: number;

  @Column({ type: 'decimal', precision: 11, scale: 8, nullable: false })
  @Field(() => Number)
  readonly longitude: number;
}
