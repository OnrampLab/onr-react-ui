import { ReactNode } from 'react';
import { AppComponents } from './AppComponents';

export type OnrApp = {
  initialize(): void;
  getComponents(): AppComponents;
  getProvider(): ReactNode;
  getAppConfig(): any;
  getRoutes(): any;
};

export type FullAppOptions = {
  components: AppComponents;
  appConfig: any;
  routes: any;
};
