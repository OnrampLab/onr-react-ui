import { OnrApp } from '@onr/core';
import { Context, createWrapper, MakeStore } from 'next-redux-wrapper';
import { AppProps } from 'next/app';
import Head from 'next/head';
import Router from 'next/router';
import NProgress, { done, start } from 'nprogress';
import React, { useEffect } from 'react';
import { afterComponentDidMount, store } from '../redux';
import { PageContainer } from './PageContainer';

const makeStore: MakeStore<any> = (context: Context) => store();

const wrapper = createWrapper(makeStore, { debug: false });

NProgress.configure({ showSpinner: false });
Router.events.on('routeChangeStart', () => start());
Router.events.on('routeChangeComplete', () => done());
Router.events.on('routeChangeError', () => done());
Router.events.on(
  'routeChangeComplete',
  () =>
    document.querySelector('.workspace > .ant-layout') &&
    (document.querySelector('.workspace > .ant-layout')!.scrollTop = 0),
);

interface CustomAppProps extends AppProps {
  app: OnrApp;
}

export function AppComponent(props: CustomAppProps) {
  const { pageProps, app } = props;

  const AppContainer = app.getAppContainer();

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
        {pageProps.ieBrowser && (
          <script src="https://cdnjs.cloudflare.com/ajax/libs/babel-polyfill/7.2.5/polyfill.min.js" />
        )}
      </Head>
      <AppContainer session={pageProps.session}>
        <PageContainer {...props} />
      </AppContainer>
    </>
  );
}

export const MyApp = wrapper.withRedux(AppComponent);
