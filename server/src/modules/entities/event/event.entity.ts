import { Field, ObjectType } from '@nestjs/graphql';
import { Event, EventInstance } from 'shared';
import { Column, Entity, ManyToOne, OneToMany } from 'typeorm';

import { BaseEntity } from '$modules/database/entities';
import { EventInstanceEntity } from '../event-instance/event-instance.entity';

@ObjectType()
@Entity('events')
export class EventEntity extends BaseEntity implements Event {
  @Column({ type: 'varchar', nullable: false })
  @Field()
  readonly name: string;

  @Column({ nullable: false })
  @Field()
  readonly description: string;

  @Column('double precision', { array: true, default: [] })
  @Field(() => [Number])
  readonly descriptionEmbedding: number[];

  @OneToMany(() => EventInstanceEntity, (instance) => instance.event)
  @Field(() => [EventInstanceEntity])
  readonly instances: EventInstance[];
}
