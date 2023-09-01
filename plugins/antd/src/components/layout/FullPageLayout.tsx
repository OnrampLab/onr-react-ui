import { PageProps } from '@onr/core';
import { Layout } from 'antd';
import { FC } from 'react';

const { Content } = Layout;

export const FullPageLayout: FC<PageProps> = props => {
  const { children } = props;
  return (
    <>
      <Layout style={{ minHeight: '100vh' }}>
        <Content>{children}</Content>
      </Layout>
    </>
  );
};
