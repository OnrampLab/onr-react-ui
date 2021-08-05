import { reducers } from './reducers';

export function getAccountModule() {
  return {
    // Unique id of the module
    id: 'accountStore',
    // Maps the Store key to the reducer
    reducerMap: {
      ...reducers,
    },
    // Optional: Any actions to dispatch when the module is loaded
    initialActions: [],
    // Optional: Any actions to dispatch when the module is unloaded
    finalActions: [],
  };
}
