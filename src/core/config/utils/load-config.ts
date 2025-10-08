import DotenvFlow from 'dotenv-flow';
import { Configuration } from '../services/config.interface';
import { configValidationSchema } from './config-validation.schema';

DotenvFlow.config({
  default_node_env: 'development',
});

export function loadConfig(): Configuration {
  const configuration: Configuration = {
    app: {
      port: parseInt(process.env.APP_PORT ?? '8000'),
    },
  };

  const { error } = configValidationSchema.validate(configuration);

  if (error) throw new Error(`failed to validate configs : ${error.message}`);

  return configuration;
}
