import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { AppConfigService } from './config';

const booststrap = async () => {
  const app = await NestFactory.create(AppModule);

  const configService = app.get<AppConfigService>(ConfigService);

  const { port } = configService.get('general');

  await app.listen(port);
};

booststrap();
