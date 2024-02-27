export type PaginationParams = {
  pageNumber: number;
  pageSize: number;
};

export type PaginationQuery = {
  skip: number;
  take: number;
};

export type PaginatedResponseType = {
  count: number;
  data: any[];
  next: boolean;
};
