import { ActionConsts } from './ActionConsts';

import { IDispatchProps } from '../interfaces';

export const coreActions: IDispatchProps = {
  setOptionDrawer: (payload?: boolean) => ({
    type: ActionConsts.Core.SetOptionDrawer,
    payload,
  }),

  setMobile: (payload?: boolean) => ({
    type: ActionConsts.Core.SetMobile,
    payload,
  }),

  setMobileDrawer: (payload?: boolean) => ({
    type: ActionConsts.Core.SetMobileDrawer,
    payload,
  }),

  setBoxed: (payload?: boolean) => ({
    type: ActionConsts.Core.SetBoxed,
    payload,
  }),

  setSidebarTheme: (payload?: boolean) => ({
    type: ActionConsts.Core.SetSidebarTheme,
    payload,
  }),

  setSidebarPopup: (payload?: boolean) => ({
    type: ActionConsts.Core.SetSidebarPopup,
    payload,
  }),

  setSidebarIcons: (payload?: boolean) => ({
    type: ActionConsts.Core.SetSidebarIcons,
    payload,
  }),

  setCollapse: (payload?: boolean) => ({
    type: ActionConsts.Core.SetCollapse,
    payload,
  }),

  setWeak: (payload?: boolean) => ({
    type: ActionConsts.Core.SetWeak,
    payload,
  }),

  setup: (payload?: any) => ({
    type: ActionConsts.Core.Setup,
    payload,
  }),

  setPluginValue: (key: string, value: any) => ({
    type: ActionConsts.Core.SetPluginValue,
    payload: {
      key,
      value,
    },
  }),

  setAccountId: (payload?: number) => ({
    type: ActionConsts.Core.SetAccountId,
    payload,
  }),
};
