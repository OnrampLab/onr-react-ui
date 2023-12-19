import { createApp, OnrApp, withApp } from '@onr/core';
import { AccountPlugin } from '@onr/plugin-account';
import {
  FullPageLayout,
  HeaderBarLeftSideMenuLayout,
  LayoutEnum,
  LeftSideMenuTopHeaderLayout,
} from '@onr/plugin-antd';
import { AuthPlugin } from '@onr/plugin-auth';
import { UserPlugin } from '@onr/plugin-user';
import { LoadingPage } from '../components/LoadingPage';
import { MyApp } from '../components/MyApp';
import { configs } from '../configs';

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
        [LayoutEnum.FullPage]: FullPageLayout,
        [LayoutEnum.HeaderBarLeftSideMenu]: HeaderBarLeftSideMenuLayout,
        [LayoutEnum.LeftSideMenuTopHeader]: LeftSideMenuTopHeaderLayout,
      },
    });

    this.app.bootstrap();
  }

  getAppComponent() {
    return withApp(MyApp, this.app);
  }

  getService<T>(serviceName: string) {
    return this.app.getService<T>(serviceName);
  }
}

export const application = new Application();
