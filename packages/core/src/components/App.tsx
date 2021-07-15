import { Http } from '@onr/common';
import { createContext, FC, ReactNode } from 'react';
import { AppComponents, FullAppOptions, OnrApp } from '../types';

export const AppContext = createContext<any | null>(null);

type ProviderProps = {
  children?: ReactNode;
};

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
    // @ts-ignore
    // eslint-disable-next-line
    const Provider: FC<ReactNode> = ({ children }: ProviderProps): ReactNode => {
      console.log({ config: this.getAppConfig() });
      return <AppContext.Provider value={this}>{children}</AppContext.Provider>;
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
