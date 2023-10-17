import { useState } from 'react';
import { CorePreferenceKeyEnum } from '../constants/CorePreferenceEnum';
import { usePluginStore } from './usePluginStore';

interface CorePaginationPreference {
  pageSize: number;
}

interface Params {
  defaultPaginationPreference: CorePaginationPreference;
}

export const useCorePreference = (params?: Params) => {
  const defaultPaginationPreference = params?.defaultPaginationPreference ?? {
    pageSize: 10,
  };

  const { value, setValue } = usePluginStore<CorePaginationPreference>(
    CorePreferenceKeyEnum.Pagination,
    defaultPaginationPreference,
  );

  const [paginationPreferenceState, setPaginationPreferenceState] = useState(value);

  const setPaginationPreference = (value: CorePaginationPreference) => {
    setValue(value);
    setPaginationPreferenceState(value);
  };

  return {
    paginationPreference: paginationPreferenceState,
    setPaginationPreference,
  };
};
