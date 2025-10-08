import { ArgumentsHost, ExceptionFilter, HttpException } from '@nestjs/common';
import { Response } from 'express';
import { AppError } from '../exceptions/app-error.exception';

export class GlobalExceptionFilter implements ExceptionFilter {
  public catch(exception: any, host: ArgumentsHost) {
    const res: Response = host.switchToHttp().getResponse<Response>();

    let status_code: number = 500;
    let message: string = 'Internal Server Error';
    let error_code: string = 'INTERNAL_SERVER_ERROR';

    if (exception instanceof AppError) {
      status_code = exception.status_code;
      message = exception.message;
      error_code = exception.error_code;
    }

    if (exception instanceof HttpException) {
      status_code = exception.getStatus();
      message = exception.message;
      error_code = 'FAILED';
    }

    res.status(status_code).json({
      success: false,
      message: message,
      data: null,
      error_code: error_code,
      meta: {
        timestamp: Date.now(),
      },
    });
  }
}
