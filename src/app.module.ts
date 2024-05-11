import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { AppController } from './app.controller';
import { AuthModule } from './auth';
import { ConfigModule } from './config';
import { MovieModule } from './movie';
import { ZodFilter } from './zod';

@Module({
  imports: [ConfigModule, MovieModule, AuthModule],
  controllers: [AppController],
  providers: [
    {
      provide: APP_GUARD,
      useClass: ZodFilter,
    },
  ],
})
export class AppModule {}
