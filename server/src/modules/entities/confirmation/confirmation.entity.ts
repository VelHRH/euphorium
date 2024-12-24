import { Field, ObjectType } from '@nestjs/graphql';
import { Confirmation, ConfirmationType, User } from 'shared';
import { Column, Entity, Index, JoinColumn, ManyToOne } from 'typeorm';

import { UserEntity } from '../user/user.entity';

import { BaseEntity } from '$modules/database/entities';

@ObjectType()
@Entity('confirmations')
@Index(['user', 'type'], { unique: true })
export class ConfirmationEntity extends BaseEntity implements Confirmation {
  @Column({
    type: 'enum',
    enum: ConfirmationType,
    nullable: false,
  })
  @Field(() => ConfirmationType)
  readonly type: ConfirmationType;

  @Column({ nullable: false })
  @Field()
  readonly expires: Date;

  @Column({ nullable: false, unique: true })
  @Field()
  readonly token: string;

  @ManyToOne(() => UserEntity, (user) => user.session)
  @JoinColumn({ name: 'userId' })
  @Field(() => UserEntity)
  readonly user: User;
}
