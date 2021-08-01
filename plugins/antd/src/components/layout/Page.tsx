import { AppContext, Container, CoreStore, Inner, useAuth } from '@onr/core';
import { Layout } from 'antd';
import { useRouter } from 'next/router';
import { FC, useContext } from 'react';
import { useSelector } from 'react-redux';
import { ThemeProvider } from 'styled-components';
import { Header } from './Header';
import { SidebarMenu } from './SidebarMenu';

interface Props {
  children: JSX.Element;
  theme: any;
  HeaderMainSection: FC;
}

const { Content } = Layout;

/* eslint-disable complexity */
export const Page = (props: Props) => {
  const { HeaderMainSection, theme, children } = props;
  const router = useRouter();
  const appConfig = useContext(AppContext)?.getAppConfig();
  const fullPageRoutes = appConfig.fullPageRoutes;
  //@ts-ignore
  const { user } = useAuth();

  const { boxed, darkSidebar, sidebarPopup, weakColor } = useSelector(
    (store: CoreStore) => store.coreStore,
  );
  const isNotDashboard = router && fullPageRoutes.includes(router.pathname);

  return (
    <ThemeProvider theme={theme}>
      <Container className={`${weakColor ? 'weakColor' : ''} ${boxed ? 'boxed shadow-sm' : ''}`}>
        {!isNotDashboard && <Header HeaderMainSection={HeaderMainSection} />}
        <Layout className="workspace">
          {!isNotDashboard && (
            <SidebarMenu
              currentUser={user}
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
  );
};
