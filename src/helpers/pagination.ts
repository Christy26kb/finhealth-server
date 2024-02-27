import { PaginationParams, PaginationQuery } from 'src/types';

export const getPaginationQuery = (
  params: PaginationParams,
): PaginationQuery | null => {
  const { pageNumber, pageSize } = params;
  // Return null if both params is not present in the request.
  let paginationQuery = null;
  if (pageNumber && pageSize) {
    paginationQuery = {
      skip: pageSize * (pageNumber - 1),
      take: pageSize,
    };
  }
  return paginationQuery;
};
