import { LogLevel } from '@onr/logging';
import { AxiosInstance } from 'axios';
import { FC, ReactNode } from 'react';
import { Plugin } from '../plugin';
import { AppComponents, PageProps } from './AppComponents';
import { Configs, RolesType } from './AppOptions';

export type OnrApp = {
  apis: Record<string, AxiosInstance>;
  logger: any;

  initialize(): void;
  bootstrap(): Promise<void>;
  getConfig<T = any>(key: string): T | null;
  getComponents(): AppComponents;
  getProvider(): FC<ProviderProps>;
  getAppContainer(): FC<ProviderProps>;
  getAppConfig(): any;
  getMenuItems(): any;
  getRoutes(): any;
  getLayouts(): LayoutsType;
  getAuthUserModel(): any;
  getRoles(): RolesType;
  getService<T>(serviceName: string): T;
  registerPlugin(plugin: Plugin): void;
  bootstrapPlugins(): Promise<void>;
  addService<T>(serviceName: string, service: T): OnrApp;
  setLayouts(layouts: LayoutsType): void;
};

export interface ProviderProps {
  children: ReactNode;
  session: any;
}

export type FullAppOptions = {
  configs: Configs;
  components: AppComponents;
  apis: any;
  layouts: LayoutsType;
  plugins: Plugin[];
};

export interface RouteType {
  path: string;
  layout: string;
  authRequired: boolean;
  pageProps?: PageProps;
  providers?: FC<PageProps>[];
}

export type LayoutsType = Record<string, FC<PageProps>>;

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
