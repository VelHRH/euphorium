import { Injectable } from '@nestjs/common';
import { decodeCursor, encodeCursor } from './pagination.utils';
import { DEFAULT_PAGE_SIZE, MAX_PAGE_SIZE } from './pagination.constants';

interface PaginateOptions<T> {
  items: T[];
  first?: number;
  after?: string;
  cursorField?: keyof T;
}

@Injectable()
export class PaginationService {
  constructor() {}

  paginate<T>({
    items,
    first,
    after,
    cursorField = 'id' as keyof T,
  }: PaginateOptions<T>) {
    const limit = Math.min(first ?? DEFAULT_PAGE_SIZE, MAX_PAGE_SIZE);

    let startIndex = 0;

    if (after) {
      const decoded = decodeCursor(after);
      startIndex =
        items.findIndex((item) => String(item[cursorField]) === decoded) + 1;
    }

    const sliced = items.slice(startIndex, startIndex + limit + 1);
    const pageItems = sliced.slice(0, limit);

    return {
      edges: pageItems.map((item) => ({
        node: item,
        cursor: encodeCursor(item[cursorField] as string | number | Date),
      })),
      pageInfo: {
        hasNextPage: sliced.length > limit,
        endCursor:
          pageItems.length > 0
            ? encodeCursor(
                pageItems[pageItems.length - 1][cursorField] as
                  | string
                  | number
                  | Date,
              )
            : undefined,
      },
    };
  }
}
