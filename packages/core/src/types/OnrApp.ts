import { ReactNode } from 'react';
import { AppComponents } from './AppComponents';

export type OnrApp = {
  initialize(): void;
  getComponents(): AppComponents;
  getProvider(): ReactNode;
  getAppConfig(): any;
  getMenuItems(): any;
  getRoutes(): any;
};

export type FullAppOptions = {
  components: AppComponents;
  appConfig: any;
  menuItems: any;
  routes: any;
};
