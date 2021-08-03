import { Http } from '@onr/common';
import { createContext, FC, ReactNode } from 'react';
import { AuthProvider, NextAuthProvider } from '../providers';
import { AppComponents, AppConfig, FullAppOptions, OnrApp } from '../types';

export const AppContext = createContext<App | null>(null);

interface ProviderProps {
  children: ReactNode;
  session: any;
}

export class App implements OnrApp {
  private readonly components: AppComponents;
  private readonly appConfig: AppConfig;
  private readonly menuItems: any;

  constructor(options: FullAppOptions) {
    this.components = options.components;
    this.appConfig = options.appConfig;
    this.menuItems = options.menuItems;
  }

  initialize() {
    Http.setBaseUrl(this.appConfig.apiBaseUrl);
    Http.setToken(this.appConfig.apiKey);
  }

  getComponents(): AppComponents {
    return this.components;
  }

  getProvider() {
    const authEnabled = this.appConfig.auth.enabled;
    const Provider: FC<ProviderProps> = ({ children, session }: ProviderProps) => {
      if (authEnabled) {
        return (
          <NextAuthProvider session={session}>
            <AppContext.Provider value={this}>
              {/* @ts-ignore */}
              <AuthProvider>{children}</AuthProvider>
            </AppContext.Provider>
          </NextAuthProvider>
        );
      } else {
        return <AppContext.Provider value={this}>{children}</AppContext.Provider>;
      }
    };

    return Provider;
  }

  getAppConfig() {
    return this.appConfig;
  }

  getMenuItems() {
    return this.menuItems;
  }
}
