import { AuthUser, coreActions, CoreStore, useMenuItems } from '@onr/core';
import { Divider, Drawer, Layout, Menu } from 'antd';
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
    sidebarTheme = propSideBarTheme,
    collapsed,
    sidebarIcons,
  } = useSelector((store: CoreStore) => store.coreStore);
  const { setOptionDrawer, setMobileDrawer, setCollapse } = coreActions;
  const { asPath: pathname = '' } = router || {};

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
    appRoutes.forEach((route: any, index: number) => {
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
            if (!hasChildren) {
              return (
                <Menu.Item
                  key={getKey(route.name, index)}
                  className={isSamePath(pathname, route.path) ? 'ant-menu-item-selected' : ''}
                  onClick={() => {
                    setOpenKeys([getKey(route.name, index)]);
                    if (mobile) dispatch(setMobileDrawer());
                  }}
                >
                  {route.path && (
                    <Link href={route.path}>
                      {sidebarIcons && <span className="anticon">{route.icon}</span>}
                      <span className="mr-auto">{route.name}</span>
                    </Link>
                  )}

                  {!route.path && (
                    <>
                      {sidebarIcons && <span className="anticon">{route.icon}</span>}
                      <span className="mr-auto">{route.name}</span>
                    </>
                  )}
                </Menu.Item>
              );
            }

            if (hasChildren) {
              return (
                <SubMenu
                  key={getKey(route.name, index)}
                  title={
                    <span>
                      {sidebarIcons && <span className="anticon">{route.icon}</span>}
                      <span>{route.name}</span>
                    </span>
                  }
                >
                  {route.children &&
                    route.children.map((subitem: any, index: number) => {
                      return (
                        <Menu.Item
                          key={getKey(subitem.name, index)}
                          className={
                            isSamePath(pathname, subitem.path) ? 'ant-menu-item-selected' : ''
                          }
                          onClick={() => {
                            if (mobile) dispatch(setMobileDrawer());
                          }}
                        >
                          <Link href={`${subitem.path ? subitem.path : ''}`}>
                            <span className="mr-auto">{subitem.name}</span>
                          </Link>
                        </Menu.Item>
                      );
                    })}
                </SubMenu>
              );
            }
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
        <PreferenceSetting />
      </Drawer>
    </>
  );
};
