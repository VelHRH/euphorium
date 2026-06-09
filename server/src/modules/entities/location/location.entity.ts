import { Field, ObjectType } from '@nestjs/graphql';
import { City, EventInstance, Location, LocationType } from 'shared';
import { Column, Entity, ManyToOne, OneToMany } from 'typeorm';

import { BaseEntity } from '$modules/database/entities';
import { CityEntity } from '../city/city.entity';
import { EventInstanceEntity } from '../event-instance/event-instance.entity';

@ObjectType()
@Entity('locations')
export class LocationEntity extends BaseEntity implements Location {
  @Column({ type: 'varchar', nullable: true })
  @Field(() => String, { nullable: true })
  readonly name?: string | null;

  @ManyToOne(() => CityEntity, (city) => city.locations)
  @Field(() => CityEntity)
  readonly city: City;

  @Column({ type: 'double precision', nullable: false })
  @Field()
  readonly latitude: number;

  @Column({ type: 'double precision', nullable: false })
  @Field()
  readonly longitude: number;

  @Column({ nullable: false })
  @Field(() => LocationType)
  readonly type: LocationType;

  @OneToMany(() => EventInstanceEntity, (instance) => instance.location)
  @Field(() => [EventInstanceEntity])
  readonly instances: EventInstance[];
}
