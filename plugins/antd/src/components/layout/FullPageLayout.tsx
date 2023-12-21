import { PageProps } from '@onr/core';
import { Layout } from 'antd';
import { FC } from 'react';
import styled from 'styled-components';

const { Content } = Layout;

export const Inner = styled.div`
  margin: 0 auto;
  position: relative;
  background-color: white;
  height: 100dvh;
  overflow-y: auto;
  overflow-x: hidden;
`;

export const FullPageLayout: FC<PageProps> = props => {
  const { innerStyle } = props;
  const { children } = props;

  return (
    <Layout>
      <Content>
        <Inner style={{ ...innerStyle }}>{children}</Inner>
      </Content>
    </Layout>
  );
};
