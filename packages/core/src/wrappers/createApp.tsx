import { FC } from 'react';
import { App } from '../components';
import { LoadingPage } from '../pages';
import { AppComponents, AppOptions } from '../types';

export function createApp(options?: AppOptions) {
  // TODO: should create a DefaultNotFoundPage
  const DefaultNotFoundPage: FC = () => <div>PAGE NOT FOUND</div>;

  const components: AppComponents = {
    NotFoundErrorPage: DefaultNotFoundPage,
    LoadingPage,
    ...options?.components,
  };

  const app = App.create({
    components,
    appConfig: options?.appConfig,
    logConfig: options?.logConfig,
    menuItems: options?.menuItems,
    routes: options?.routes,
    apis: options?.apis,
  });

  app.initialize();

  return app;
}
