import { usePage } from '@onr/core';
import { AccountSelector } from '@onr/plugin-account';
import { AppProps } from 'next/app';
import dynamic from 'next/dynamic';
import { theme } from './GlobalStyles';

const AntdPage = dynamic(() => import('@onr/plugin-antd').then(mod => mod.Page));

const Container: React.FC = (props: AppProps) => {
  const { Component, pageProps } = props;
  const { currentRoute } = usePage();

  if (currentRoute.layout === 'antd-admin' || currentRoute.layout === 'antd-full-page') {
    return (
      <AntdPage {...props} theme={theme} HeaderMainSection={AccountSelector}>
        <Component {...pageProps} />
      </AntdPage>
    );
  } else {
    return <Component {...pageProps} />;
  }
};

export const PageContainer: React.FC = props => {
  //wrap root providers here, if any
  return <Container {...props} />;
};
