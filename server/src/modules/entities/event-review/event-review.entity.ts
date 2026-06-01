import { Field, ObjectType } from '@nestjs/graphql';
import { Event, EventInstance, EventReview } from 'shared';
import { Column, Entity, ManyToOne } from 'typeorm';

import { BaseEntity } from '$modules/database/entities';
import { EventInstanceEntity } from '../event-instance/event-instance.entity';

@ObjectType()
@Entity('event-reviews')
export class EventReviewEntity extends BaseEntity implements EventReview {
  @ManyToOne(() => EventInstanceEntity, (instance) => instance.reviews)
  @Field(() => EventInstanceEntity)
  readonly eventInstance: EventInstanceEntity;

  @Column({ nullable: false })
  @Field(() => Number)
  readonly rating: number;

  @Column({ nullable: false })
  @Field(() => String)
  readonly comment: string;

  @Column({ array: true, default: [] })
  @Field(() => [Number])
  readonly commentEmbedding: number[];
}
