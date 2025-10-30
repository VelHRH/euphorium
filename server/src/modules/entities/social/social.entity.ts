import { Field, ObjectType } from '@nestjs/graphql';
import { Social } from 'shared';
import { Column, Entity } from 'typeorm';

import { BaseEntity } from '$modules/database/entities';

@ObjectType()
@Entity('socials')
export class SocialEntity extends BaseEntity implements Social {
  @Column({ nullable: true })
  @Field({ nullable: true })
  readonly instagram?: string;

  @Column({ nullable: true })
  @Field({ nullable: true })
  readonly x?: string;

  @Column({ nullable: true })
  @Field({ nullable: true })
  readonly youtube?: string;

  @Column({ nullable: true })
  @Field({ nullable: true })
  readonly facebook?: string;
}
