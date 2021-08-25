import { LogLevel as LivyLogLevel } from '@livy/contracts/lib/log-level';
import { createLogger as createLivyLogger } from '@livy/logger';
import { Handler } from './definitions';

interface Options {
  channel: string;
  handlers: Handler[];
}

export type LogLevel = LivyLogLevel;
export interface Logger {
  log(level: LogLevel, message: string, context?: any): any;
  /**
   * @inheritdoc
   */
  emergency(message: string, context?: any): any;
  /**
   * @inheritdoc
   */
  alert(message: string, context?: any): any;
  /**
   * @inheritdoc
   */
  critical(message: string, context?: any): any;
  /**
   * @inheritdoc
   */
  error(message: string, context?: any): any;
  /**
   * @inheritdoc
   */
  warning(message: string, context?: any): any;
  /**
   * @inheritdoc
   */
  notice(message: string, context?: any): any;
  /**
   * @inheritdoc
   */
  info(message: string, context?: any): any;
  /**
   * @inheritdoc
   */
  debug(message: string, context?: any): any;
}

export function createLogger({ channel, handlers }: Options) {
  const logger = createLivyLogger(channel, {
    handlers,
  });

  return logger as Logger;
}
