import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from '../auth';
import { FirebaseModule } from '../firebase/firebase.module';
import { MovieController } from './movie.controller';
import { MovieService } from './movie.service';

@Module({
  imports: [ConfigModule, FirebaseModule, AuthModule],
  providers: [MovieService],
  controllers: [MovieController],
  exports: [MovieService],
})
export class MovieModule {}
