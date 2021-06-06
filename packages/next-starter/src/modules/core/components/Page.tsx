import React, { FC, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { AnyAction } from 'redux';
import { Layout, Spin } from 'antd';
import { useRouter } from 'next/router';
import { ThemeProvider } from 'styled-components';
import { Header, SidebarMenu } from '@core';
import { CoreStore } from '@onr/core';

import { Container, Inner } from './styles/Page';

interface Props {
  children: JSX.Element;
  menuItems: any[];
  theme: any;
  HeaderMainSection: FC;
  logout: () => AnyAction;
}

const { Content } = Layout;

const NonDashboardRoutes = [
  '/auth/signin',
  '/auth/signup',
  '/auth/forgot',
  '/lockscreen',
  '/_error',
];
/* eslint-disable complexity */
export const Page = (props: Props) => {
  const { HeaderMainSection, menuItems, theme, logout, children } = props;
  const router = useRouter();
  const currentUser = useSelector((store: CoreStore) => store.authStore.currentUser);
  const { boxed, darkSidebar, sidebarPopup, weakColor } = useSelector(
    (store: CoreStore) => store.coreStore,
  );
  const [loading, setLoading] = useState(true);
  const isNotDashboard = router && NonDashboardRoutes.includes(router.pathname);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, [loading]);

  return (
    <Spin tip="Loading..." size="large" spinning={loading}>
      <ThemeProvider theme={theme}>
        <Container className={`${weakColor ? 'weakColor' : ''} ${boxed ? 'boxed shadow-sm' : ''}`}>
          {!isNotDashboard && <Header HeaderMainSection={HeaderMainSection} />}
          <Layout className="workspace">
            {!isNotDashboard && (
              <SidebarMenu
                logout={logout}
                currentUser={currentUser}
                menuItems={menuItems}
                sidebarTheme={darkSidebar ? 'dark' : 'light'}
                sidebarMode={sidebarPopup ? 'vertical' : 'inline'}
              />
            )}

            <Layout>
              <Content>{!isNotDashboard ? <Inner>{children}</Inner> : children}</Content>
            </Layout>
          </Layout>
        </Container>
      </ThemeProvider>
    </Spin>
  );
};
