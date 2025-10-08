import { RequestLoggingInterceptor } from './request-logging.interceptor';
import type { CallHandler, ExecutionContext } from '@nestjs/common';
import { of, throwError, type Observable } from 'rxjs';
import type { Request } from 'express';
import type { LoggerService } from 'src/core/logger/contracts/logger.service';
import { AppError } from '../exceptions/app-error.exception';
import { AppResponse } from '../interfaces/response.interface';

describe('RequestLoggingInterceptor', () => {
  let interceptor: RequestLoggingInterceptor;
  let mockLoggerService: Partial<jest.Mocked<LoggerService>>;
  let mockExecutionContext: ExecutionContext;
  let mockCallHandler: CallHandler;
  let mockRequest: Partial<Request>;

  beforeEach(() => {
    mockLoggerService = {
      info: jest.fn(),
      warn: jest.fn(),
      error: jest.fn(),
    } as jest.Mocked<LoggerService>;

    interceptor = new RequestLoggingInterceptor(
      mockLoggerService as LoggerService,
    );

    mockRequest = {
      method: 'GET',
      url: '/api/test',
      requestId: 'req-123',
    };

    mockExecutionContext = {
      switchToHttp: () => ({
        getRequest: <T>() => mockRequest as T,
      }),
    } as unknown as ExecutionContext;

    mockCallHandler = {
      handle: jest.fn(),
    } as unknown as CallHandler;
  });

  it('should log info for successful request', (done) => {
    const mockResponse: AppResponse = {
      status_code: 201,
      message: 'Created',
      data: { ok: true },
    };

    mockCallHandler.handle = jest.fn(
      (): Observable<AppResponse> => of(mockResponse),
    );

    interceptor
      .intercept(mockExecutionContext, mockCallHandler)
      .subscribe(() => {
        expect(mockLoggerService.info).toHaveBeenCalledWith(
          expect.stringMatching(
            /\[RequestID: req-123\] GET \/api\/test - Status: 201 - Duration: \d+ms/,
          ),
        );
        done();
      });
  });

  it('should log warn for handled AppError with 4xx status', (done) => {
    const error = new AppError(404, 'Not Found', 'NOT_FOUND');

    mockCallHandler.handle = jest.fn(() => throwError(() => error));

    interceptor.intercept(mockExecutionContext, mockCallHandler).subscribe({
      error: () => {
        expect(mockLoggerService.warn).toHaveBeenCalledWith(
          expect.stringMatching(
            /\[RequestID: req-123\] GET \/api\/test - Status: 404 - Duration: \d+ms - ErrorMessage: Not Found/,
          ),
        );
        done();
      },
    });
  });

  it('should log error for handled AppError with 5xx status', (done) => {
    const error = new AppError(500, 'Internal Failure', 'INTERNAL_FAILURE');

    mockCallHandler.handle = jest.fn(() => throwError(() => error));

    interceptor.intercept(mockExecutionContext, mockCallHandler).subscribe({
      error: () => {
        expect(mockLoggerService.error).toHaveBeenCalledWith(
          expect.stringMatching(
            /\[RequestID: req-123\] GET \/api\/test - Status: 500 - Duration: \d+ms - ErrorMessage: Internal Failure/,
          ),
        );
        done();
      },
    });
  });

  it('should log error for unhandled error (non-AppError)', (done) => {
    const error = new Error('Unexpected crash');

    mockCallHandler.handle = jest.fn(() => throwError(() => error));

    interceptor.intercept(mockExecutionContext, mockCallHandler).subscribe({
      error: () => {
        expect(mockLoggerService.error).toHaveBeenCalledWith(
          expect.stringMatching(
            /an unhandled exception was received : Unexpected crash/,
          ),
        );
        done();
      },
    });
  });
});
