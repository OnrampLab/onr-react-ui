import React from 'react';

import { AppProps } from 'next/app';
import { Page } from '@onr/core';
import { AuthWrapper, logout } from '@onr/auth';
import { AccountSelector } from '@onr/account';
import { menuItems } from '../';
import { theme } from './GlobalStyles';

const Container: React.FC = (props: AppProps) => {
  const { Component, pageProps } = props;

  return (
    <Page
      {...props}
      theme={theme}
      logout={logout}
      menuItems={menuItems}
      HeaderMainSection={AccountSelector}
    >
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
