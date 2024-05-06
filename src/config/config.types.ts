import { ServiceAccount } from 'firebase-admin';

export type AppConfig = {
  general: {
    environment: Environments;
    port: number;
  };
  firebase: ServiceAccount;
};

export enum Environments {
  Development = 'development',
  Production = 'production',
}
