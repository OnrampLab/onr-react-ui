import { CoreStore, Inner, PageProps, useAuth } from '@onr/core';
import { Layout } from 'antd';
import dynamic from 'next/dynamic';
import { FC } from 'react';
import { useSelector } from 'react-redux';
import { Header } from '../components';

const SidebarMenu = dynamic(() => import('../components').then(mod => mod.SidebarMenu), {
  ssr: false,
});

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
