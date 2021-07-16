// @ts-nocheck
import {
  Avatar,
  Badge,
  Divider,
  Drawer,
  Dropdown,
  Layout,
  List,
  Menu,
  Popconfirm,
  Row,
  Switch,
  Tooltip
} from 'antd';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useContext, useEffect } from 'react';
import { Book, LogOut, Triangle } from 'react-feather';
import { useDispatch, useSelector } from 'react-redux';
import { AnyAction } from 'redux';
import { coreActions, CoreStore } from '../../../redux';
import { AuthUser } from '../../../types';
import { AppContext } from '../../App';
import { DashHeader } from '../Header';
import { SidebarMenuItem } from './SidebarMenuItem';
import { Sidebar } from './styles';

/* eslint-disable complexity  */
interface Props {
  sidebarTheme: 'dark' | 'light';
  sidebarMode: 'vertical' | 'inline';
  currentUser: AuthUser;
  logout: () => AnyAction;
}

const { SubMenu } = Menu;
const { Header, Sider } = Layout;

const rootSubMenuKeys: string[] = [];

export const getSidebarItemKey = (name: string, index: number) => {
  const string = `${name}-${index}`;
  const key = string.replace(' ', '-');
  return key.charAt(0).toLowerCase() + key.slice(1);
};

const UserMenu = (
  <Menu>
    <Menu.Item>Settings</Menu.Item>
    <Menu.Item>Profile</Menu.Item>
  </Menu>
);

export const SidebarMenu = ({ currentUser, logout, sidebarMode, sidebarTheme }: Props) => {
  const dispatch = useDispatch();
  const router = useRouter();
  const app = useContext(AppContext);
  const menuItems = app.getRoutes();
  const [openKeys, setOpenKeys] = React.useState<string[]>([]);
  const [appRoutes, setAppRoutes] = React.useState(menuItems);
  const {
    name,
    mobile,
    mobileDrawer,
    optionDrawer,
    boxed,
    darkSidebar,
    sidebarMode,
    sidebarTheme,
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
    const roles = currentUser.roles || [];
    setAppRoutes(
      menuItems.filter(route => {
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentUser?.roles]);

  React.useEffect(() => {
    appRoutes.forEach((route, index) => {
      const isCurrentPath = pathname.indexOf(route.name.toLowerCase()) > -1 ? true : false;
      const key = getSidebarItemKey(route.name, index);
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

  const menu = (
    <>
      <Menu
        theme={sidebarTheme}
        className="border-0 scroll-y"
        style={{ flex: 1, height: '100%' }}
        mode={sidebarMode}
        openKeys={openKeys}
        onOpenChange={onOpenChange}
      >
        {appRoutes.map((route, index) => (
          <SidebarMenuItem
            key={getSidebarItemKey(route.name, itemIndex)}
            itemIndex={index}
            route={route}
            setOpenKeys={setOpenKeys}
          />
        ))}
      </Menu>

      <Divider
        className={`m-0`}
        style={{
          display: `${sidebarTheme === 'dark' ? 'none' : ''}`,
        }}
      />
      <div className={`py-3 px-4 bg-${sidebarTheme}`}>
        <Row type="flex" align="middle" justify="space-around">
          <Dropdown overlay={UserMenu}>
            <span>
              <Badge
                count={6}
                overflowCount={5}
                style={{
                  color: 'rgb(245, 106, 0)',
                  backgroundColor: 'rgb(253, 227, 207)',
                }}
              >
                <Avatar shape="circle" size={40} src="/static/images/avatar.jpg" />
              </Badge>
            </span>
          </Dropdown>
          {!collapsed && (
            <>
              <span className="mr-auto" />
              <a
                className={`px-3 ${sidebarTheme === 'dark' ? 'text-white' : 'text-body'}`}
                href="https://one-readme.fusepx.com"
              >
                <Tooltip title="Help">
                  <Book size={20} strokeWidth={1} />
                </Tooltip>
              </a>

              <Popconfirm
                placement="top"
                title="Are you sure you want to sign out?"
                onConfirm={() => dispatch(logout())}
                okText="Yes"
                cancelText="Cancel"
              >
                <a className={`px-3 ${sidebarTheme === 'dark' ? 'text-white' : 'text-body'}`}>
                  <LogOut size={20} strokeWidth={1} />
                </a>
              </Popconfirm>
            </>
          )}
        </Row>
      </div>
    </>
  );

  const InnerDivStyle: React.CSSProperties = {
    overflow: 'hidden',
    flex: '1 1 auto',
    flexDirection: 'column',
    display: 'flex',
    height: '100vh',
  };

  const ListItemSpanStylye: React.CSSProperties = {
    WebkitBoxFlex: 1,
    WebkitFlex: '1 0',
    msFlex: '1 0',
    flex: '1 0',
  };

  return (
    <>
      <Sidebar>
        {!mobile && (
          <Sider
            width={240}
            className={`bg-${sidebarTheme}`}
            theme={sidebarTheme}
            collapsed={collapsed}
          >
            {menu}
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
          <Sidebar>
            <div style={InnerDivStyle}>
              <DashHeader>
                <Header>
                  <Link href="/">
                    <a className="brand">
                      <Triangle size={24} strokeWidth={1} />
                      <strong
                        className="mx-1"
                        style={{
                          display: 'inline',
                        }}
                      >
                        {name}
                      </strong>
                    </a>
                  </Link>
                </Header>
              </DashHeader>
              {menu}
            </div>
          </Sidebar>
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
              <Switch
                key={1}
                size="small"
                checked={!!boxed}
                onChange={() => dispatch(setBoxed())}
              />,
            ]}
          >
            <span style={ListItemSpanStylye}>Boxed view</span>
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
            <span style={ListItemSpanStylye}>Dark sidebar menu</span>
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
            <span style={ListItemSpanStylye}>Popup sub menus</span>
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
            <span style={ListItemSpanStylye}>Sidebar menu icons</span>
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
            <span style={ListItemSpanStylye}>Collapsed sidebar menu</span>
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
            <span style={ListItemSpanStylye}>Weak colors</span>
          </List.Item>
        </Drawer>
      </Sidebar>
    </>
  );
};
