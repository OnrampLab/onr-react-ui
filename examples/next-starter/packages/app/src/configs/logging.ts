import { env, LogConfig } from '@onr/core';
import { ConsoleHandler, LogglyHandler } from '@onr/logging';

export const logConfig: Readonly<LogConfig> = {
  default: env('NEXT_PUBLIC_LOG_CHANNEL', 'stack'),

  channels: {
    stack: {
      driver: 'stack',
      channels: ['console', 'loggly'],
    },
    console: {
      driver: 'monolog',
      handler: ConsoleHandler,
      level: 'debug',
    },
    loggly: {
      driver: 'monolog',
      handler: LogglyHandler,
      handlerWith: {
        token: env('NEXT_PUBLIC_LOG_LOGGLY_TOKEN'),
        tags: env('NEXT_PUBLIC_LOG_LOGGLY_TAGS', '').split(','),
      },
      level: env('NEXT_PUBLIC_LOG_LEVEL', 'info'),
    },
  },
};
