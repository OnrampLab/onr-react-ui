import { Container, CoreStore, Inner, useAuth, useRoute } from '@onr/core';
import { Layout } from 'antd';
import { FC } from 'react';
import { useSelector } from 'react-redux';
import { Header } from './Header';
import { SidebarMenu } from './SidebarMenu';

interface Props {
  children: JSX.Element;
  HeaderMainSection: FC;
}

const { Content } = Layout;

/* eslint-disable complexity */
export const Page = (props: Props) => {
  const { HeaderMainSection, children } = props;
  const { currentRoute } = useRoute();
  // @ts-ignore
  const { user } = useAuth();
  const isAdminLayout = currentRoute.layout === 'antd-admin';

  const { boxed, darkSidebar, sidebarPopup, weakColor } = useSelector(
    (store: CoreStore) => store.coreStore,
  );

  return (
    <Container className={`${weakColor ? 'weakColor' : ''} ${boxed ? 'boxed shadow-sm' : ''}`}>
      {isAdminLayout && <Header HeaderMainSection={HeaderMainSection} />}
      <Layout className="workspace">
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
