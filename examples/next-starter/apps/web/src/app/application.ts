import { createApp, OnrApp } from '@onr/core';
import { AccountPlugin } from '@onr/plugin-account';
import { FullPageLayout, HeaderBarLeftSideMenuLayout } from '@onr/plugin-antd';
import { AuthPlugin } from '@onr/plugin-auth';
import { UserPlugin } from '@onr/plugin-user';
import { LoadingPage } from '../components/LoadingPage';
import { MyApp } from '../components/MyApp';
import { configs } from '../configs';
import { withApp } from './withApp';

export class Application {
  private app: OnrApp;

  constructor() {
    this.app = createApp({
      configs,
      components: {
        LoadingPage,
      },
      plugins: [new AuthPlugin(), new AccountPlugin(), new UserPlugin()],
      layouts: {
        'full-page': FullPageLayout,
        'header-bar-left-side-menu': HeaderBarLeftSideMenuLayout,
      },
    });

    this.app.bootstrap();
  }

  getAppComponent() {
    return withApp(MyApp, this.app);
  }

  getService<T>(serviceName: string) {
    return this.app.getService(serviceName) as T;
  }
}

export const application = new Application();
