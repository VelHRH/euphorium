import { Field, ObjectType } from '@nestjs/graphql';
import { Event, EventInstance } from 'shared';
import { Column, Entity, ManyToOne, OneToMany } from 'typeorm';

import { BaseEntity } from '$modules/database/entities';
import { EventEntity } from '../event/event.entity';
import { LocationEntity } from '../location/location.entity';
import { EventReviewEntity } from '../event-review/event-review.entity';

@ObjectType()
@Entity('event-instances')
export class EventInstanceEntity extends BaseEntity implements EventInstance {
  @ManyToOne(() => EventEntity, (event) => event.instances)
  @Field(() => EventEntity)
  readonly event: Event;

  @ManyToOne(() => LocationEntity, (location) => location.instances)
  @Field(() => LocationEntity)
  readonly location: LocationEntity;

  @OneToMany(() => EventReviewEntity, (review) => review.eventInstance)
  @Field(() => [EventReviewEntity])
  readonly reviews: EventReviewEntity[];

  @Column({ nullable: false })
  @Field()
  readonly timeStart: Date;

  @Column({ nullable: false })
  @Field()
  readonly timeEnd: Date;

  @Column({ nullable: true })
  @Field({ nullable: true })
  readonly specialName?: string | null;

  @Column({ nullable: true })
  @Field(() => Number, { nullable: true })
  readonly rating?: number | null;
}
