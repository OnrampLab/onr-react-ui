//#region Global Imports
import { AnyAction, Action as ReduxAction } from 'redux';
//#endregion Global Imports

export interface IAction<T> extends ReduxAction {
  payload?: T;
}

export interface IStateProps {
  version: number;
  name: string;
  mobile: boolean;
  boxed: boolean;
  darkSidebar: boolean;
  sidebarPopup: boolean;
  sidebarIcons: boolean;
  sidebarTheme: 'dark' | 'light';
  collapsed: boolean;
  weakColor: boolean;
  optionDrawer: boolean;
  mobileDrawer: boolean;
  fullscreen: boolean;
  accountId?: number;
}

export interface IDispatchProps {
  setOptionDrawer(payload?: boolean): AnyAction;
  setMobile(payload?: boolean): AnyAction;
  setMobileDrawer(payload?: boolean): AnyAction;
  setBoxed(payload?: boolean): AnyAction;
  setSidebarTheme(payload?: boolean): AnyAction;
  setSidebarPopup(payload?: boolean): AnyAction;
  setSidebarIcons(payload?: boolean): AnyAction;
  setCollapse(payload?: boolean): AnyAction;
  setWeak(payload?: boolean): AnyAction;
  setup(payload?: any): AnyAction;
  setAccountId(payload?: number): AnyAction;
}
