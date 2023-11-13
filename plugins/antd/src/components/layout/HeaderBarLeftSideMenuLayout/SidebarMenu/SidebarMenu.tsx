import { AuthUser, coreActions, CoreStore, MenuItem, useMenuItems } from '@onr/core';
import { Drawer, Layout, Menu, MenuProps } from 'antd';
import { ItemType } from 'antd/es/menu/hooks/useItems';
import { isEmpty } from 'lodash';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { PreferenceSetting } from './PreferenceSetting';

/* eslint-disable complexity  */
interface Props {
  sidebarTheme: 'dark' | 'light';
  sidebarMode: 'vertical' | 'inline';
  currentUser: AuthUser;
}

const { Sider } = Layout;

const rootSubMenuKeys: string[] = [];

const getKey = (name: string, index: number) => {
  const key = `${name.replace(/ /g, '-')}-${index}`;

  return key.charAt(0).toLowerCase() + key.slice(1);
};

export const SidebarMenu = ({
  currentUser,
  sidebarMode,
  sidebarTheme: propSideBarTheme,
}: Props) => {
  const dispatch = useDispatch();
  const router = useRouter();
  const { menuItems } = useMenuItems();
  const [openKeys, setOpenKeys] = React.useState<string[]>([]);
  const [appRoutes, setAppRoutes] = React.useState(menuItems);
  const {
    mobile,
    mobileDrawer,
    optionDrawer,
    sidebarTheme = propSideBarTheme,
    collapsed,
  } = useSelector((store: CoreStore) => store.coreStore);
  const { setOptionDrawer, setMobileDrawer, setCollapse } = coreActions;
  const { asPath: pathname = '' } = router || {};
  const getMenuItemFromRoute = (route: MenuItem, index: number): ItemType => ({
    label: route.path ? <Link href={route.path}>{route.name}</Link> : route.name,
    key: getKey(route.name, index),
    icon: route.icon ?? null,
    ...route.props,
    children: route.children?.map((route, index) => getMenuItemFromRoute(route, index)),
  });
  const items = appRoutes.map((route, index) => getMenuItemFromRoute(route, index));

  useEffect(() => {
    const roles = currentUser?.roles || [];
    setAppRoutes(
      menuItems.filter((route: any) => {
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
      }),
    );
  }, [currentUser, menuItems]);

  const addOpenKey = (key: string) => {
    setOpenKeys([...openKeys, key]);
  };

  const addOpenKeyRef = useRef(addOpenKey);

  useEffect(() => {
    appRoutes.forEach((route, index) => {
      const key = getKey(route.name, index);
      rootSubMenuKeys.push(key);
    });

    const initialOpenKey = getInitialOpenKeyRef.current();
    if (initialOpenKey) {
      addOpenKeyRef.current(initialOpenKey);
    }
  }, [appRoutes, pathname]);

  const onOpenChange = (openKeys: string[]) => {
    const latestOpenKey = openKeys.slice(-1);
    if (rootSubMenuKeys.includes(latestOpenKey[0])) {
      setOpenKeys([...latestOpenKey]);
    } else {
      setOpenKeys(latestOpenKey ? [...latestOpenKey] : []);
    }
  };

  const isSamePath = (path1: string, path2: string) => {
    return new URLSearchParams(path1).toString() === new URLSearchParams(path2).toString();
  };

  const getInitialOpenKey = () => {
    let key = null;

    menuItems.find((menuItem: any, index: number) => {
      if (menuItem.children) {
        return menuItem.children.find((subMenuItem: any) => {
          if (subMenuItem.children) {
            console.warn('Not exist in our case. We only support 2 layers');
          } else {
            if (isSamePath(subMenuItem.path, pathname)) {
              key = getKey(menuItem.name, index);

              return true;
            }
          }
        });
      }
    });

    return key;
  };
  const getInitialOpenKeyRef = useRef(getInitialOpenKey);

  const handleMenuClick: MenuProps['onClick'] = e => {
    const index = appRoutes.findIndex((route, index) => e.key === getKey(route.name, index));
    const route = appRoutes[index];
    if (!isEmpty(route?.children)) {
      setOpenKeys([getKey(route.name, index)]);
    }

    if (mobile) {
      dispatch(setMobileDrawer());
    }
  };

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
          collapsible
          collapsed={collapsed}
          onCollapse={() => dispatch(setCollapse())}
        >
          <MyMenu />
        </Sider>
      )}

      <Drawer
        closable={false}
        width={240}
        placement="left"
        onClose={() => dispatch(setMobileDrawer())}
        visible={mobileDrawer}
        className="chat-drawer"
      >
        <MyMenu />
      </Drawer>

      <Drawer
        title="Settings"
        placement="right"
        closable={true}
        width={300}
        onClose={() => dispatch(setOptionDrawer())}
        visible={optionDrawer}
      >
        <PreferenceSetting />
      </Drawer>
    </>
  );
};
