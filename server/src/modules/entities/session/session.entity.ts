import { Field, ObjectType } from '@nestjs/graphql';
import { Session } from 'shared';
import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';

import { UserEntity } from '../user/user.entity';

import { BaseEntity } from '$modules/database/entities';

@ObjectType()
@Entity('sessions')
export class SessionEntity extends BaseEntity implements Session {
  @Column({ unique: true })
  @Field()
  readonly refreshToken: string;

  @ManyToOne(() => UserEntity, (user) => user.session)
  @JoinColumn({ name: 'userId' })
  @Field(() => UserEntity)
  readonly user: UserEntity;
}
