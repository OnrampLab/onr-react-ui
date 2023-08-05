import { AuthUser, coreActions, CoreStore, useMenuItems } from '@onr/core';
import { Divider, Drawer, Layout, List, Menu, Switch } from 'antd';
import { capitalize } from 'lodash-es';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

/* eslint-disable complexity  */
interface Props {
  sidebarTheme: 'dark' | 'light';
  sidebarMode: 'vertical' | 'inline';
  currentUser: AuthUser;
}

const { SubMenu } = Menu;
const { Sider } = Layout;

const rootSubMenuKeys: string[] = [];

const getKey = (name: string, index: number) => {
  const string = `${name}-${index}`;
  const key = string.replace(' ', '-');

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
    boxed,
    darkSidebar,
    // @ts-ignore
    sidebarTheme = propSideBarTheme,
    sidebarPopup,
    collapsed,
    sidebarIcons,
    weakColor,
  } = useSelector((store: CoreStore) => store.coreStore);
  const {
    setOptionDrawer,
    setMobileDrawer,
    setBoxed,
    setSidebarTheme,
    setSidebarPopup,
    setSidebarIcons,
    setCollapse,
    setWeak,
  } = coreActions;
  const { pathname = '' } = router || {};

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

  React.useEffect(() => {
    appRoutes.forEach((route: any, index: number) => {
      const isCurrentPath = pathname.indexOf(route.name.toLowerCase()) > -1 ? true : false;
      const key = getKey(route.name, index);
      rootSubMenuKeys.push(key);
      if (isCurrentPath) setOpenKeys([...openKeys, key]);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onOpenChange = (openKeys: string[]) => {
    const latestOpenKey = openKeys.slice(-1);
    if (rootSubMenuKeys.includes(latestOpenKey[0])) {
      setOpenKeys([...latestOpenKey]);
    } else {
      setOpenKeys(latestOpenKey ? [...latestOpenKey] : []);
    }
  };

  const MyMenu = () => {
    return (
      <>
        <Menu
          theme={sidebarTheme}
          mode={sidebarMode}
          openKeys={openKeys}
          onOpenChange={onOpenChange}
        >
          {appRoutes.map((route: any, index: number) => {
            const hasChildren = route.children ? true : false;
            if (!hasChildren)
              return (
                <Menu.Item
                  key={getKey(route.name, index)}
                  className={pathname === route.path ? 'ant-menu-item-selected' : ''}
                  onClick={() => {
                    setOpenKeys([getKey(route.name, index)]);
                    if (mobile) dispatch(setMobileDrawer());
                  }}
                >
                  <Link href={route.path}>
                    {sidebarIcons && <span className="anticon">{route.icon}</span>}
                    <span className="mr-auto">{capitalize(route.name)}</span>
                  </Link>
                </Menu.Item>
              );

            if (hasChildren)
              return (
                <SubMenu
                  key={getKey(route.name, index)}
                  title={
                    <span>
                      {sidebarIcons && <span className="anticon">{route.icon}</span>}
                      <span>{capitalize(route.name)}</span>
                    </span>
                  }
                >
                  {route.children &&
                    route.children.map((subitem: any, index: number) => (
                      <Menu.Item
                        key={getKey(subitem.name, index)}
                        className={pathname === subitem.path ? 'ant-menu-item-selected' : ''}
                        onClick={() => {
                          if (mobile) dispatch(setMobileDrawer());
                        }}
                      >
                        <Link href={`${subitem.path ? subitem.path : ''}`}>
                          <span className="mr-auto">{capitalize(subitem.name)}</span>
                        </Link>
                      </Menu.Item>
                    ))}
                </SubMenu>
              );
          })}
        </Menu>

        <Divider
          className={`m-0`}
          style={{
            display: `${sidebarTheme === 'dark' ? 'none' : ''}`,
          }}
        />
      </>
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
        <List.Item
          actions={[
            <Switch key={1} size="small" checked={!!boxed} onChange={() => dispatch(setBoxed())} />,
          ]}
        >
          <span>Boxed view</span>
        </List.Item>
        <List.Item
          actions={[
            <Switch
              key={1}
              size="small"
              checked={!!darkSidebar}
              disabled={weakColor}
              onChange={() => dispatch(setSidebarTheme())}
            />,
          ]}
        >
          <span>Dark sidebar menu</span>
        </List.Item>
        <List.Item
          actions={[
            <Switch
              size="small"
              checked={!!sidebarPopup}
              disabled={collapsed}
              onChange={() => dispatch(setSidebarPopup())}
              key={1}
            />,
          ]}
        >
          <span>Popup sub menus</span>
        </List.Item>
        <List.Item
          actions={[
            <Switch
              key={1}
              size="small"
              checked={!!sidebarIcons}
              disabled={collapsed}
              onChange={() => dispatch(setSidebarIcons())}
            />,
          ]}
        >
          <span>Sidebar menu icons</span>
        </List.Item>
        <List.Item
          actions={[
            <Switch
              key={1}
              size="small"
              checked={!!collapsed}
              onChange={() => dispatch(setCollapse())}
            />,
          ]}
        >
          <span>Collapsed sidebar menu</span>
        </List.Item>
        <List.Item
          actions={[
            <Switch
              key={1}
              size="small"
              checked={!!weakColor}
              onChange={() => dispatch(setWeak())}
            />,
          ]}
        >
          <span>Weak colors</span>
        </List.Item>
      </Drawer>
    </>
  );
};
