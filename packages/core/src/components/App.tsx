import { Client } from '@onr/ts-rest-client';
import axios from 'axios';
import minimatch from 'minimatch';
import { useRouter } from 'next/router';
import { createContext, FC, ReactNode } from 'react';
import { AuthProvider, NextAuthProvider } from '../providers';
import { AppComponents, AppConfig, FullAppOptions, OnrApp } from '../types';

export const AppContext = createContext<App | null>(null);

interface ProviderProps {
  children: ReactNode;
  session: any;
}

export class App implements OnrApp {
  private static instance: App;

  private readonly components: AppComponents;
  private readonly appConfig: AppConfig;
  private readonly menuItems: any;
  private readonly routes: any;
  private readonly services: any;
  public apis: any;

  constructor(options: FullAppOptions) {
    this.components = options.components;
    this.appConfig = options.appConfig;
    this.menuItems = options.menuItems;
    this.routes = options.routes;
    this.apis = options.routes;
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

  getProvider() {
    const authEnabled = this.appConfig.auth.enabled;

    const Provider: FC<ProviderProps> = ({ children, session }: ProviderProps) => {
      const router = useRouter();

      const currentRoute = this.routes.find((route: any) => {
        return minimatch(router.pathname, route.path);
      });

      if (authEnabled && currentRoute.authRequired) {
        return (
          <NextAuthProvider session={session}>
            <AppContext.Provider value={this}>
              {/* @ts-ignore */}
              <AuthProvider>{children}</AuthProvider>
            </AppContext.Provider>
          </NextAuthProvider>
        );
      }

      return <AppContext.Provider value={this}>{children}</AppContext.Provider>;
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
}
