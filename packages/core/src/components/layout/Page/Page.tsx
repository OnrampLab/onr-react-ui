import { useRouter } from 'next/router';
import { FC, useContext } from 'react';
import { useSelector } from 'react-redux';
import { AnyAction } from 'redux';
import { ThemeProvider } from 'styled-components';
import { Header, SidebarMenu } from '../';
import { useAuth } from '../../../hooks';
import { CoreStore } from '../../../redux';
import { AppContext } from '../../App';
import { Container } from './styles';

interface Props {
  children: JSX.Element;
  theme: any;
  HeaderMainSection: FC;
  logout: () => AnyAction;
}

/* eslint-disable complexity */
export const Page = (props: Props) => {
  const { HeaderMainSection, theme, logout, children } = props;
  const router = useRouter();
  const appConfig = useContext(AppContext)?.getAppConfig();
  const fullPageRoutes = appConfig.fullPageRoutes;
  // @ts-ignore
  const { user } = useAuth();
  const { boxed, darkSidebar, sidebarPopup, weakColor } = useSelector(
    (store: CoreStore) => store.coreStore,
  );
  const isNotDashboard = router && fullPageRoutes.includes(router.pathname);

  // TODO: create a simple page component
  return (
    <ThemeProvider theme={theme}>
      <Container className={`${weakColor ? 'weakColor' : ''} ${boxed ? 'boxed shadow-sm' : ''}`}>
        {!isNotDashboard && <Header HeaderMainSection={HeaderMainSection} />}
        <div className="workspace">
          {!isNotDashboard && (
            <SidebarMenu
              logout={logout}
              currentUser={user}
              sidebarTheme={darkSidebar ? 'dark' : 'light'}
              sidebarMode={sidebarPopup ? 'vertical' : 'inline'}
            />
          )}

          <div>
            <div>{!isNotDashboard ? <div>{children}</div> : children}</div>
          </div>
        </div>
      </Container>
    </ThemeProvider>
  );
};
