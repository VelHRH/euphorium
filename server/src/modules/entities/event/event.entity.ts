import { Field, ObjectType } from '@nestjs/graphql';
import { EMBEDDING_DIMENSION, Event, EventInstance } from 'shared';
import { Column, Entity, Index, ManyToOne, OneToMany } from 'typeorm';

import { BaseEntity } from '$modules/database/entities';
import { EventInstanceEntity } from '../event-instance/event-instance.entity';

@ObjectType()
@Index('idx_events_description_embedding_hnsw', { synchronize: false })
@Entity('events')
export class EventEntity extends BaseEntity implements Event {
  @Column({ type: 'varchar', nullable: false })
  @Field()
  readonly name: string;

  @Column({ nullable: false })
  @Field()
  readonly description: string;

  @Column('vector', { length: EMBEDDING_DIMENSION })
  @Field(() => [Number], { nullable: false })
  readonly descriptionEmbedding: number[];

  @OneToMany(() => EventInstanceEntity, (instance) => instance.event)
  @Field(() => [EventInstanceEntity])
  readonly instances: EventInstance[];
}
