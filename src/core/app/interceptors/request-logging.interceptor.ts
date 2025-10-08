import {
  CallHandler,
  ExecutionContext,
  Inject,
  NestInterceptor,
} from '@nestjs/common';
import { Request } from 'express';
import { catchError, Observable, tap } from 'rxjs';
import { LOGGER_SERVICE } from 'src/core/logger/constants';
import type { LoggerService } from 'src/core/logger/contracts/logger.service';
import { AppError } from '../exceptions/app-error.exception';
import { AppResponse } from '../interfaces/response.interface';

export class RequestLoggingInterceptor implements NestInterceptor {
  constructor(
    @Inject(LOGGER_SERVICE) private readonly loggerService: LoggerService,
  ) {}

  public intercept(
    context: ExecutionContext,
    next: CallHandler<any>,
  ): Observable<any> {
    const request = context.switchToHttp().getRequest<Request>();

    const { method, url } = request;

    const startTime = Date.now();

    return next.handle().pipe(
      tap((response: AppResponse) => {
        const endTime = Date.now();
        const duration = endTime - startTime;

        this.loggerService.info(
          `[RequestID: ${request.requestId}] ${method} ${url} - Status: ${response.status_code || 200} - Duration: ${duration}ms`,
        );
      }),
      catchError((err) => {
        const endTime = Date.now();
        const duration = endTime - startTime;

        const statusCode = err instanceof AppError ? err.status_code : 500;

        if (!(err instanceof AppError)) {
          this.loggerService.error(
            `[RequestID: ${request.requestId}] ${method} ${url} - Status: ${statusCode} - Duration: ${duration}ms - ErrorMessage: an unhandled exception was received : ${(err as Error).message}`,
          );

          throw err;
        }

        if (statusCode.toString()[0] == '5')
          this.loggerService.error(
            `[RequestID: ${request.requestId}] ${method} ${url} - Status: ${statusCode} - Duration: ${duration}ms - ErrorMessage: ${err.message}`,
          );
        else
          this.loggerService.warn(
            `[RequestID: ${request.requestId}] ${method} ${url} - Status: ${statusCode} - Duration: ${duration}ms - ErrorMessage: ${err.message}`,
          );

        throw err;
      }),
    );
  }
}
