import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from './core/config/config.module';
import { PrismaModule } from './core/prisma/prisma.module';
import { LoggerModule } from './core/logger/logger.module';
import { GenerateRequestIdMiddleware } from './core/app/middlewares/generate-request-id.middleware';
import { UserModule } from './modules/user/user.module';

@Module({
  imports: [ConfigModule, PrismaModule, LoggerModule, UserModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  public configure(consumer: MiddlewareConsumer) {
    consumer.apply(GenerateRequestIdMiddleware).forRoutes('*');
  }
}
