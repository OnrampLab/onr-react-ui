import { ActionConsts } from '../actions/ActionConsts';

import { IAction, IStateProps, CoreStore } from '@onr/core';

const INITIAL_STATE: IStateProps = {
  version: 1,
  name: 'Next Starter',
  mobile: false,
  boxed: false,
  darkSidebar: false,
  sidebarPopup: false,
  sidebarIcons: false,
  collapsed: false,
  weakColor: false,
  optionDrawer: false,
  mobileDrawer: false,
  fullscreen: false,
};

/* eslint-disable complexity */
export const coreReducer = (state = INITIAL_STATE, action: IAction<any>) => {
  let coreStore = {};

  switch (action.type) {
    case ActionConsts.Core.SetOptionDrawer:
      return {
        ...state,
        optionDrawer: typeof action.payload === 'boolean' ? action.payload : !state.optionDrawer,
      };

    case ActionConsts.Core.SetMobile:
      return {
        ...state,
        mobile: typeof action.payload === 'boolean' ? action.payload : !state.mobile,
      };

    case ActionConsts.Core.SetMobileDrawer:
      return {
        ...state,
        mobileDrawer: typeof action.payload === 'boolean' ? action.payload : !state.mobileDrawer,
      };

    case ActionConsts.Core.SetBoxed:
      return {
        ...state,
        boxed: typeof action.payload === 'boolean' ? action.payload : !state.boxed,
      };

    case ActionConsts.Core.SetSidebarTheme:
      return {
        ...state,
        darkSidebar: typeof action.payload === 'boolean' ? action.payload : !state.darkSidebar,
      };

    case ActionConsts.Core.SetSidebarPopup:
      return {
        ...state,
        sidebarPopup: typeof action.payload === 'boolean' ? action.payload : !state.sidebarPopup,
      };

    case ActionConsts.Core.SetSidebarIcons:
      return {
        ...state,
        sidebarIcons: typeof action.payload === 'boolean' ? action.payload : !state.sidebarIcons,
      };

    case ActionConsts.Core.SetCollapse:
      const collapse = state.collapsed;
      let sidebarIcons = state.sidebarIcons;
      if (!collapse) sidebarIcons = true;
      return {
        ...state,
        collapsed: typeof action.payload === 'boolean' ? action.payload : !state.collapsed,
        sidebarIcons,
      };

    case ActionConsts.Core.SetWeak:
      const weak = state.weakColor;
      let darkSidebar = state.darkSidebar;
      if (!weak && darkSidebar) darkSidebar = false;
      return {
        ...state,
        weakColor: typeof action.payload === 'boolean' ? action.payload : !state.weakColor,
        darkSidebar,
      };

    case ActionConsts.Core.Setup:
      if (typeof localStorage !== 'undefined') {
        const settings: CoreStore = JSON.parse(localStorage.getItem('settings') || '{}');
        coreStore = settings.coreStore || {};
      }
      return { ...state, ...coreStore, ...action.payload };

    case ActionConsts.Core.SetAccountId:
      return {
        ...state,
        accountId: action.payload,
      };

    default:
      if (typeof localStorage !== 'undefined') {
        const settings: CoreStore = JSON.parse(localStorage.getItem('settings') || '{}');
        coreStore = settings.coreStore || {};
      }
      return { ...state, ...coreStore };
  }
};
/* eslint-enable complexity */
