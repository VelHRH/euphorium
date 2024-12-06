import { Field, Int, ObjectType } from '@nestjs/graphql';
import { Base } from 'shared';
import {
  CreateDateColumn,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@ObjectType()
export class BaseEntity implements Base {
  @PrimaryGeneratedColumn('increment')
  @Field(() => Int)
  readonly id: number;

  @CreateDateColumn()
  @Field(() => Date)
  readonly createdAt: Date;

  @UpdateDateColumn()
  @Field(() => Date)
  readonly updatedAt: Date;
}
