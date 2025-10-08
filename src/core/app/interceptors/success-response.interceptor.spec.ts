import { SuccessResponseInterceptor } from './success-response.interceptor';
import type { CallHandler, ExecutionContext } from '@nestjs/common';
import { of } from 'rxjs';
import type { Response } from 'express';
import type { AppResponse } from '../interfaces/response.interface';

describe('SuccessResponseInterceptor', () => {
  let interceptor: SuccessResponseInterceptor;
  let mockExecutionContext: Partial<ExecutionContext>;
  let mockCallHandler: CallHandler;
  let mockResponse: Partial<jest.Mocked<Response>>;

  beforeEach(() => {
    interceptor = new SuccessResponseInterceptor();

    mockResponse = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    mockExecutionContext = {
      switchToHttp: () => ({
        getResponse: <T>() => mockResponse as T,
      }),
    } as ExecutionContext;

    mockCallHandler = {
      handle: jest.fn(),
    };
  });

  it('should format success response correctly with provided fields', (done) => {
    const mockAppResponse: AppResponse = {
      status_code: 201,
      message: 'Created successfully',
      data: { id: 1, name: 'Mahdi' },
    };

    mockCallHandler.handle = jest.fn(() => of(mockAppResponse));

    interceptor
      .intercept(mockExecutionContext as ExecutionContext, mockCallHandler)
      .subscribe((result: AppResponse) => {
        expect(mockResponse.status).toHaveBeenCalledWith(201);
        expect(result).toEqual({
          success: true,
          message: 'Created successfully',
          data: { id: 1, name: 'Mahdi' },
          meta: { timestamp: expect.any(Number) as jest.Expect['any'] },
        });
        done();
      });
  });

  it('should use default values when fields are missing', (done) => {
    const mockAppResponse = {};

    mockCallHandler.handle = jest.fn(() => of(mockAppResponse));

    interceptor
      .intercept(mockExecutionContext as ExecutionContext, mockCallHandler)
      .subscribe((result: AppResponse) => {
        expect(mockResponse.status).toHaveBeenCalledWith(200);
        expect(result).toEqual({
          success: true,
          message: 'success',
          data: null,
          meta: { timestamp: expect.any(Number) as jest.Expect['any'] },
        });
        done();
      });
  });
});
