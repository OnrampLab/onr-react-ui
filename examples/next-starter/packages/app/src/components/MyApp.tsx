import { createApp, OnrApp } from '@onr/core';
import { Header, LoadingPage, Page, SidebarMenu } from '@onr/plugin-antd';
import { Context, createWrapper, MakeStore } from 'next-redux-wrapper';
import Head from 'next/head';
import Router from 'next/router';
import { done, start } from 'nprogress';
import React, { useEffect } from 'react';
import { appConfig, menuItems } from '../configs';
import { afterComponentDidMount, store } from '../redux';
import { GlobalStyles } from './GlobalStyles';
import { PageContainer } from './PageContainer';

// https://www.npmjs.com/package/next-plugin-antd-less?activeTab=readme
// Need to use require to import less
require('../assets/styles.less');

const makeStore: MakeStore = (context: Context) => store();

const wrapper = createWrapper(makeStore, { debug: false });

const app: OnrApp = createApp({
  appConfig,
  routes: menuItems,
  components: {
    Header,
    SidebarMenu,
    Page,
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
      <GlobalStyles />

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
        <PageContainer {...props} />
      </AppProvider>
    </>
  );
}

export const MyApp = wrapper.withRedux(AppComponent);
