import { AppComponents } from './AppComponents';

export type AppOptions = {
  /**
   * Supply components to the app to override the default ones.
   */
  configs?: Configs;
  components?: Partial<AppComponents>;
  appConfig?: AppConfig;
  authConfig?: AuthConfig;
  logConfig?: any;
  menuItems?: any;
  routes?: any;
  apis?: any;
};

export type Configs = {
  appConfig: AppConfig;
  authConfig: AuthConfig;
  logConfig: any;
  menuItems: any;
  routes?: any;
};

export type AuthConfig = {
  model: any;
};

export type AppConfig = {
  apiBaseUrl: string;
  apiKey: string;
};
