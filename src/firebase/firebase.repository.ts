import { Inject, Injectable } from '@nestjs/common';
import { app } from 'firebase-admin';

@Injectable()
export class FirebaseRepository {
  public readonly db = this.firebaseApp.firestore();

  constructor(@Inject('FIREBASE_APP') private readonly firebaseApp: app.App) {}
}
