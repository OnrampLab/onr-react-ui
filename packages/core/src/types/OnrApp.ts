import { LogLevel } from '@onr/logging';
import { Client } from '@onr/ts-rest-client';
import { ComponentType, FC, ReactNode } from 'react';
import { AppComponents } from './AppComponents';
import { AppConfig } from './AppOptions';

export type OnrApp = {
  apis: any;
  logger: any;

  initialize(): void;
  getComponents(): AppComponents;
  getProvider(): FC<ProviderProps>;
  getAppContainer(): FC<ProviderProps>;
  getPageContainer(): FC<ProviderProps>;
  getAppConfig(): any;
  getMenuItems(): any;
  getRoutes(): any;
  addService<T extends Client>(serviceName: string, service: T): OnrApp;
  getService(serviceName: string): Client;
};

export interface ProviderProps {
  children: ReactNode;
  session: any;
}

export type FullAppOptions = {
  components: AppComponents;
  appConfig?: AppConfig;
  logConfig: LogConfig;
  menuItems: any;
  routes: any;
  apis: any;
};

export interface RouteType {
  path: string;
  layout: string;
  authRequired: boolean;
  LayoutContainer: ComponentType;
}

export type LogConfig = {
  default: string;

  channels: Record<string, StackChannel | MonologChannel>;
};

export type StackChannel = {
  driver: 'stack';
  channels: string[];
};

export type MonologChannel = {
  driver: 'monolog';
  handler: any;
  handlerWith?: any;
  level: LogLevel;
};
