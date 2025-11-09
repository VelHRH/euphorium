import { Field, ObjectType } from '@nestjs/graphql';
import { Festival, Show, Venue } from 'shared';
import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';

import { FestivalEntity } from '../festival/festival.entity';
import { VenueEntity } from '../venue/venue.entity';

import { BaseEntity } from '$modules/database/entities';

@ObjectType()
@Entity('shows')
export class ShowEntity extends BaseEntity implements Show {
  @Column({ nullable: false })
  @Field()
  readonly name: string;

  @ManyToOne(() => VenueEntity, (venue) => venue.id)
  @JoinColumn({ name: 'venueId' })
  @Field(() => VenueEntity)
  readonly venue: Venue;

  @Column({ type: 'timestamp', nullable: false })
  @Field(() => Date)
  readonly date: Date;

  @ManyToOne(() => FestivalEntity, (festival) => festival.id)
  @JoinColumn({ name: 'festivalId' })
  @Field(() => FestivalEntity)
  readonly festival: Festival;
}
