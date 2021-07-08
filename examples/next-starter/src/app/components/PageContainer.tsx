import { AuthWrapper, logout } from '@onr/auth';
import { Page } from '@onr/core-antd';
import { AccountSelector } from '@onr/plugin-account';
import { AppProps } from 'next/app';
import { theme } from './GlobalStyles';

const Container: React.FC = (props: AppProps) => {
  const { Component, pageProps } = props;

  return (
    <Page {...props} theme={theme} logout={logout} HeaderMainSection={AccountSelector}>
      <Component {...pageProps} />
    </Page>
  );
};

export const PageContainer: React.FC = props => {
  //wrap root providers here, if any
  return (
    <AuthWrapper>
      <Container {...props} />
    </AuthWrapper>
  );
};
