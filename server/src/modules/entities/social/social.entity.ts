import { Field, ObjectType } from '@nestjs/graphql';
import { Social } from 'shared';
import { Column, Entity } from 'typeorm';

import { BaseEntity } from '$modules/database/entities';

@ObjectType()
@Entity('socials')
export class SocialEntity extends BaseEntity implements Social {
  @Column({ type: 'varchar', nullable: true })
  @Field(() => String, { nullable: true })
  readonly instagram?: string | null;

  @Column({ type: 'varchar', nullable: true })
  @Field(() => String, { nullable: true })
  readonly x?: string | null;

  @Column({ type: 'varchar', nullable: true })
  @Field(() => String, { nullable: true })
  readonly youtube?: string | null;

  @Column({ type: 'varchar', nullable: true })
  @Field(() => String, { nullable: true })
  readonly facebook?: string | null;
}
