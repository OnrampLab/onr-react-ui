import { App } from '../components';
import { LoadingPage } from '../pages';
import { AppOptions } from '../types';

/**
 * Creates a new Backstage App.
 */
export function createApp(options?: AppOptions) {
  // TODO: should create a DefaultNotFoundPage
  const DefaultNotFoundPage = () => <div>PAGE NOT FOUND</div>;

  const components = {
    NotFoundErrorPage: DefaultNotFoundPage,
    LoadingPage,
    ...options?.components,
  };

  const app = App.create({
    components,
    appConfig: options?.appConfig,
    menuItems: options?.menuItems,
    routes: options?.routes,
    apis: options?.apis,
  });

  app.initialize();

  return app;
}
