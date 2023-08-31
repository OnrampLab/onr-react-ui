import { FC, useContext, useState } from 'react';
import { AuthUser } from '../../../types';
import { AppContext } from '../../App';

/* eslint-disable complexity  */
interface Props {
  sidebarTheme: 'dark' | 'light';
  sidebarMode: 'vertical' | 'inline';
  currentUser: AuthUser;
}

export const SidebarMenu: FC<Props> = () => {
  const app = useContext(AppContext);
  const menuItems = app?.getMenuItems();
  const [appRoutes] = useState(menuItems);

  // TODO: create a simple sidebar menu component
  return (
    <>
      <div>Sidebar Menu</div>
      <div>{JSON.stringify(appRoutes)}</div>
    </>
  );
};
