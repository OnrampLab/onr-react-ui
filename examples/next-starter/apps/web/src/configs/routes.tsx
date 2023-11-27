import { RouteType } from '@onr/core';
import { LayoutEnum } from '@onr/plugin-antd';
import { todoLogo, TodoMenuProvider } from '@onr/plugin-todo-demo-with-ts-rest-client';

export const routes: RouteType[] = [
  {
    path: '/admin',
    layout: LayoutEnum.HeaderBarLeftSideMenu,
    authRequired: true,
  },
  {
    path: '/admin/**',
    layout: LayoutEnum.HeaderBarLeftSideMenu,
    authRequired: true,
  },
  {
    path: '/auth/*',
    layout: LayoutEnum.FullPage,
    authRequired: false,
  },
  {
    path: '/todos',
    layout: LayoutEnum.HeaderBarLeftSideMenu,
    authRequired: false,
  },
  {
    path: '/todos/**',
    layout: LayoutEnum.HeaderBarLeftSideMenu,
    authRequired: false,
  },
  {
    path: '/todos-left-side-menu',
    layout: LayoutEnum.LeftSideMenuTopHeader,
    authRequired: false,
  },
  {
    path: '/todos-custom-menu',
    layout: LayoutEnum.HeaderBarLeftSideMenu,
    authRequired: false,
    pageProps: {
      showMenuToggle: false,
      logo: todoLogo,
    },
    providers: [TodoMenuProvider],
  },
  {
    path: '/todos-custom-menu/**',
    layout: LayoutEnum.HeaderBarLeftSideMenu,
    authRequired: false,
    pageProps: {
      showMenuToggle: false,
      logo: todoLogo,
    },
    providers: [TodoMenuProvider],
  },
  {
    path: '/_error',
    layout: LayoutEnum.FullPage,
    authRequired: false,
  },
  {
    path: '/',
    layout: LayoutEnum.FullPage,
    authRequired: false,
  },
  {
    path: '/**',
    layout: LayoutEnum.FullPage,
    authRequired: false,
  },
];
