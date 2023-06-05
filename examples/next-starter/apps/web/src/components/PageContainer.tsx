import { StyleContainer, useRoute } from '@onr/core';
import { AppProps } from 'next/app';
import dynamic from 'next/dynamic';

const AntdPage = dynamic(() => import('@onr/plugin-antd').then(mod => mod.Page));
const AccountSelector = dynamic(() =>
  import('@onr/plugin-account').then(mod => mod.AccountSelector),
);

const Container: React.FC = (props: AppProps) => {
  const { Component, pageProps } = props;
  const { currentRoute } = useRoute();

  if (['antd-full-page', 'antd-admin'].includes(currentRoute.layout)) {
    return (
      <AntdPage {...props} HeaderMainSection={AccountSelector}>
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
