export interface Pagination {
  current_page: number;
  last_page: number;
  per_page: number;
  from: number;
  to: number;
  total: number;
}

export interface ListResponse<T> {
  data: T[];
  meta: Pagination;
}
