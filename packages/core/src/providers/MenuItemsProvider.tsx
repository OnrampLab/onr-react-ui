import { createContext, useState } from 'react';
import { MenuItem } from '../types';

export const MenuItemsContext = createContext<any>({});

export const MenuItemsContextProvider = MenuItemsContext.Provider;

export const useInitializeMenuItems = (initialMenuItems: any) => {
  const [menuItems, setMenuItems] = useState<MenuItem[]>(initialMenuItems);

  const addMenuItem = (menuItem: MenuItem) => {
    const newMenuItems = [...menuItems, menuItem];

    setMenuItems(newMenuItems);
  };

  const addSubMenuItem = (parentMenuItemName: string, menuItem: MenuItem) => {
    const parentMenuItem = menuItems.find(menuItem => menuItem.name === parentMenuItemName);

    if (!parentMenuItem) {
      console.log(`Could not find menu item: ${parentMenuItemName}`);
      return;
    }

    const subItems = parentMenuItem.children ?? [];
    parentMenuItem.children = [...subItems, menuItem];

    const newMenuItems = [...menuItems];

    setMenuItems(newMenuItems);
  };

  return { menuItems, addMenuItem, addSubMenuItem };
};
