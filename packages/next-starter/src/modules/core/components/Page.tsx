import * as React from 'react';
import { useSelector } from 'react-redux';
import { Layout, Spin } from 'antd';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

import { Header } from './Header';
import { SidebarMenu } from './SidebarMenu';
import { ThemeProvider } from 'styled-components';
import { theme } from './styles/GlobalStyles';
import { Container, Inner } from './styles/Page';

import { IWrapperPage, IStore } from '@onr/core';

const { Content } = Layout;

const NonDashboardRoutes = [
  '/auth/signin',
  '/auth/signup',
  '/auth/forgot',
  '/lockscreen',
  '/_error',
];
/* eslint-disable complexity */
export const Page = (props: IWrapperPage.IProps) => {
  const { HeaderMainSection, menuItems, children } = props;
  const router = useRouter();
  const currentUser = useSelector((store: IStore) => store.authStore.currentUser);
  const { boxed, darkSidebar, sidebarPopup, weakColor } = useSelector(
    (store: IStore) => store.wrapper,
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
                {...props}
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
