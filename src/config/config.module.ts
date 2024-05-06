import { Module } from '@nestjs/common';
import { ConfigModule as NestConfigModule } from '@nestjs/config';
import { firebaseConfigLoader, generalConfigLoader } from './config.loaders';
import { configSchema } from './config.validation';

@Module({
  imports: [
    NestConfigModule.forRoot({
      isGlobal: true,
      load: [generalConfigLoader, firebaseConfigLoader],
      validate: (config) => configSchema.parse(config),
      validationOptions: {
        allowUnknown: true,
        abortEarly: true,
      },
    }),
  ],
})
export class ConfigModule {}
