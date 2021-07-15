import { AuthWrapper, logout } from '@onr/auth';
import { AppContext } from '@onr/core';
import { Page } from '@onr/core-antd';
import { AccountSelector } from '@onr/plugin-account';
import { AppProps } from 'next/app';
import { useContext } from 'react';
import { theme } from './GlobalStyles';

const Container: React.FC = (props: AppProps) => {
  const { Component, pageProps } = props;
  const context = useContext(AppContext)
  console.log("wwww1", context)

  return (
    <Page {...props} context={context} theme={theme} logout={logout} HeaderMainSection={AccountSelector}>
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
