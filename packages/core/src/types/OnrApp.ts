import { LogLevel } from '@onr/logging';
import { Client } from '@onr/ts-rest-client';
import { AxiosInstance } from 'axios';
import { ComponentType, FC, ReactNode } from 'react';
import { AppComponents, PageProps } from './AppComponents';
import { AppConfig } from './AppOptions';

export type OnrApp = {
  apis: Record<string, AxiosInstance>;
  logger: any;

  initialize(): void;
  getComponents(): AppComponents;
  getProvider(): FC<ProviderProps>;
  getAppContainer(): FC<ProviderProps>;
  getPageContainer(): FC<ProviderProps>;
  getAppConfig(): any;
  getMenuItems(): any;
  getRoutes(): any;
  getLayouts(): LayoutsType;
  getService(serviceName: string): Client;
  addService<T extends Client>(serviceName: string, service: T): OnrApp;
  setLayouts(layouts: LayoutsType): void;
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

export type LayoutsType = Record<string, ComponentType<PageProps>>;

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
