import { AuthUser, coreActions, CoreStore, MenuItem, useMenuItems } from '@onr/core';
import { Drawer, Layout, Menu, MenuProps } from 'antd';
import { ItemType } from 'antd/es/menu/hooks/useItems';
import { isEmpty, last } from 'lodash';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { getAvailableMenuItems } from '../../../../utils';
import { PreferenceSetting } from './PreferenceSetting';

interface Props {
  sidebarTheme: 'dark' | 'light';
  sidebarMode: 'vertical' | 'inline';
  currentUser: AuthUser;
  showToggle?: boolean;
}

const { Sider } = Layout;

const MobileDrawer = styled(Drawer)`
  .ant-drawer-body {
    padding: 0;
  }
`;

export const SidebarMenu = ({
  currentUser,
  sidebarMode,
  sidebarTheme: propSideBarTheme,
  showToggle = true,
}: Props) => {
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

  const getKey = (name: string, index: number, parentName?: string) => {
    const key = `${parentName ?? 'root'}_${name}_${index}`;

    return key.toLowerCase();
  };

  const getMenuItemFromRoute = (
    route: MenuItem,
    index: number,
    parentRoute?: MenuItem,
  ): ItemType => ({
    label: route.path ? <Link href={route.path}>{route.name}</Link> : route.name,
    key: getKey(route.name, index, parentRoute?.name),
    icon: route.icon ?? null,
    ...route.props,
    children: route.children?.map((child, index) => getMenuItemFromRoute(child, index, route)),
  });
  const items = availableMenuItems.map((route, index) => getMenuItemFromRoute(route, index));
  const rootSubMenuKeys = availableMenuItems.map((route, index) => getKey(route.name, index));

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

  const findCurrentKeys = useCallback(
    (
      menuItems: MenuItem[],
      openKeys: string[],
      parentMenu?: MenuItem,
    ): {
      openKeys: string[];
      selectedKeys: string[];
    } => {
      // first layer search
      for (var i = 0; i < menuItems.length; i++) {
        if (menuItems[i].path === pathname) {
          const key = getKey(menuItems[i].name, i, parentMenu?.name);
          openKeys.push(key);

          return {
            selectedKeys: [key],
            openKeys,
          };
        }
      }

      // nested layer search
      for (var i = 0; i < menuItems.length; i++) {
        const subMenuItems = menuItems[i].children;
        if (subMenuItems) {
          const key = getKey(menuItems[i].name, i, parentMenu?.name);
          openKeys.push(key);
          return findCurrentKeys(subMenuItems, openKeys, menuItems[i]);
        }
      }

      return {
        selectedKeys: [],
        openKeys: [],
      };
    },
    [pathname],
  );

  useEffect(() => {
    const { openKeys, selectedKeys } = findCurrentKeys(availableMenuItems, []);

    setOpenKeys(openKeys);
    setSelectedKeys(selectedKeys);
  }, [availableMenuItems, pathname, findCurrentKeys]);

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
      />
    );
  };

  return (
    <>
      {!mobile && (
        <Sider
          width={240}
          theme={sidebarTheme}
          collapsible={showToggle}
          collapsed={collapsed}
          onCollapse={() => dispatch(setCollapse())}
        >
          <MyMenu />
        </Sider>
      )}

      <MobileDrawer
        closable={false}
        width={240}
        placement="left"
        onClose={() => dispatch(setMobileDrawer())}
        open={mobileDrawer}
      >
        <MyMenu />
      </MobileDrawer>

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
    </>
  );
};
