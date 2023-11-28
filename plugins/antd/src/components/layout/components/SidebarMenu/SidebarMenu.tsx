import {
  AuthUser,
  coreActions,
  CoreStore,
  Logo,
  PageProps,
  Sidebar,
  useAuth,
  useMenuItems,
} from '@onr/core';
import { Button, Drawer, Layout, Menu, MenuProps } from 'antd';
import { isEmpty, last } from 'lodash';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import {
  findCurrentMenuKeys,
  getAvailableMenuItems,
  getMenuItemKey as getKey,
  getMenuItemConfig,
} from '../../../../utils';
import { PreferenceSetting } from './PreferenceSetting';

interface Props extends PageProps {
  currentUser: AuthUser;
  sidebarTheme: 'dark' | 'light';
  sidebarMode: 'vertical' | 'inline';
  showLogoForDsk?: boolean;
}

const { Sider } = Layout;

const MobileDrawer = styled(Drawer)`
  .ant-drawer-body {
    padding: 0;
    padding-top: 2em;
  }
`;

export const SidebarMenu: React.FC<Props> = props => {
  const {
    currentUser,
    sidebarMode,
    sidebarTheme: propSideBarTheme,
    showMenuToggle = true,
    logo,
    showLogoForDsk = false,
  } = props;
  const dispatch = useDispatch();
  const router = useRouter();
  const { menuItems } = useMenuItems();
  const [openKeys, setOpenKeys] = useState<string[]>([]);
  const [selectedKeys, setSelectedKeys] = useState<string[]>([]);
  const {
    mobile,
    mobileDrawer,
    optionDrawer,
    sidebarTheme = propSideBarTheme,
    collapsed,
  } = useSelector((store: CoreStore) => store.coreStore);
  const { setOptionDrawer, setMobileDrawer, setCollapse } = coreActions;
  const { asPath: pathname } = router || {};
  const availableMenuItems = useMemo(() => {
    return getAvailableMenuItems(menuItems, currentUser);
  }, [currentUser, menuItems]);
  const { user, signOut, signIn } = useAuth();
  const items = availableMenuItems.map((item, index) => getMenuItemConfig(item, index));
  const rootSubMenuKeys = availableMenuItems.map((item, index) => getKey(item.name, index));

  const onOpenChange = (openKeys: string[]) => {
    const latestOpenKey = last(openKeys);
    if (latestOpenKey && rootSubMenuKeys.includes(latestOpenKey)) {
      setOpenKeys([latestOpenKey]);
    } else {
      setOpenKeys(openKeys);
    }
  };

  const handleMenuClick: MenuProps['onClick'] = e => {
    const index = availableMenuItems.findIndex(
      (route, index) => e.key === getKey(route.name, index),
    );
    const route = availableMenuItems[index];
    if (!isEmpty(route?.children)) {
      setOpenKeys([getKey(route.name, index)]);
    }

    if (mobile) {
      dispatch(setMobileDrawer());
    }
  };

  useEffect(() => {
    const { openKeys, selectedKeys } = findCurrentMenuKeys({
      pathname,
      menuItems: availableMenuItems,
      openKeys: [],
    });

    setOpenKeys(openKeys);
    setSelectedKeys(selectedKeys);
  }, [availableMenuItems, pathname]);

  const MyMenu = () => {
    return (
      <Menu
        theme={sidebarTheme}
        mode={sidebarMode}
        openKeys={openKeys}
        onOpenChange={onOpenChange}
        selectedKeys={selectedKeys}
        onClick={handleMenuClick}
        items={items}
        style={{ minHeight: 'calc(100dvh - 110px)' }}
      />
    );
  };

  return (
    <Sidebar>
      {!mobile && (
        <Sider
          width={240}
          theme={sidebarTheme}
          collapsible={showMenuToggle}
          collapsed={collapsed}
          onCollapse={() => dispatch(setCollapse())}
        >
          {logo && showLogoForDsk && (
            <Logo>
              <Link href="/">{logo}</Link>
            </Logo>
          )}
          <MyMenu />
        </Sider>
      )}

      {mobile && (
        <MobileDrawer
          className="relative"
          closable={false}
          width={240}
          placement="left"
          onClose={() => dispatch(setMobileDrawer())}
          open={mobileDrawer}
        >
          <MyMenu />

          <div className="mx-2 my-6">
            {user ? (
              <Button onClick={signOut} block className="border-zinc-800">
                Sign Out
              </Button>
            ) : (
              <Button onClick={signIn} block className="border-zinc-800">
                Sign In
              </Button>
            )}
          </div>
        </MobileDrawer>
      )}

      <Drawer
        title="Settings"
        placement="right"
        closable={true}
        width={300}
        onClose={() => dispatch(setOptionDrawer())}
        open={optionDrawer}
      >
        <PreferenceSetting />
      </Drawer>
    </Sidebar>
  );
};
