import { AppComponents } from './AppComponents';

export type AppOptions = {
  /**
   * Supply components to the app to override the default ones.
   */
  components?: Partial<AppComponents>;
  appConfig?: AppConfig;
  routes?: any;
};

export type AppConfig = {
  apiBaseUrl: string;
  apiKey: string;
  fullPageRoutes: string[];
};
