import { CoreStore, coreActions } from '@onr/core';
import { List, Switch } from 'antd';
import { FC } from 'react';
import { useDispatch, useSelector } from 'react-redux';

const { setBoxed, setSidebarTheme, setSidebarPopup, setSidebarIcons, setCollapse, setWeak } =
  coreActions;

export const PreferenceSetting: FC = () => {
  const dispatch = useDispatch();

  const { boxed, darkSidebar, sidebarPopup, collapsed, sidebarIcons, weakColor } = useSelector(
    (store: CoreStore) => store.coreStore,
  );

  return (
    <>
      <List.Item
        actions={[
          <Switch key={1} size="small" checked={!!boxed} onChange={() => dispatch(setBoxed())} />,
        ]}
      >
        <span>Boxed view</span>
      </List.Item>
      <List.Item
        actions={[
          <Switch
            key={1}
            size="small"
            checked={!!darkSidebar}
            disabled={weakColor}
            onChange={() => dispatch(setSidebarTheme())}
          />,
        ]}
      >
        <span>Dark sidebar menu</span>
      </List.Item>
      <List.Item
        actions={[
          <Switch
            size="small"
            checked={!!sidebarPopup}
            disabled={collapsed}
            onChange={() => dispatch(setSidebarPopup())}
            key={1}
          />,
        ]}
      >
        <span>Popup sub menus</span>
      </List.Item>
      <List.Item
        actions={[
          <Switch
            key={1}
            size="small"
            checked={!!sidebarIcons}
            disabled={collapsed}
            onChange={() => dispatch(setSidebarIcons())}
          />,
        ]}
      >
        <span>Sidebar menu icons</span>
      </List.Item>
      <List.Item
        actions={[
          <Switch
            key={1}
            size="small"
            checked={!!collapsed}
            onChange={() => dispatch(setCollapse())}
          />,
        ]}
      >
        <span>Collapsed sidebar menu</span>
      </List.Item>
      <List.Item
        actions={[
          <Switch
            key={1}
            size="small"
            checked={!!weakColor}
            onChange={() => dispatch(setWeak())}
          />,
        ]}
      >
        <span>Weak colors</span>
      </List.Item>
    </>
  );
};
