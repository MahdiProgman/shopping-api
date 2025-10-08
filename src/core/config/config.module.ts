import { Module } from '@nestjs/common';
import { CONFIG_SERVICE } from './constants';
import { ConfigService } from './services/config.service';

@Module({
  providers: [
    {
      provide: CONFIG_SERVICE,
      useClass: ConfigService,
    },
  ],
  exports: [CONFIG_SERVICE],
})
export class ConfigModule {}
