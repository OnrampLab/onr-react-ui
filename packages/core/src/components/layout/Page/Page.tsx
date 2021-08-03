import { FC } from 'react';
import { useSelector } from 'react-redux';
import { AnyAction } from 'redux';
import { ThemeProvider } from 'styled-components';
import { Header, SidebarMenu } from '../';
import { useAuth, useRoute } from '../../../hooks';
import { CoreStore } from '../../../redux';
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
  const { currentRoute } = useRoute();
  // @ts-ignore
  const { user } = useAuth();
  const { boxed, darkSidebar, sidebarPopup, weakColor } = useSelector(
    (store: CoreStore) => store.coreStore,
  );
  const isAdminLayout = currentRoute.layout === 'antd-admin';

  // TODO: create a simple page component
  return (
    <ThemeProvider theme={theme}>
      <Container className={`${weakColor ? 'weakColor' : ''} ${boxed ? 'boxed shadow-sm' : ''}`}>
        {isAdminLayout && <Header HeaderMainSection={HeaderMainSection} />}
        <div className="workspace">
          {isAdminLayout && (
            <SidebarMenu
              logout={logout}
              currentUser={user}
              sidebarTheme={darkSidebar ? 'dark' : 'light'}
              sidebarMode={sidebarPopup ? 'vertical' : 'inline'}
            />
          )}

          <div>
            <div>{isAdminLayout ? <div>{children}</div> : children}</div>
          </div>
        </div>
      </Container>
    </ThemeProvider>
  );
};
