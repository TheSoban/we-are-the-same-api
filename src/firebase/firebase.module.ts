import { Module } from '@nestjs/common';
import { ConfigModule } from '../config';
import { FirebaseProvider } from './firebase.provider';
import { FirebaseRepository } from './firebase.repository';

@Module({
  imports: [ConfigModule],
  providers: [FirebaseProvider, FirebaseRepository],
  exports: [FirebaseRepository],
})
export class FirebaseModule {}
