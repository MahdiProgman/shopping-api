import { AppConfig } from '../services/config.interface';

export interface ConfigService {
  getAppConfig(): AppConfig;
}
