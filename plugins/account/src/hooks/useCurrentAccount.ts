import { usePluginStore } from '@onr/core';
import { PreferenceKeyEnum } from '../constants';

export const useCurrentAccount = () => {
  const { value: accountId, setValue: setCurrentAccountId } = usePluginStore<number>(
    PreferenceKeyEnum.CurrentId,
  );

  return {
    accountId,
    setCurrentAccountId,
  };
};
