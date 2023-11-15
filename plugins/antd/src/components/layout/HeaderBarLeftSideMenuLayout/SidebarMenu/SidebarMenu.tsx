import { AuthUser, coreActions, CoreStore, MenuItem, useMenuItems } from '@onr/core';
import { Drawer, Layout, Menu, MenuProps } from 'antd';
import { ItemType } from 'antd/es/menu/hooks/useItems';
import { isEmpty, last } from 'lodash';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { PreferenceSetting } from './PreferenceSetting';

interface Props {
  sidebarTheme: 'dark' | 'light';
  sidebarMode: 'vertical' | 'inline';
  currentUser: AuthUser;
  showToggle?: boolean;
}

const { Sider } = Layout;
const rootSubMenuKeys: string[] = [];

const MobileDrawer = styled(Drawer)`
  .ant-drawer-body {
    padding: 0;
  }
`;

const getKey = (name: string, index: number, parentName?: string) => {
  const key = `${(parentName ?? '').replace(/ /g, '-')}${name.replace(/ /g, '-')}-${index}`;

  return key.toLowerCase();
};

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
  const {
    mobile,
    mobileDrawer,
    optionDrawer,
    sidebarTheme = propSideBarTheme,
    collapsed,
  } = useSelector((store: CoreStore) => store.coreStore);
  const { setOptionDrawer, setMobileDrawer, setCollapse } = coreActions;
  const { pathname } = router || {};
  const availableMenuItems = useMemo(() => {
    const roles = currentUser?.roles || [];

    return menuItems.filter((route: any) => {
      if (route.login && !currentUser) {
        return false;
      }

      if (!route.roles) {
        return true;
      }

      for (const role of route.roles) {
        if (roles.map(x => x.name).indexOf(role) !== -1) {
          return true;
        }
      }

      return false;
    });
  }, [currentUser, menuItems]);
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

  const addOpenKey = useCallback((key: string) => {
    setOpenKeys(openKeys => [...openKeys, key]);
  }, []);

  const onOpenChange = (openKeys: string[]) => {
    const latestOpenKey = last(openKeys);
    if (latestOpenKey && rootSubMenuKeys.includes(latestOpenKey)) {
      setOpenKeys([latestOpenKey]);
    } else {
      setOpenKeys(openKeys);
    }
  };

  const isSamePath = (path1: string, path2: string) => {
    return new URLSearchParams(path1).toString() === new URLSearchParams(path2).toString();
  };

  const getInitialOpenKey = useCallback(() => {
    let key = null;

    menuItems.find((menuItem: any, index: number) => {
      if (menuItem.children) {
        return menuItem.children.find((subMenuItem: any) => {
          if (!subMenuItem.children && isSamePath(subMenuItem.path, pathname)) {
            key = getKey(menuItem.name, index);
            return true;
          }
        });
      }
    });

    return key;
  }, [menuItems, pathname]);

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
    availableMenuItems.forEach((route, index) => {
      const key = getKey(route.name, index);
      rootSubMenuKeys.push(key);
    });

    const initialOpenKey = getInitialOpenKey();
    if (initialOpenKey) {
      addOpenKey(initialOpenKey);
    }
  }, [availableMenuItems, pathname, addOpenKey, getInitialOpenKey]);

  const MyMenu = () => {
    return (
      <Menu
        theme={sidebarTheme}
        mode={sidebarMode}
        openKeys={openKeys}
        onOpenChange={onOpenChange}
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
