import { Field, ObjectType } from '@nestjs/graphql';
import { Festival, Show } from 'shared';
import { Column, Entity, OneToMany } from 'typeorm';

import { BaseEntity } from '$modules/database/entities';
import { ShowEntity } from '../show/show.entity';

@ObjectType()
@Entity('festivals')
export class FestivalEntity extends BaseEntity implements Festival {
  @Column({ nullable: false })
  @Field()
  readonly name: string;

  @Column({ nullable: false })
  @Field()
  readonly dateStart: Date;

  @Column({ nullable: false })
  @Field()
  readonly dateEnd: Date;

  @OneToMany(() => ShowEntity, (show) => show.festival)
  @Field(() => [ShowEntity])
  readonly shows: Show[];

  @Column('varchar', { array: true, default: [] })
  @Field(() => [String])
  readonly imgPaths: string[];
}
