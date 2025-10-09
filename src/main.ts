import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { CONFIG_SERVICE } from './core/config/constants';
import { ConfigService } from './core/config/contracts/config.service';
import { LoggerService } from './core/logger/contracts/logger.service';
import { LOGGER_SERVICE } from './core/logger/constants';
import { GlobalExceptionFilter } from './core/app/filters/global-exception.filter';
import { SuccessResponseInterceptor } from './core/app/interceptors/success-response.interceptor';
import { VersioningType } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const configService = app.get<ConfigService>(CONFIG_SERVICE);
  const loggerService = app.get<LoggerService>(LOGGER_SERVICE);

  app.setGlobalPrefix('api');

  app.enableVersioning({
    type: VersioningType.URI,
    defaultVersion: '1',
  });

  const config = new DocumentBuilder()
    .setTitle('Shopping API')
    .setDescription('Documentation for best of the best')
    .setVersion('0.1')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, config);

  SwaggerModule.setup('api/docs', app, document);

  app.useGlobalFilters(new GlobalExceptionFilter());

  app.useGlobalInterceptors(new SuccessResponseInterceptor());

  const port = configService.getAppConfig().port;

  await app.listen(port, () =>
    loggerService.info(`Server Is Listening On Port ${port}`),
  );
}
bootstrap();
