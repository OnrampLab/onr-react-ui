import { makeServer } from '@onr/shared/mirage';

if (process.env.NODE_ENV === 'development' && process.env.NEXT_PUBLIC_ENABLE_MIRAGE === 'true') {
  makeServer({ environment: 'development' });
}

import { MyApp } from '@app';

export default MyApp;
