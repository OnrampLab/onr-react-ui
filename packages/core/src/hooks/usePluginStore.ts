import { get } from 'lodash';
import { useDispatch, useSelector } from 'react-redux';
import { CoreStore, coreActions } from '../redux';

export function usePluginStore<T>(key: string, defaultValue?: T) {
  const dispatch = useDispatch();
  const plugins = useSelector((store: CoreStore) => store.coreStore.plugins);

  const value = get(plugins, key) as T;

  const getValue = () => {
    return get(plugins, key) as T;
  };

  const setValue = (value: T) => {
    dispatch(coreActions.setPluginValue(key, value));
  };

  return {
    value: value ?? defaultValue,
    getValue,
    setValue,
  };
}
