import { Field, ObjectType } from '@nestjs/graphql';
import { Base } from 'shared';
import {
  CreateDateColumn,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@ObjectType()
export class BaseEntity implements Base {
  @PrimaryGeneratedColumn('uuid')
  @Field()
  readonly id: string;

  @CreateDateColumn()
  @Field(() => Date)
  readonly createdAt: Date;

  @UpdateDateColumn()
  @Field(() => Date)
  readonly updatedAt: Date;
}
