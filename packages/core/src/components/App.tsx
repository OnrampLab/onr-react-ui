import { Http } from '@onr/common';
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
  private readonly components: AppComponents;
  private readonly appConfig: AppConfig;
  private readonly menuItems: any;
  private readonly routes: any;

  constructor(options: FullAppOptions) {
    this.components = options.components;
    this.appConfig = options.appConfig;
    this.menuItems = options.menuItems;
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
