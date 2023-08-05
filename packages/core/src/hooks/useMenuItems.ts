import { useContext } from 'react';
import { MenuItemsContext } from '../providers/MenuItemsProvider';

export const useMenuItems = () => {
  return useContext(MenuItemsContext);
};
