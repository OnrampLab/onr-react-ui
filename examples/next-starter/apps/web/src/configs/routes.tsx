import { RouteType } from '@onr/core';
import { LayoutEnum } from '@onr/plugin-antd';
import { TodoMenuProvider } from '../providers';

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
    path: '/todos-custom-menu',
    layout: LayoutEnum.HeaderBarLeftSideMenu,
    authRequired: false,
    CustomMenuProvider: TodoMenuProvider,
  },
  {
    path: '/todos-custom-menu/**',
    layout: LayoutEnum.HeaderBarLeftSideMenu,
    authRequired: false,
    CustomMenuProvider: TodoMenuProvider,
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
