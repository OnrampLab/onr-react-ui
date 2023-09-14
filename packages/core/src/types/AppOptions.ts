import { AppComponents } from './AppComponents';

export type AppOptions = {
  /**
   * Supply components to the app to override the default ones.
   */
  components?: Partial<AppComponents>;
  configs?: any;
  appConfig?: AppConfig;
  logConfig?: any;
  menuItems?: any;
  routes?: any;
  apis?: any;
};

export type AuthConfig = {
  enabled: boolean;
};

export type AppConfig = {
  apiBaseUrl: string;
  apiKey: string;
  auth: AuthConfig;
};
