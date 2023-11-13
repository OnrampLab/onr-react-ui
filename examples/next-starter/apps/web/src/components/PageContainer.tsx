import { CoreStore, Page, createLayoutContainer } from '@onr/core';
import { GlobalModalProvider } from '@onr/plugin-antd';
import { useAppUser } from '@onr/plugin-custom-auth';
import { useNewTodos, useRecentTodos } from '@onr/plugin-todo-demo-with-ts-rest-client';
import { ConfigProvider } from 'antd';
import { AppProps } from 'next/app';
import dynamic from 'next/dynamic';
import React, { FC } from 'react';
import { useSelector } from 'react-redux';
import { themeConfig } from '../configs/theme';
import { antdTheme } from './antdTheme';

const GlobalStyles = dynamic(() =>
  import('../components/GlobalStyles').then(mod => mod.GlobalStyles),
);

const AccountSelector = dynamic(() =>
  import('@onr/plugin-account').then(mod => mod.AccountSelector),
);

const Empty: FC = () => {
  return <></>;
};

const DefaultLogo: FC = () => {
  const { name } = useSelector((store: CoreStore) => store.coreStore);

  return (
    <>
      <img src="/static/images/triangle.png" style={{ height: 24 }} />
      <strong className="mx-1 text-black">{name}</strong>
    </>
  );
};

const StyleContainer = createLayoutContainer({
  GlobalStyles,
  theme: themeConfig,
});

const Container: FC<AppProps> = (props: AppProps) => {
  const { Component, pageProps } = props;
  // NOTE: hack for type checking
  const AnyComponent = Component as any;
  const user = useAppUser();

  useNewTodos();
  useRecentTodos();

  const HeaderMainSection = user ? AccountSelector : Empty;
  const content = <AnyComponent {...pageProps} />;

  return (
    <Page
      HeaderMainSection={HeaderMainSection}
      avatar="/static/images/avatar.jpg"
      logo={<DefaultLogo />}
      innerStyle={{ padding: '1.5em' }}
    >
      {content}
    </Page>
  );
};

export const PageContainer: FC<AppProps> = (props: AppProps) => {
  return (
    <ConfigProvider theme={antdTheme}>
      <StyleContainer>
        <GlobalModalProvider>
          <Container {...props} />
        </GlobalModalProvider>
      </StyleContainer>
    </ConfigProvider>
  );
};
