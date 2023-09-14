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
    appConfig: options?.configs?.appConfig ?? options?.appConfig,
    logConfig: options?.configs?.logConfig ?? options?.logConfig,
    menuItems: options?.configs?.menuItems ?? options?.menuItems,
    routes: options?.configs?.routes ?? options?.routes,
    apis: options?.configs?.apis ?? options?.apis,
  });

  app.initialize();

  return app;
}
