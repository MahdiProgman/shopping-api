import { Logger } from 'winston';
import { LoggerService as ILoggerService } from '../contracts/logger.service';
import { logger } from '../logger';

export class LoggerService implements ILoggerService {
  private logger: Logger;

  constructor() {
    this.logger = logger;
  }
  public info(message: string): void {
    this.logger.info(message);
  }

  public warn(message: string): void {
    this.logger.warn(message);
  }

  public error(message: string): void {
    this.logger.error(message);
  }
}
