if (process.env.NODE_ENV === 'development' && process.env.NEXT_PUBLIC_ENABLE_MIRAGE === 'true') {
  const { makeServer } = require('@core');
  const { mocks } = require('@app/__mocks__');

  makeServer({ environment: 'development', mocks });
}

import { MyApp } from '@app';

export default MyApp;
