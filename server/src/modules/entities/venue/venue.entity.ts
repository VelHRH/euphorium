import { Field, ObjectType } from '@nestjs/graphql';
import { City, Show, Venue } from 'shared';
import { Column, Entity, ManyToOne, OneToMany } from 'typeorm';

import { BaseEntity } from '$modules/database/entities';
import { ShowEntity } from '../show/show.entity';
import { CityEntity } from '../city/city.entity';

@ObjectType()
@Entity('venues')
export class VenueEntity extends BaseEntity implements Venue {
  @Column({ nullable: false })
  @Field()
  readonly name: string;

  @ManyToOne(() => CityEntity, (city) => city.venues)
  @Field(() => CityEntity)
  readonly city: City;

  @Column({ nullable: false })
  @Field()
  readonly latitude: number;

  @Column({ nullable: false })
  @Field()
  readonly longitude: number;

  @Column({ type: 'varchar', nullable: true })
  @Field(() => String, { nullable: true })
  readonly imgPath?: string | null;

  @OneToMany(() => ShowEntity, (show) => show.venue)
  @Field(() => [ShowEntity])
  readonly shows: Show[];
}
