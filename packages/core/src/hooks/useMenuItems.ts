import { useContext } from 'react';
import { MenuItemsContext } from '../providers/MenuItemsProvider';

export const useMenuItems = () => {
  const { menuItems, addMenuItem, addSubMenuItem } = useContext(MenuItemsContext);

  return { menuItems, addMenuItem, addSubMenuItem };
};
