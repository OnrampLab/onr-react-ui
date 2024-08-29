import { get } from 'radash';
import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { CoreStore, coreActions } from '../redux';

export function usePluginStore<T>(key: string, defaultValue?: T) {
  const dispatch = useDispatch();
  const plugins = useSelector((store: CoreStore) => store.coreStore.plugins);

  const value = get(plugins, key) as T;

  const getValue = useCallback(() => {
    return get(plugins, key) as T;
  }, [key, plugins]);

  const setValue = useCallback(
    (value: T) => {
      dispatch(coreActions.setPluginValue(key, value));
    },
    [dispatch, key],
  );

  return {
    value: value ?? defaultValue,
    getValue,
    setValue,
  };
}
