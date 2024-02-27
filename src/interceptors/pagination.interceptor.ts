import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { PaginationParams } from 'src/types';

export interface PaginationResponse<T> {
  count: number;
  data: T;
  next: boolean;
}

const defaultParams: PaginationParams = {
  pageNumber: 1,
  pageSize: 20,
};

@Injectable()
export class PaginationInterceptor<T>
  implements NestInterceptor<T[], PaginationResponse<T>>
{
  intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Observable<PaginationResponse<T>> {
    const request = context.switchToHttp().getRequest();

    // Assuming pagination parameters are present in the query string
    const pageNumber: number =
      parseInt(request.query.page_number, 10) || defaultParams.pageNumber;
    const pageSize: number =
      parseInt(request.query.page_size, 10) || defaultParams.pageSize;

    // Set the parsed page number and page size values in the request object
    request.query.paginationParams = {
      pageNumber,
      pageSize,
    };

    return next.handle().pipe(
      map((data) => {
        const [count, items] = data;
        const pagesAvailable = Math.ceil(count / pageSize) || 1;
        const nextPage = pageNumber < pagesAvailable;

        return {
          count,
          data: items,
          next: nextPage,
        };
      }),
    );
  }
}
