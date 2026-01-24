export interface PaginationInfo {
  hasNextPage: boolean;
  endCursor?: string;
}

export interface PaginationEdge<List> {
  node: List;
  cursor: string;
}

export interface PaginationOutput<List> {
  pageInfo: PaginationInfo;
  edges: PaginationEdge<List>[];
}
