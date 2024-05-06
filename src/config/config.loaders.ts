import { registerAs } from '@nestjs/config';
import { AppConfig, Environments } from './config.types';

const getEnvProperty = (propertyName: string, defaultValue = '') => process.env[propertyName] ?? defaultValue;

const createConfigLoader = <T extends keyof AppConfig>(token: T, config: AppConfig[T]) =>
  registerAs(token, () => config);

export const generalConfigLoader = createConfigLoader('general', {
  environment: getEnvProperty('NODE_ENV', Environments.Development) as Environments,
  port: parseInt(getEnvProperty('API_PORT', '3000'), 10),
});

export const firebaseConfigLoader = createConfigLoader('firebase', {
  projectId: getEnvProperty('PROJECT_ID'),
  privateKey: getEnvProperty('PRIVATE_KEY').replace(/\\n/gm, '\n'),
  clientEmail: getEnvProperty('CLIENT_EMAIL'),
});
