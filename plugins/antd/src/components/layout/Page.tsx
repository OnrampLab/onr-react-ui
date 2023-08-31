import { Container, CoreStore, Inner, PageProps, useAuth, useRoute } from '@onr/core';
import { Layout } from 'antd';
import { FC } from 'react';
import { useSelector } from 'react-redux';
import { Header } from './Header';
import { SidebarMenu } from './SidebarMenu';

const { Content } = Layout;

/* eslint-disable complexity */
export const Page: FC<PageProps> = props => {
  const { HeaderMainSection, avatar, logo, children, innerStyle } = props;
  const { currentRoute } = useRoute();
  const { user } = useAuth();
  const isAdminLayout = currentRoute.layout === 'antd-admin';

  const { boxed, darkSidebar, sidebarPopup, weakColor } = useSelector(
    (store: CoreStore) => store.coreStore,
  );

  return (
    <Container className={`${weakColor ? 'weakColor' : ''} ${boxed ? 'boxed shadow-sm' : ''}`}>
      {isAdminLayout && (
        <Header HeaderMainSection={HeaderMainSection} logo={logo} avatar={avatar} />
      )}
      <Layout style={{ minHeight: '100vh' }}>
        {isAdminLayout && (
          <SidebarMenu
            currentUser={user}
            sidebarTheme={darkSidebar ? 'dark' : 'light'}
            sidebarMode={sidebarPopup ? 'vertical' : 'inline'}
          />
        )}

        <Layout>
          <Content>
            {isAdminLayout ? <Inner style={{ ...innerStyle }}>{children}</Inner> : children}
          </Content>
        </Layout>
      </Layout>
    </Container>
  );
};
