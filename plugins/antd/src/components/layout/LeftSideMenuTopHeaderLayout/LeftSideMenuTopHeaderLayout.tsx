import { CoreStore, Inner, PageProps, useAuth } from '@onr/core';
import { Layout } from 'antd';
import { FC } from 'react';
import { useSelector } from 'react-redux';
import { Header, SidebarMenu } from '../components';

const { Content } = Layout;

export const LeftSideMenuTopHeaderLayout: FC<PageProps> = props => {
  const { children, innerStyle } = props;
  const { user } = useAuth();
  const { darkSidebar, sidebarPopup } = useSelector((store: CoreStore) => store.coreStore);

  return (
    <>
      <Layout>
        <SidebarMenu
          {...props}
          currentUser={user}
          sidebarTheme={darkSidebar ? 'dark' : 'light'}
          sidebarMode={sidebarPopup ? 'vertical' : 'inline'}
          showLogoForDsk={true}
        />

        <Layout>
          <Header {...props} showLogoForDsk={false} />

          <Content>
            <Inner style={{ ...innerStyle }}>{children}</Inner>
          </Content>
        </Layout>
      </Layout>
    </>
  );
};
