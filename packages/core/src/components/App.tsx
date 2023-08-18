import { createLogger, Handler } from '@onr/logging';
import { Client } from '@onr/ts-rest-client';
import axios, { AxiosError, AxiosInstance } from 'axios';
import { signOut } from 'next-auth/react';
import { createContext, FC } from 'react';
import { StyleContainer } from '../containers';
import { AuthProvider, GlobalModalProvider, NextAuthProvider, RouteProvider } from '../providers';
import { MenuItemsContextProvider, useInitializeMenuItems } from '../providers/MenuItemsProvider';
import {
  AppComponents,
  AppConfig,
  FullAppOptions,
  LogConfig,
  MenuItem,
  OnrApp,
  ProviderProps,
  RouteType,
} from '../types';
export const AppContext = createContext<App | null>(null);

export class App implements OnrApp {
  private static instance: App;

  private readonly components: AppComponents;
  private readonly appConfig?: AppConfig;
  private readonly logConfig: LogConfig;
  private readonly menuItems: MenuItem[];
  private readonly routes: RouteType[];
  private readonly services: any;
  public apis: Record<string, AxiosInstance>;
  public logger: any;

  constructor(options: FullAppOptions) {
    this.components = options.components;
    this.appConfig = options.appConfig;
    this.logConfig = options.logConfig;
    this.menuItems = options.menuItems;
    this.routes = options.routes;
    this.apis = options.apis;
    this.services = {};
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

  addService<T extends Client>(serviceName: string, service: T) {
    this.services[serviceName] = service;

    return this;
  }

  getService(serviceName: string): Client {
    return this.services[serviceName];
  }

  getComponents(): AppComponents {
    return this.components;
  }

  /** @deprecated */
  getProvider() {
    const Provider: FC<ProviderProps> = ({ children, session }: ProviderProps) => {
      const AppContainer = this.getAppContainer();
      const PageContainer = this.getPageContainer();

      return (
        <AppContainer session={session}>
          <PageContainer>{children}</PageContainer>
        </AppContainer>
      );
    };

    return Provider;
  }

  getAppContainer() {
    const Provider: FC<ProviderProps> = ({ children, session }: ProviderProps) => {
      const menuItemsContext = useInitializeMenuItems(this.menuItems);

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

  getPageContainer() {
    const Provider: FC = ({ children }) => {
      return (
        <StyleContainer>
          <GlobalModalProvider>{children}</GlobalModalProvider>
        </StyleContainer>
      );
    };

    return Provider;
  }

  getAppConfig() {
    return this.appConfig;
  }

  getMenuItems() {
    return this.menuItems;
  }

  getRoutes() {
    return this.routes;
  }

  private initApis() {
    if (!this.appConfig) {
      return;
    }

    this.apis = {
      ...this.apis,
      adminAxiosInstance: axios.create({
        baseURL: this.appConfig.apiBaseUrl,
        headers: {
          'content-type': 'application/json',
        },
      }),
      frontAxiosInstance: axios.create({
        baseURL: this.appConfig.apiBaseUrl,
        headers: {
          'content-type': 'application/json',
          authorization: `Bearer ${this.appConfig.apiKey}`,
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
    const defaultChannelName = this.logConfig.default;
    const channel = this.logConfig.channels[defaultChannelName];
    const handlers: Handler[] = [];

    if (channel.driver === 'stack') {
      channel.channels.forEach((channelName: string) => {
        const subChannel = this.logConfig.channels[channelName];
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
