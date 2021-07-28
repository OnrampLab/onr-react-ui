import { Http } from '@onr/common';
import { createContext, FC, ReactNode } from 'react';
import { AuthProvider, NextAuthProvider } from '../providers';
import { AppComponents, FullAppOptions, OnrApp } from '../types';

export const AppContext = createContext<App | null>(null);

interface ProviderProps {
  children: ReactNode;
  session: any;
}

export class App implements OnrApp {
  private readonly components: AppComponents;
  private readonly appConfig: any;
  private readonly routes: any;

  constructor(options: FullAppOptions) {
    this.components = options.components;
    this.appConfig = options.appConfig;
    this.routes = options.routes;
  }

  initialize() {
    Http.setBaseUrl(this.appConfig.apiBaseUrl);
    Http.setToken(this.appConfig.apiKey);
  }

  getComponents(): AppComponents {
    return this.components;
  }

  getProvider() {
    const Provider: FC<ProviderProps> = ({ children, session }: ProviderProps) => {
      return (
        <NextAuthProvider session={session}>
          <AppContext.Provider value={this}>
            {/* @ts-ignore */}
            <AuthProvider>{children}</AuthProvider>
          </AppContext.Provider>
        </NextAuthProvider>
      );
    };

    return Provider;
  }

  getAppConfig() {
    return this.appConfig;
  }

  getRoutes() {
    return this.routes;
  }
}
