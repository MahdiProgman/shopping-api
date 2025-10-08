import { Module } from '@nestjs/common';
import { LOGGER_SERVICE } from './constants';
import { LoggerService } from './services/logger.service';

@Module({
  providers: [
    {
      provide: LOGGER_SERVICE,
      useClass: LoggerService,
    },
  ],
  exports: [LOGGER_SERVICE],
})
export class LoggerModule {}
