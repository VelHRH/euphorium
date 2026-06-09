import { Field, ObjectType } from '@nestjs/graphql';
import { City } from 'shared';
import { Column, Entity, OneToMany } from 'typeorm';

import { BaseEntity } from '$modules/database/entities';
import { LocationEntity } from '../location/location.entity';

@ObjectType()
@Entity('cities')
export class CityEntity extends BaseEntity implements City {
  @Column({ nullable: false })
  @Field()
  readonly name: string;

  @Column({ nullable: false })
  @Field()
  readonly countryCode: string;

  @OneToMany(() => LocationEntity, (location) => location.city)
  @Field(() => [LocationEntity])
  readonly locations: LocationEntity[];
}
