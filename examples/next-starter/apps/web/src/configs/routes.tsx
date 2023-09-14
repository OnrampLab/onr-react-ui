import { RouteType } from '@onr/core';

export const routes: RouteType[] = [
  {
    path: '/admin',
    layout: 'header-bar-left-side-menu',
    authRequired: true,
  },
  {
    path: '/admin/**',
    layout: 'header-bar-left-side-menu',
    authRequired: true,
  },
  {
    path: '/auth/*',
    layout: 'full-page',
    authRequired: false,
  },
  {
    path: '/todos',
    layout: 'header-bar-left-side-menu',
    authRequired: false,
  },
  {
    path: '/todos/**',
    layout: 'header-bar-left-side-menu',
    authRequired: false,
  },
  {
    path: '/_error',
    layout: 'full-page',
    authRequired: false,
  },
  {
    path: '/',
    layout: 'full-page',
    authRequired: false,
  },
  {
    path: '/**',
    layout: 'full-page',
    authRequired: false,
  },
];
