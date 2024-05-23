import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from '../auth';
import { FirebaseModule } from '../firebase/firebase.module';
import { MovieModule } from '../movie';
import { PreferenceController } from './preference.controller';
import { PreferenceService } from './preference.service';

@Module({
  imports: [ConfigModule, FirebaseModule, AuthModule, MovieModule],
  providers: [PreferenceService],
  controllers: [PreferenceController],
})
export class PreferenceModule {}
