import { ReactElement } from 'react';

export interface MenuItem {
  name: string;
  path?: string;
  icon?: ReactElement;
  children?: MenuItem[];
  login: boolean;
  roles?: any[];
}
