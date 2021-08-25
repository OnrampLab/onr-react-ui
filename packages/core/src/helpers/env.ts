import getConfig from 'next/config';

const { publicRuntimeConfig } = (getConfig() || {}) as {
  publicRuntimeConfig: Record<'processEnv' | string, Record<string, string>>;
};

export const env = (variableName: string, defaultValue?: string): string => {
  return publicRuntimeConfig.processEnv[variableName] ?? defaultValue;
};
