export const routes = [
  {
    path: '/admin',
    layout: 'antd-admin',
    authRequired: true,
  },
  {
    path: '/admin/*',
    layout: 'antd-admin',
    authRequired: true,
  },
  {
    path: '/auth/*',
    layout: 'antd-full-page',
    authRequired: true,
  },
  {
    path: '/_error',
    layout: 'antd-full-page',
    authRequired: false,
  },
  {
    path: '/',
    layout: 'simple-full-page',
    authRequired: false,
  },
  {
    path: '/*',
    layout: 'simple-full-page',
    authRequired: false,
  },
];
