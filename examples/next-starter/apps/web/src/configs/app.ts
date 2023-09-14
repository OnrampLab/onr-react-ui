import { AppConfig, env } from '@onr/core';

export const appConfig: AppConfig = {
  apiBaseUrl: `${env('NEXT_PUBLIC_API_URL')}/api`,

  apiKey: env('NEXT_PUBLIC_API_KEY', ''),
} as const;
