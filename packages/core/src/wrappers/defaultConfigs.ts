import { DefaultAuthUser } from '../entities';
import { DefaultConfigs } from '../types';

export const defaultConfigs: DefaultConfigs = {
  appConfig: {
    apiBaseUrl: '',
    apiKey: '',
  },
  authConfig: {
    model: DefaultAuthUser,
    roles: {
      SystemAdmin: 'system-admin',
      AccountAdmin: 'account-admin',
      AccountAnalyst: 'account-analyst',
    },
  },
  themeConfig: {
    primaryColor: '#1677ff',
    infoColor: '#1677ff',
    successColor: '#52c41a',
    errorColor: '#ff4d4f',
    warningColor: '#faad14',
  },
};
