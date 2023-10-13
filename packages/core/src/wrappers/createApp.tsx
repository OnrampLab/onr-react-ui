import { FC } from 'react';
import { App } from '../components';
import { LoadingPage } from '../pages';
import { AppComponents, AppOptions, Configs } from '../types';
import { defaultConfigs } from './defaultConfigs';

export function createApp(options: AppOptions) {
  // TODO: should create a DefaultNotFoundPage
  const DefaultNotFoundPage: FC = () => <div>PAGE NOT FOUND</div>;

  const components: AppComponents = {
    NotFoundErrorPage: DefaultNotFoundPage,
    LoadingPage,
    ...options.components,
  };

  const configs: Configs = {
    ...defaultConfigs,
    ...options.configs,
  };

  const app = App.create({
    configs,
    components,
    apis: options?.apis,
    layouts: options?.layouts || {},
    plugins: options?.plugins || [],
  });

  app.initialize();

  return app;
}
