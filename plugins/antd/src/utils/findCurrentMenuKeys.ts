import { MenuItem } from '@onr/core';
import { getMenuItemKey } from './getMenuItemKey';

interface Props {
  pathname: string;
  menuItems: MenuItem[];
  openKeys: string[];
  parentMenu?: MenuItem;
}

export const findCurrentMenuKeys = (
  props: Props,
): {
  openKeys: string[];
  selectedKeys: string[];
} => {
  const { pathname, menuItems, openKeys, parentMenu } = props;

  for (const indexString in menuItems) {
    const i = parseInt(indexString);
    const key = getMenuItemKey(menuItems[i].name, i, parentMenu?.name);

    if (menuItems[i].path === pathname) {
      return {
        selectedKeys: [key],
        openKeys: [...openKeys, key],
      };
    }

    const subMenuItems = menuItems[i].children;
    const result = findCurrentMenuKeys({
      pathname,
      openKeys: [...openKeys, key],
      menuItems: subMenuItems ?? [],
      parentMenu: menuItems[i],
    });

    if (result.selectedKeys.length > 0) {
      return result;
    }
  }

  return {
    selectedKeys: [],
    openKeys: [],
  };
};
