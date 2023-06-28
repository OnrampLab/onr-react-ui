import { createLayoutContainer } from '@onr/core';
import dynamic from 'next/dynamic';

const GlobalStyles = dynamic(() =>
  import('../components/GlobalStyles').then(mod => mod.GlobalStyles),
);
const themePromise = import('../components/GlobalStyles').then(mod => mod.theme);

const AntdLayoutContainer = createLayoutContainer({
  GlobalStyles,
  themePromise,
});

export const routes = [
  {
    path: '/admin',
    layout: 'antd-admin',
    authRequired: true,
    LayoutContainer: AntdLayoutContainer,
  },
  {
    path: '/admin/**',
    layout: 'antd-admin',
    authRequired: true,
    LayoutContainer: AntdLayoutContainer,
  },
  {
    path: '/auth/*',
    layout: 'antd-full-page',
    authRequired: true,
    LayoutContainer: AntdLayoutContainer,
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
    path: '/**',
    layout: 'simple-full-page',
    authRequired: false,
  },
];
