import { CoreStore, Inner, PageProps, useAuth } from '@onr/core';
import { Layout } from 'antd';
import dynamic from 'next/dynamic';
import { FC } from 'react';
import { useSelector } from 'react-redux';
import { Header } from './Header';

const SidebarMenu = dynamic(() => import('./SidebarMenu').then(mod => mod.SidebarMenu), {
  ssr: false,
});

const { Content } = Layout;

export const LeftSideMenuTopHeaderLayout: FC<PageProps> = props => {
  const { HeaderMainSection, avatar, logo, children, innerStyle, showMenuToggle } = props;
  const { user } = useAuth();
  const { darkSidebar, sidebarPopup } = useSelector((store: CoreStore) => store.coreStore);

  return (
    <>
      <Layout>
        <SidebarMenu
          logo={logo}
          showToggle={showMenuToggle}
          currentUser={user}
          sidebarTheme={darkSidebar ? 'dark' : 'light'}
          sidebarMode={sidebarPopup ? 'vertical' : 'inline'}
        />

        <Layout>
          <Header HeaderMainSection={HeaderMainSection} logo={logo} avatar={avatar} />
          <Content>
            <Inner style={{ ...innerStyle }}>{children}</Inner>
          </Content>
        </Layout>
      </Layout>
    </>
  );
};