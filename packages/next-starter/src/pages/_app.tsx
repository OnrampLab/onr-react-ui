if (process.env.NODE_ENV === 'development' && process.env.NEXT_PUBLIC_ENABLE_MIRAGE === 'true') {
  const { makeServer } = require('@onr/shared/mirage');
  const { seeds, models, routes } = require('@app/__mocks__');
  makeServer({ environment: 'development', seeds, models, routes });
}

import { MyApp } from '@app';

export default MyApp;
