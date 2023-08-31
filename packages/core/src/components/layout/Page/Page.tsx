import { useSelector } from 'react-redux';
import { Header, SidebarMenu } from '../';
import { useAuth } from '../../../hooks';
import { useRoute } from '../../../providers';
import { CoreStore } from '../../../redux';
import { Container, Inner } from './styles';

/* eslint-disable complexity */
export const Page = (props: any) => {
  const { HeaderMainSection, children, innerStyle } = props;
  const { currentRoute } = useRoute();
  const { user } = useAuth();
  const { boxed, darkSidebar, sidebarPopup, weakColor } = useSelector(
    (store: CoreStore) => store.coreStore,
  );
  const isAdminLayout = currentRoute.layout === 'antd-admin';

  // TODO: create a simple page component
  return (
    <Container className={`${weakColor ? 'weakColor' : ''} ${boxed ? 'boxed shadow-sm' : ''}`}>
      {isAdminLayout && <Header HeaderMainSection={HeaderMainSection} />}
      <div className="workspace">
        {isAdminLayout && (
          <SidebarMenu
            currentUser={user}
            sidebarTheme={darkSidebar ? 'dark' : 'light'}
            sidebarMode={sidebarPopup ? 'vertical' : 'inline'}
          />
        )}

        <div>
          <div>
            {isAdminLayout ? <Inner style={{ ...innerStyle }}>{children}</Inner> : children}
          </div>
        </div>
      </div>
    </Container>
  );
};
