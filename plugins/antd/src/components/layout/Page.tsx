import { Container, CoreStore, Inner, useAuth, useRoute } from '@onr/core';
import { Layout } from 'antd';
import { ComponentType, FC, ReactNode } from 'react';
import { useSelector } from 'react-redux';
import { Header } from './Header';
import { SidebarMenu } from './SidebarMenu';

interface Props {
  children: ReactNode;
  HeaderMainSection: ComponentType;
  logo?: string;
  avatar?: string;
}

const { Content } = Layout;

/* eslint-disable complexity */
export const Page: FC<Props> = (props: Props) => {
  const { HeaderMainSection, avatar, logo, children } = props;
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
          <Content>{isAdminLayout ? <Inner>{children}</Inner> : children}</Content>
        </Layout>
      </Layout>
    </Container>
  );
};
