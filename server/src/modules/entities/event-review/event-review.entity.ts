import { Field, Int, ObjectType } from '@nestjs/graphql';
import { EventReview } from 'shared';
import { Column, Entity, Index, ManyToOne } from 'typeorm';

import { BaseEntity } from '$modules/database/entities';
import { EventInstanceEntity } from '../event-instance/event-instance.entity';
import { EMBEDDING_DIMENSION } from 'shared';

@ObjectType()
@Index('idx_event_reviews_comment_embedding_hnsw', { synchronize: false })
@Entity('event-reviews')
export class EventReviewEntity extends BaseEntity implements EventReview {
  @ManyToOne(() => EventInstanceEntity, (instance) => instance.reviews)
  @Field(() => EventInstanceEntity)
  readonly eventInstance: EventInstanceEntity;

  @Column({ type: 'smallint', nullable: false })
  @Field(() => Int)
  readonly rating: number;

  @Column({ nullable: false })
  @Field(() => String)
  readonly comment: string;

  @Column('vector', { length: EMBEDDING_DIMENSION })
  @Field(() => [Number], { nullable: false })
  readonly commentEmbedding: number[];
}
