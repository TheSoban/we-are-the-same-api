import { ConfigService } from '@nestjs/config';
import { AppConfig } from './config.types';

export type AppConfigService = ConfigService<AppConfig, true>;
