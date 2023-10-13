import { createLogger, Handler } from '@onr/logging';
import { Client } from '@onr/ts-rest-client';
import axios, { AxiosError, AxiosInstance } from 'axios';
import { signOut } from 'next-auth/react';
import { createContext, FC } from 'react';
import { Plugin } from '../plugin';
import { AuthProvider, NextAuthProvider, RouteProvider } from '../providers';
import { MenuItemsContextProvider, useInitializeMenuItems } from '../providers/MenuItemsProvider';
import {
  AppComponents,
  Configs,
  FullAppOptions,
  LayoutsType,
  OnrApp,
  ProviderProps,
  RolesType,
} from '../types';

export const AppContext = createContext<App | null>(null);

export class App implements OnrApp {
  private static instance: App;

  private readonly components: AppComponents;
  private readonly configs: Configs;
  private readonly layouts: LayoutsType = {};
  private readonly plugins: Plugin[] = [];
  private readonly services: any;
  public apis: Record<string, AxiosInstance>;
  public logger: any;

  constructor(options: FullAppOptions) {
    this.components = options.components;
    this.configs = options.configs;
    this.apis = options.apis;
    this.layouts = options.layouts;
    this.services = {};

    options.plugins.forEach(plugin => this.registerPlugin(plugin));
  }

  public static create(options: FullAppOptions): App {
    if (!App.instance) {
      App.instance = new App(options);
    }

    return App.instance;
  }

  public static getInstance(): App {
    if (!App.instance) {
      throw new Error('Should create the instance before getting the instance');
    }

    return App.instance;
  }

  initialize() {
    this.initApis();

    this.initLogger();
  }

  bootstrap() {
    this.bootstrapPlugins();
  }

  getAuthUserModel() {
    return this.configs.authConfig.model;
  }

  registerPlugin(plugin: Plugin): void {
    const existed = !!this.plugins.find(p => p.name === plugin.name);
    if (existed) {
      throw new Error(`Plugin (${plugin.name}) already be registered`);
    }

    this.plugins.push(plugin);
  }

  bootstrapPlugins() {
    this.plugins.forEach(plugin => {
      plugin.bootstrap(this);
    });
  }

  addService<T extends Client>(serviceName: string, service: T) {
    this.services[serviceName] = service;

    return this;
  }

  setLayouts(layouts: LayoutsType) {
    Object.keys(layouts).forEach(layoutName => {
      this.layouts[layoutName] = layouts[layoutName];
    });
  }

  getService(serviceName: string): Client {
    return this.services[serviceName];
  }

  getComponents(): AppComponents {
    return this.components;
  }

  getRoles(): RolesType {
    return this.configs.authConfig.roles;
  }

  /** @deprecated */
  getProvider() {
    const Provider: FC<ProviderProps> = ({ children, session }: ProviderProps) => {
      const AppContainer = this.getAppContainer();

      return <AppContainer session={session}>{children}</AppContainer>;
    };

    return Provider;
  }

  getAppContainer() {
    const Provider: FC<ProviderProps> = ({ children, session }: ProviderProps) => {
      const menuItemsContext = useInitializeMenuItems(this.configs.menuItems);

      return (
        <NextAuthProvider session={session}>
          <AppContext.Provider value={this}>
            <RouteProvider>
              <AuthProvider>
                <MenuItemsContextProvider value={menuItemsContext}>
                  {children}
                </MenuItemsContextProvider>
              </AuthProvider>
            </RouteProvider>
          </AppContext.Provider>
        </NextAuthProvider>
      );
    };

    return Provider;
  }

  getAppConfig() {
    return this.configs.appConfig;
  }

  getMenuItems() {
    return this.configs.menuItems;
  }

  getRoutes() {
    return this.configs.routes;
  }

  getLayouts() {
    return this.layouts;
  }

  private initApis() {
    if (!this.configs.appConfig) {
      return;
    }

    this.apis = {
      ...this.apis,
      adminAxiosInstance: axios.create({
        baseURL: this.configs.appConfig.apiBaseUrl,
        headers: {
          'content-type': 'application/json',
        },
      }),
      frontAxiosInstance: axios.create({
        baseURL: this.configs.appConfig.apiBaseUrl,
        headers: {
          'content-type': 'application/json',
          authorization: `Bearer ${this.configs.appConfig.apiKey}`,
        },
      }),
    };

    Object.values(this.apis).forEach((axiosInstance: AxiosInstance) => {
      axiosInstance.interceptors.response.use(
        function (response: any) {
          return response?.data;
        },
        function (error: AxiosError) {
          if (error?.response?.status === 401) {
            return signOut({ redirect: true }).then(() => {
              return Promise.reject(error);
            });
          }

          return Promise.reject(error);
        },
      );
    });
  }

  private initLogger() {
    const defaultChannelName = this.configs.logConfig.default;
    const channel = this.configs.logConfig.channels[defaultChannelName];
    const handlers: Handler[] = [];

    if (channel.driver === 'stack') {
      channel.channels.forEach((channelName: string) => {
        const subChannel = this.configs.logConfig.channels[channelName];
        const handler = this.createMonologHandler(subChannel);
        handlers.push(handler);
      });
    } else if (channel.driver === 'monolog') {
      handlers.push(this.createMonologHandler(channel));
    }

    this.logger = createLogger({
      channel: 'app-logger',
      handlers,
    });
  }

  private createMonologHandler(channel: any) {
    return new channel.handler({
      ...channel.handlerWith,
      level: channel.level,
    });
  }
}
