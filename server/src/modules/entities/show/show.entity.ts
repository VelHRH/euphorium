import { Field, ObjectType } from '@nestjs/graphql';
import { Festival, Show, Venue } from 'shared';
import { Column, Entity, ManyToOne } from 'typeorm';

import { BaseEntity } from '$modules/database/entities';
import { VenueEntity } from '../venue/venue.entity';
import { FestivalEntity } from '../festival/festival.entity';

@ObjectType()
@Entity('shows')
export class ShowEntity extends BaseEntity implements Show {
  @Column({ nullable: false })
  @Field()
  readonly name: string;

  @ManyToOne(() => VenueEntity, (venue) => venue.shows)
  @Field(() => VenueEntity)
  readonly venue: Venue;

  @Column()
  @Field()
  readonly date: Date;

  @ManyToOne(() => FestivalEntity, (festival) => festival.shows)
  @Field(() => FestivalEntity)
  readonly festival: Festival;
}
