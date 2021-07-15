import { Container, CoreStore, Inner } from '@onr/core';
import { Layout, Spin } from 'antd';
import { useRouter } from 'next/router';
import { FC, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { AnyAction } from 'redux';
import { ThemeProvider } from 'styled-components';
import { Header } from './Header';
import { SidebarMenu } from './SidebarMenu';

interface Props {
  children: JSX.Element;
  theme: any;
  HeaderMainSection: FC;
  logout: () => AnyAction;
  context: any
}

const { Content } = Layout;

/* eslint-disable complexity */
export const Page = (props: Props) => {
  const { HeaderMainSection, theme, logout, children, context } = props;
  const router = useRouter();
  console.log("wwwww3", context)
  const [loading, setLoading] = useState(true);
  const currentUser = useSelector((store: CoreStore) => store.authStore.currentUser);
  const { boxed, darkSidebar, sidebarPopup, weakColor } = useSelector(
    (store: CoreStore) => store.coreStore,
  );

  useEffect(() => {
    const timeout = setTimeout(() => {
      setLoading(false);
    }, 1000);
    () => clearTimeout(timeout)
  }, [loading]);

  if (!context) return null
  const appConfig = context.getAppConfig();
  const fullPageRoutes = appConfig['full-page-routes'];
  const isNotDashboard = router && fullPageRoutes.includes(router.pathname);


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
