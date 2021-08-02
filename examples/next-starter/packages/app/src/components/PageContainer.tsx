import { PageProvider } from '@onr/core';
import { AccountSelector } from '@onr/plugin-account';
import { Page } from '@onr/plugin-antd';
import { AppProps } from 'next/app';
import { theme } from './GlobalStyles';

const Container: React.FC = (props: AppProps) => {
  const { Component, pageProps } = props;

  return (
    <PageProvider>
      <Page {...props} theme={theme} HeaderMainSection={AccountSelector}>
        <Component {...pageProps} />
      </Page>
    </PageProvider>
  );
};

export const PageContainer: React.FC = props => {
  //wrap root providers here, if any
  return <Container {...props} />;
};
