import { Field, ObjectType } from '@nestjs/graphql';
import { City, Venue } from 'shared';
import { Column, Entity, OneToMany } from 'typeorm';

import { BaseEntity } from '$modules/database/entities';
import { VenueEntity } from '../venue/venue.entity';

@ObjectType()
@Entity('cities')
export class CityEntity extends BaseEntity implements City {
  @Column({ nullable: false })
  @Field()
  readonly name: string;

  @Column({ nullable: false })
  @Field()
  readonly countryCode: string;

  @OneToMany(() => VenueEntity, (venue) => venue.city)
  @Field(() => [VenueEntity])
  readonly venues: Venue[];
}
