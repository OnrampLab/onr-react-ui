import { Plugin } from '../plugin';
import { AppComponents } from './AppComponents';
import { LayoutsType } from './OnrApp';

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
  plugins?: Plugin[];
  menuItems?: any;
  routes?: any;
  apis?: any;
  layouts?: LayoutsType;
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

export type RolesType = Record<string, string>;

export type AuthConfig = {
  model: any;
  roles: RolesType;
};

export type AppConfig = {
  apiBaseUrl: string;
  apiKey: string;
};

export type ThemeConfig = {
  primaryColor?: string;
  successColor?: string;
  infoColor?: string;
  warningColor?: string;
  errorColor?: string;
  layoutHeaderHeight?: string;
} & { [key: string]: string };
