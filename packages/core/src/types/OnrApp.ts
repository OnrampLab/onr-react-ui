import { Client } from '@onr/ts-rest-client';
import { ReactNode } from 'react';
import { AppComponents } from './AppComponents';

export type OnrApp = {
  apis: any;

  initialize(): void;
  getComponents(): AppComponents;
  getProvider(): ReactNode;
  getAppConfig(): any;
  getMenuItems(): any;
  getRoutes(): any;
  addService<T extends Client>(serviceName: string, service: T): OnrApp;
  getService(serviceName: string): Client;
};

export type FullAppOptions = {
  components: AppComponents;
  appConfig: any;
  menuItems: any;
  routes: any;
  apis: any;
};
