import { createApp, OnrApp, RouteProvider } from '@onr/core';
import { Context, createWrapper, MakeStore } from 'next-redux-wrapper';
import Head from 'next/head';
import Router from 'next/router';
import { done, start } from 'nprogress';
import React, { useEffect } from 'react';
import { appConfig } from '../configs/appConfig';
import { menuItems } from '../configs/menuItems';
import { routes } from '../configs/routes';
import { afterComponentDidMount, store } from '../redux';
import { LoadingPage } from './LoadingPage';
import { PageContainer } from './PageContainer';

// https://www.npmjs.com/package/next-plugin-antd-less?activeTab=readme
// Need to use require to import less
require('../assets/styles.less');

const makeStore: MakeStore = (context: Context) => store();

const wrapper = createWrapper(makeStore, { debug: false });

const app: OnrApp = createApp({
  appConfig,
  menuItems,
  routes,
  components: {
    LoadingPage,
  },
});

const AppProvider = app.getProvider();

Router.events.on('routeChangeStart', () => start());
Router.events.on('routeChangeComplete', () => done());
Router.events.on('routeChangeError', () => done());
Router.events.on(
  'routeChangeComplete',
  () =>
    document.querySelector('.workspace > .ant-layout') &&
    (document.querySelector('.workspace > .ant-layout')!.scrollTop = 0),
);

interface Props {
  pageProps?: any;
}

export function AppComponent(props: Props) {
  const { pageProps } = props;

  useEffect(() => {
    afterComponentDidMount();
  });

  return (
    <>
      <Head>
        <meta
          name="viewport"
          content="user-scalable=no,initial-scale=1,maximum-scale=1,minimum-scale=1,width=device-width,height=device-height"
        />
        <meta charSet="utf-8" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <link rel="shortcut icon" href="/static/images/triangle.png" />
        <title>Next Starter</title>
        <link
          href="https://fonts.googleapis.com/css?family=Anonymous+Pro:400,700"
          rel="stylesheet"
        />
        {pageProps.ieBrowser && (
          <script src="https://cdnjs.cloudflare.com/ajax/libs/babel-polyfill/7.2.5/polyfill.min.js" />
        )}
      </Head>
      <AppProvider session={pageProps.session}>
        <RouteProvider>
          <PageContainer {...props} />
        </RouteProvider>
      </AppProvider>
    </>
  );
}

export const MyApp = wrapper.withRedux(AppComponent);
