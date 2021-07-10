import { AppComponents } from './AppComponents';

export type OnrApp = {
  initialize(): void;
  getComponents(): AppComponents;
  getProvider(): JSX.Element;
  getAppConfig(): any;
  getRoutes(): any;
};

export type FullAppOptions = {
  components: AppComponents;
  appConfig: any;
  routes: any;
};
