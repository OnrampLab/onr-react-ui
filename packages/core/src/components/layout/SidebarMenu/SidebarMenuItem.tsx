import { Menu } from 'antd';
import { capitalize } from 'lodash';
import { useRouter } from 'next/router';
import { Link } from 'react-feather';
import { useDispatch, useSelector } from 'react-redux';
import { getSidebarItemKey } from '.';
import { coreActions, CoreStore } from '../../../redux';

interface Props {
  itemIndex: number;
  route: any;
  setOpenKeys: (keys: string[]) => void;
}

export const SidebarMenuItem = ({ itemIndex, route, setOpenKeys }: Props) => {
  const router = useRouter();
  const { pathname = '' } = router || {};
  const dispatch = useDispatch();
  const { mobile, sidebarIcons } = useSelector((store: CoreStore) => store.coreStore);
  const { setMobileDrawer } = coreActions;

  const hasChildren = route.children ? true : false;
  if (!hasChildren) {
    return (
      <Menu.Item
        className={pathname === route.path ? 'ant-menu-item-selected' : ''}
        onClick={() => {
          setOpenKeys([getSidebarItemKey(route.name, itemIndex)]);
          if (mobile) dispatch(setMobileDrawer());
        }}
      >
        <Link href={route.path}>
          <a>
            {sidebarIcons && <span className="anticon">{route.icon}</span>}
            <span className="mr-auto">{capitalize(route.name)}</span>
          </a>
        </Link>
      </Menu.Item>
    );
  }

  return (
    <Menu.SubMenu
      title={
        <span>
          {sidebarIcons && <span className="anticon">{route.icon}</span>}
          <span>{capitalize(route.name)}</span>
        </span>
      }
    >
      {route.children &&
        route.children.map((subitem: any) => (
          <Menu.Item
            key={getSidebarItemKey(subitem.name, itemIndex)}
            className={pathname === subitem.path ? 'ant-menu-item-selected' : ''}
            onClick={() => {
              if (mobile) dispatch(setMobileDrawer());
            }}
          >
            <Link href={`${subitem.path ? subitem.path : ''}`}>
              <a>
                <span className="mr-auto">{capitalize(subitem.name)}</span>
              </a>
            </Link>
          </Menu.Item>
        ))}
    </Menu.SubMenu>
  );
};
