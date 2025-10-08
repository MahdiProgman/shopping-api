import {
  Inject,
  Injectable,
  OnModuleDestroy,
  OnModuleInit,
} from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { LOGGER_SERVICE } from '../logger/constants';
import type { LoggerService } from '../logger/contracts/logger.service';

@Injectable()
export class PrismaService
  extends PrismaClient
  implements OnModuleInit, OnModuleDestroy
{
  constructor(
    @Inject(LOGGER_SERVICE) private readonly loggerService: LoggerService,
  ) {
    super();
  }

  public async onModuleInit() {
    this.loggerService.info('Server Is Connected To DB Successfully');

    await this.$connect();
  }

  public async onModuleDestroy() {
    this.loggerService.info('Server Closed Connection with DB Successfully');

    await this.$disconnect();
  }
}
