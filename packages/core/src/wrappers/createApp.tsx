import { FC } from 'react';
import { App } from '../components';
import { DefaultAuthUser } from '../entities';
import { LoadingPage } from '../pages';
import { AppComponents, AppConfig, AppOptions, AuthConfig } from '../types';

export function createApp(options: AppOptions) {
  // TODO: should create a DefaultNotFoundPage
  const DefaultNotFoundPage: FC = () => <div>PAGE NOT FOUND</div>;

  const components: AppComponents = {
    NotFoundErrorPage: DefaultNotFoundPage,
    LoadingPage,
    ...options?.components,
  };

  const defaultAppConfig: AppConfig = {
    apiBaseUrl: '',
    apiKey: '',
  };

  const defaultAuthConfig: AuthConfig = {
    model: DefaultAuthUser,
  };

  const app = App.create({
    configs: {
      appConfig: options.configs?.appConfig ?? options?.appConfig ?? defaultAppConfig,
      authConfig: options.configs?.authConfig ?? options?.authConfig ?? defaultAuthConfig,
      logConfig: options.configs?.logConfig ?? options?.logConfig,
      menuItems: options.configs?.menuItems ?? options?.menuItems,
      routes: options.configs?.routes ?? options?.routes,
    },
    components,
    apis: options?.apis,
  });

  app.initialize();

  return app;
}
