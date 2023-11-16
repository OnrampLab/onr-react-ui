import { MenuItem } from '@onr/core';
import { ItemType } from 'antd/es/menu/hooks/useItems';
import Link from 'next/link';
import { getMenuItemKey } from './getMenuItemKey';

export const getMenuItemConfig = (
  item: MenuItem,
  index: number,
  parentItem?: MenuItem,
): ItemType => ({
  label: item.path ? <Link href={item.path}>{item.name}</Link> : item.name,
  key: getMenuItemKey(item.name, index, parentItem?.name),
  icon: item.icon ?? null,
  ...item.props,
  children: item.children?.map((child, index) => getMenuItemConfig(child, index, item)),
});
