import { Field, ObjectType } from '@nestjs/graphql';
import { Festival, Show } from 'shared';
import { Column, Entity, OneToMany } from 'typeorm';

import { ShowEntity } from '../show/show.entity';

import { BaseEntity } from '$modules/database/entities';

@ObjectType()
@Entity('festivals')
export class FestivalEntity extends BaseEntity implements Festival {
  @Column({ nullable: false })
  @Field()
  readonly name: string;

  @Column({ nullable: false })
  @Field(() => Date)
  readonly dateStart: Date;

  @Column({ nullable: false })
  @Field(() => Date)
  readonly dateEnd: Date;

  @OneToMany(() => ShowEntity, (show) => show.festival, { cascade: true })
  @Field(() => [ShowEntity])
  readonly shows: Show[];
}
