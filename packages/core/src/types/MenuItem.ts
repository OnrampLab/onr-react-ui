import { ItemType } from 'antd/es/menu/hooks/useItems';
import { ReactElement } from 'react';

export interface MenuItem {
  name: string;
  path?: string;
  icon?: ReactElement;
  children?: MenuItem[];
  login: boolean;
  roles?: any[];
  props?: Partial<ItemType>;
}
