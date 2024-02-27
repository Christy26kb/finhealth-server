import { PaginationParams, PaginationQuery } from 'src/types';

export const getPaginationQuery = (
  params: PaginationParams,
): PaginationQuery => {
  const { pageNumber, pageSize } = params;
  return {
    skip: pageSize * (pageNumber - 1),
    take: pageSize,
  };
};
