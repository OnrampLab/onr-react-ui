import { StyleContainer, useAuth, useRoute } from '@onr/core';
import { useRecentTodos } from '@onr/plugin-todo-demo-with-ts-rest-client';
import { AppProps } from 'next/app';
import dynamic from 'next/dynamic';
import React, { FC } from 'react';

const AntdPage = dynamic(() => import('@onr/plugin-antd').then(mod => mod.Page));
const AccountSelector = dynamic(() =>
  import('@onr/plugin-account').then(mod => mod.AccountSelector),
);

const Empty: FC = () => {
  return <></>;
};

const Container: React.FC = (props: AppProps) => {
  const { Component, pageProps } = props;
  const { currentRoute } = useRoute();
  const { user } = useAuth();

  useRecentTodos();

  const HeaderMainSection = user ? AccountSelector : Empty;

  if (['antd-full-page', 'antd-admin'].includes(currentRoute.layout)) {
    return (
      <AntdPage {...props} HeaderMainSection={HeaderMainSection}>
        <Component {...pageProps} />
      </AntdPage>
    );
  } else {
    return <Component {...pageProps} />;
  }
};

export const PageContainer: React.FC = props => {
  //wrap root providers here, if any
  return (
    <StyleContainer>
      <Container {...props} />
    </StyleContainer>
  );
};
