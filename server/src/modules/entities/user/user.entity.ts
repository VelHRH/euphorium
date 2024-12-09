import { Field, HideField, ObjectType } from '@nestjs/graphql';
import { User } from 'shared';
import { Column, Entity, OneToMany } from 'typeorm';

import { SessionEntity } from '../session/session.entity';

import { BaseEntity } from '$modules/database/entities';

@ObjectType()
@Entity('users')
export class UserEntity extends BaseEntity implements User {
  @Column({ unique: true })
  @Field()
  readonly email: string;

  @Column({ select: false })
  @HideField()
  readonly password: string;

  @OneToMany(() => SessionEntity, (session) => session.user)
  @Field(() => [SessionEntity])
  readonly session: SessionEntity[];
}
