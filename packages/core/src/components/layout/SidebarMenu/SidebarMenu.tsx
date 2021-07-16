import React, { useContext } from 'react';
import { AnyAction } from 'redux';
import { AuthUser } from '../../../types';
import { AppContext } from '../../App';

/* eslint-disable complexity  */
interface Props {
  sidebarTheme: 'dark' | 'light';
  sidebarMode: 'vertical' | 'inline';
  currentUser: AuthUser;
  logout: () => AnyAction;
}

// @ts-ignore
export const SidebarMenu = ({ currentUser, logout, sidebarMode, sidebarTheme }: Props) => {
  const app = useContext(AppContext);
  const menuItems = app?.getRoutes();
  // @ts-ignore
  const [appRoutes, setAppRoutes] = React.useState(menuItems);

  // TODO: create a simple sidebar menu component
  return (
    <>
      <div>Sidebar Menu</div>
      <div>{JSON.stringify(appRoutes)}</div>
    </>
  );
};
