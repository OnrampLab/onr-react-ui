import { createApp, OnrApp } from '@onr/core';
import { Header, Page, SidebarMenu } from '@onr/core-antd';
import { Context, createWrapper, MakeStore } from 'next-redux-wrapper';
import { AppProps } from 'next/app';
import Head from 'next/head';
import Router from 'next/router';
import { done, start } from 'nprogress';
import React, { Component } from 'react';
import { appConfig, menuItems } from '../configs';
import { afterComponentDidMount, store } from '../redux';
import { GlobalStyles } from './GlobalStyles';
import { PageContainer } from './PageContainer';

const makeStore: MakeStore<any> = (context: Context) => store();

const wrapper = createWrapper(makeStore, { debug: false });

const app: OnrApp = createApp({
  appConfig,
  routes: menuItems,
  components: {
    Header,
    SidebarMenu,
    Page,
  },
});

const AppProvider = app.getProvider();

console.log('app config', app.getAppConfig());

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

export class AppComponent extends Component<AppProps> {
  // NOTE: In order to get runtime config. We will need to use getInitialProps. But the down side
  //       is it will opt out Next.js default static optimization.
  // Please refer to https://nextjs.org/docs/api-reference/next.config.js/runtime-configuration

  public static getInitialProps = async ({ Component, ctx }: AppContext) => {
    // Keep in mind that this will be called twice on server, one for page and second for error page
    // ctx.store.dispatch({ type: "DEMO.SET_PLANT_IMAGE", payload: { demos:[] } });

    return {
      pageProps: {
        // Call page-level getInitialProps
        ...(Component.getInitialProps ? await Component.getInitialProps(ctx) : {}),
        // Some custom thing for all pages
        appProp: ctx.pathname,
      },
    };
  };

  componentDidMount() {
    afterComponentDidMount();
  }

  render(): JSX.Element {
    const { pageProps } = this.props;

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
        <AppProvider>
          <PageContainer {...this.props} />
        </AppProvider>
      </>
    );
  }
}

export const MyApp = wrapper.withRedux(AppComponent);
