import { AppConfig } from '@onr/core';
import getConfig from 'next/config';

const { publicRuntimeConfig } = getConfig() as {
  publicRuntimeConfig: Record<'processEnv' | string, unknown>;
};

export const appConfig: AppConfig = {
  apiBaseUrl: `${publicRuntimeConfig.processEnv.NEXT_PUBLIC_API_URL}/api`,

  apiKey: publicRuntimeConfig.processEnv.NEXT_PUBLIC_API_KEY || '',

  /**
   * Routes which will not show admin layout (with navbar and sidebar)
   */
  // prettier-ignore
  fullPageRoutes: [
    '/auth/signin',
    '/auth/signup',
    '/auth/forgot',
    '/lockscreen',
    '/_error',
  ],
} as const;
