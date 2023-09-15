import { AppComponents } from './AppComponents';
import { ANY } from './utilities';

export type AppOptions = {
  /**
   * Supply components to the app to override the default ones.
   */
  configs?: Configs;
  components?: Partial<AppComponents>;
  appConfig?: AppConfig;
  authConfig?: AuthConfig;
  themeConfig?: ThemeConfig;
  logConfig?: any;
  menuItems?: any;
  routes?: any;
  apis?: any;
};

export type DefaultConfigs = {
  appConfig: AppConfig;
  authConfig: AuthConfig;
  themeConfig: ThemeConfig;
} & OptionalConfigs;

type OptionalConfigs = Partial<{
  logConfig: any;
  menuItems: any;
  routes?: any;
}>;

export type Configs = OptionalConfigs & DefaultConfigs;

export type AuthConfig = {
  model: any;
};

export type AppConfig = {
  apiBaseUrl: string;
  apiKey: string;
};

export type ThemeConfig = {
  primaryColor: string;
  successColor: string;
  infoColor: string;
  warningColor: string;
  errorColor: string;
} & ANY;
