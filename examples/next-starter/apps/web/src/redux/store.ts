// TODO: to reduce the bundle size, we can export @onr/core/redux only
import { coreActions, CoreStore, reducers as coreReducers } from '@onr/core';
import { createStore, IModule } from 'redux-dynamic-modules-core';
import { getThunkExtension } from 'redux-dynamic-modules-thunk';

const saveToLocal = (state: CoreStore) => {
  if (typeof localStorage === 'undefined') {
    return;
  }

  localStorage.setItem(
    'settings',
    JSON.stringify({
      ...state,
      ...{
        wrapper: {
          ...state.coreStore,
          ...{
            mobile: undefined,
            optionDrawer: undefined,
            mobileDrawer: undefined,
          },
        },
      },
    }),
  );
};

export function getCoreModule(): IModule<CoreStore> {
  return {
    id: 'coreStore',
    reducerMap: {
      coreStore: coreReducers.coreStore,
    },
  };
}

const _store = createStore(
  {
    extensions: [getThunkExtension()],
  },
  getCoreModule(),
);

export const afterComponentDidMount = () => {
  // TODO: window initialize
  const mql = window.matchMedia(`(min-width: 992px)`);

  const mediaQueryChanged = () => {
    _store.dispatch(coreActions.setMobile(!mql.matches));
    return () => mql.removeListener(mediaQueryChanged);
  };

  mql.addListener(mediaQueryChanged);
  _store.dispatch(
    coreActions.setup({
      mobile: !mql.matches,
    }),
  );
};

export const getCurrentStore = _store.getState();

export const store = () => {
  // store initialize
  _store.subscribe(() => {
    // TODO: add filter
    saveToLocal(_store.getState());
  });

  return _store;
};
