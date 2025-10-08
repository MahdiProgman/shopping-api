import { NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';

export class GenerateRequestIdMiddleware implements NestMiddleware {
  public use(req: Request, res: Response, next: NextFunction) {
    req.requestId = crypto.randomUUID();

    next();
  }
}
