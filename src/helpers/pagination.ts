import {
  PaginatedResponseType,
  PaginationParams,
  PaginationQuery,
} from 'src/types';

export const getPaginationQuery = (
  params: PaginationParams,
): PaginationQuery => {
  const { pageNumber, pageSize } = params;
  return {
    skip: pageSize * (pageNumber - 1),
    take: pageSize,
  };
};

export const transformToPageResponse = (
  params: PaginationParams,
  response: any,
): PaginatedResponseType => {
  const { pageNumber, pageSize } = params;
  const [count, data] = response;
  const pagesAvailable = count / pageSize || 1;
  const result = {
    count,
    data,
    next: !!(pageNumber < pagesAvailable),
  };
  return result;
};
