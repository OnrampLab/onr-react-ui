import { BrowserConsoleHandler } from '@livy/browser-console-handler';

export class ConsoleHandler extends BrowserConsoleHandler {
  constructor({ useNativeDebug = false, timestamps = false, ...options }) {
    super({
      useNativeDebug,
      timestamps,
      console,
      ...options,
    });
  }
}
