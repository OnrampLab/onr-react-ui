import { LogLevel } from '@livy/contracts/lib/log-level';
import { HttpHandler } from './HttpHandler';

interface Options {
  token: string;
  tags: string[];
  level?: LogLevel;
}

export class LogglyHandler extends HttpHandler<false> {
  public constructor({ token, tags, level }: Options) {
    const baseUrl = 'https://logs-01.loggly.com';
    const path = `/inputs/${token}/tag/${tags.join(',')}/`;
    const url = baseUrl + path;

    const options = {
      url,
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
      },
    };

    // @ts-ignore
    const requestOptions = (data: LogRecord) => {
      return {
        level_name: data.level.toUpperCase(),
        level: (8 - data.severity) * 100,
        channel: data.channel,
        message: data.message,
        context: data.context,
        timestamp: data.datetime,
      };
    };

    // @ts-ignore
    super(options, { level, requestOptions });
  }
}
