import { App, CoreStore, useAuth, useRoute } from '@onr/core';
import { useNewTodos, useRecentTodos } from '@onr/plugin-todo-demo-with-ts-rest-client';
import { AppProps } from 'next/app';
import dynamic from 'next/dynamic';
import React, { FC } from 'react';
import { useSelector } from 'react-redux';

const AntdPage = dynamic(() => import('@onr/plugin-antd').then(mod => mod.Page));
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

const Container: React.FC<AppProps> = (props: AppProps) => {
  const { Component, pageProps } = props;
  // NOTE: hack for type checking
  const AnyComponent = Component as any;
  const Page = AntdPage as any;
  const { currentRoute } = useRoute();
  const { user } = useAuth();

  useNewTodos();
  useRecentTodos();

  const HeaderMainSection = user ? AccountSelector : Empty;
  const content = <AnyComponent {...pageProps} />;

  if (['antd-full-page', 'antd-admin'].includes(currentRoute.layout)) {
    return (
      <Page
        HeaderMainSection={HeaderMainSection}
        avatar="/static/images/avatar.jpg"
        logo={<DefaultLogo />}
      >
        {content}
      </Page>
    );
  } else {
    return content;
  }
};

export const PageContainer: React.FC<AppProps> = (props: AppProps) => {
  const CorePageContainer = App.getInstance().getPageContainer();

  return (
    <CorePageContainer>
      <Container {...props} />
    </CorePageContainer>
  );
};
