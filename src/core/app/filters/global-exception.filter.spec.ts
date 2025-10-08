import { ArgumentsHost, BadRequestException } from '@nestjs/common';
import { Response } from 'express';
import { GlobalExceptionFilter } from './global-exception.filter';
import { AppError } from '../exceptions/app-error.exception';
import { HttpArgumentsHost } from '@nestjs/common/interfaces';

describe('GlobalExceptionFilter', () => {
  let mockedHost: ArgumentsHost;

  let mockedGetResponse: () => Partial<jest.Mocked<Response>>;

  let mockedResponse: Partial<jest.Mocked<Response>>;

  let filter: GlobalExceptionFilter;

  beforeEach(() => {
    mockedResponse = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    mockedGetResponse = () => mockedResponse;

    mockedHost = {
      switchToHttp: () =>
        ({
          getResponse: mockedGetResponse,
        }) as HttpArgumentsHost,
    } as ArgumentsHost;

    filter = new GlobalExceptionFilter();
  });

  it('should be handle app error exception successfully', () => {
    const exception = new AppError(400, 'bad request', 'BAD_REQUEST');

    filter.catch(exception, mockedHost);

    expect(mockedResponse.status).toHaveBeenCalledWith(exception.status_code);
    expect(mockedResponse.json).toHaveBeenCalledWith({
      success: false,
      message: exception.message,
      data: null,
      error_code: exception.error_code,
      meta: {
        timestamp: expect.any(Number) as jest.Expect['any'],
      },
    });
  });

  it('should be handle http exception successfully', () => {
    const exception = new BadRequestException();

    filter.catch(exception, mockedHost);

    expect(mockedResponse.status).toHaveBeenCalledWith(400);
    expect(mockedResponse.json).toHaveBeenCalledWith({
      success: false,
      message: exception.message,
      data: null,
      error_code: 'FAILED',
      meta: {
        timestamp: expect.any(Number) as jest.Expect['any'],
      },
    });
  });

  it('should be consider internal server error', () => {
    const exception = new Error('hello I am unforeseen exception:)');

    filter.catch(exception, mockedHost);

    expect(mockedResponse.status).toHaveBeenCalledWith(500);
    expect(mockedResponse.json).toHaveBeenCalledWith({
      success: false,
      message: 'Internal Server Error',
      data: null,
      error_code: 'INTERNAL_SERVER_ERROR',
      meta: {
        timestamp: expect.any(Number) as jest.Expect['any'],
      },
    });
  });
});
