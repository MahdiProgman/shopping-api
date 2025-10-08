import { CallHandler, ExecutionContext, NestInterceptor } from '@nestjs/common';
import { Response } from 'express';
import { map, Observable } from 'rxjs';
import { AppResponse } from '../interfaces/response.interface';

export class SuccessResponseInterceptor implements NestInterceptor {
  public intercept(
    context: ExecutionContext,
    next: CallHandler<any>,
  ): Observable<any> {
    const res = context.switchToHttp().getResponse<Response>();

    return next.handle().pipe(
      map((appResponse: AppResponse) => {
        res.status(appResponse.status_code ?? 200);

        return {
          success: true,
          message: appResponse.message ?? 'success',
          data: appResponse.data ?? null,
          meta: {
            timestamp: Date.now(),
          },
        };
      }),
    );
  }
}
