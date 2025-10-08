import { AppConfig, Configuration } from './config.interface';
import { ConfigService as IConfigService } from '../contracts/config.service';
import { loadConfig } from '../utils/load-config';
import { Injectable } from '@nestjs/common';

@Injectable()
export class ConfigService implements IConfigService {
  private readonly config: Configuration;

  constructor() {
    this.config = loadConfig();
  }

  public getAppConfig(): AppConfig {
    return this.config.app;
  }
}
