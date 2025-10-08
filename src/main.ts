import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { CONFIG_SERVICE } from './core/config/constants';
import { ConfigService } from './core/config/contracts/config.service';
import { LoggerService } from './core/logger/contracts/logger.service';
import { LOGGER_SERVICE } from './core/logger/constants';
import { GlobalExceptionFilter } from './core/app/filters/global-exception.filter';
import { SuccessResponseInterceptor } from './core/app/interceptors/success-response.interceptor';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const configService = app.get<ConfigService>(CONFIG_SERVICE);
  const loggerService = app.get<LoggerService>(LOGGER_SERVICE);

  app.useGlobalFilters(new GlobalExceptionFilter());

  app.useGlobalInterceptors(new SuccessResponseInterceptor());

  const port = configService.getAppConfig().port;

  await app.listen(port, () =>
    loggerService.info(`Server Is Listening On Port ${port}`),
  );
}
bootstrap();
