import { createContext, FC, ReactNode } from 'react';
import { AppComponents, FullAppOptions, OnrApp } from '../types';

export const AppContext = createContext(null);

type ProviderProps = {
  children?: ReactNode;
};

export class App implements OnrApp {
  private readonly components: AppComponents;
  private readonly routes: any;

  constructor(options: FullAppOptions) {
    this.components = options.components;
    this.routes = options.routes;
  }

  getComponents(): AppComponents {
    return this.components;
  }

  getProvider() {
    // eslint-disable-next-line
    const Provider: FC = ({ children }: ProviderProps): JSX.Element => {
      return <AppContext.Provider value={this}>{children}</AppContext.Provider>;
    };

    return Provider;
  }

  getRoutes() {
    return this.routes;
  }
}
