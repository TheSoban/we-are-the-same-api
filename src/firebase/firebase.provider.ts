import { Provider } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import firebase from 'firebase-admin';
import { AppConfigService } from '../config';

export const FirebaseProvider: Provider = {
  provide: 'FIREBASE_APP',
  inject: [ConfigService],
  useFactory: (configService: AppConfigService) => {
    const firebaseConfig = configService.get('firebase', { infer: true });

    return firebase.initializeApp({
      credential: firebase.credential.cert(firebaseConfig),
      databaseURL: `https://${firebaseConfig.projectId}.firebaseio.com`,
      storageBucket: `${firebaseConfig.projectId}.appspot.com`,
    });
  },
};
