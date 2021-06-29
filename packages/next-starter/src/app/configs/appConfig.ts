import getConfig from 'next/config';
const { publicRuntimeConfig } = getConfig() as {
  publicRuntimeConfig: Record<'processEnv' | string, unknown>;
};

export const appConfig = {
  apiBaseUrl: `${publicRuntimeConfig.processEnv.NEXT_PUBLIC_API_URL}/api`,
  apiKey: publicRuntimeConfig.processEnv.NEXT_PUBLIC_API_KEY || '',
};
