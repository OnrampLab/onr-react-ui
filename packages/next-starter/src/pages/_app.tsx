if (process.env.NODE_ENV === 'development' && process.env.NEXT_PUBLIC_ENABLE_MIRAGE === 'true') {
  const { makeServer } = require('@onr/shared/mirage');
  makeServer({ environment: 'development' });
}

import { MyApp } from '@app';

export default MyApp;
