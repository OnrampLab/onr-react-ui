import { AppComponents } from './AppComponents';

export type AppOptions = {
  /**
   * Supply components to the app to override the default ones.
   */
  components?: Partial<AppComponents>;
  appConfig?: AppConfig;
  menuItems?: any;
  routes?: any;
};

export type AuthConfig = {
  enabled: boolean;
};

export type AppConfig = {
  apiBaseUrl: string;
  apiKey: string;
  auth: AuthConfig;
  fullPageRoutes: string[];
};
