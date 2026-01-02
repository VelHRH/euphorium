import { ArgsType, Field, Int, ObjectType } from '@nestjs/graphql';
import { Type } from '@nestjs/common';
import {
  PaginationEdge,
  PaginationInfo,
  PaginationOutput as PaginationOutputType,
  PaginationInput as PaginationInputType,
} from 'shared';
import { DEFAULT_PAGE_SIZE } from './pagination.constants';

@ArgsType()
export class PaginationInput implements PaginationInputType {
  @Field(() => Int, { defaultValue: DEFAULT_PAGE_SIZE })
  first?: number;

  @Field({ nullable: true })
  after?: string;
}

function EdgeType<T>(classRef: Type<T>) {
  @ObjectType({ isAbstract: true })
  abstract class Edge implements PaginationEdge<T> {
    @Field(() => classRef)
    node: T;

    @Field()
    cursor: string;
  }
  return Edge;
}

@ObjectType()
class PageInfo implements PaginationInfo {
  @Field()
  hasNextPage: boolean;

  @Field({ nullable: true })
  endCursor?: string;
}

export function Pagination<T>(classRef: Type<T>) {
  const Edge = EdgeType(classRef);

  @ObjectType({ isAbstract: true })
  abstract class Output implements PaginationOutputType<T> {
    @Field(() => [Edge])
    edges: Array<InstanceType<typeof Edge>>;

    @Field(() => PageInfo)
    pageInfo: PageInfo;
  }

  return Output;
}
