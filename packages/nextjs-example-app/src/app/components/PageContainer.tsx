import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';

import { menuItems } from '..';
import { Page } from '@onr-react-ui/nextjs-core';

const Container: React.FC = (props) => {
  const { Component, pageProps } = props;

  return (
    <Page
      {...props}
      menuItems={menuItems}
    >
      <Component {...pageProps}/>
    </Page>
  );
};

export const PageContainer: React.FC = (props) => {
  //wrap root providers here, if any
  return (
    <Container {...props}/>
  )
}
