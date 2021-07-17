if (process.env.NODE_ENV === 'development' && process.env.NEXT_PUBLIC_ENABLE_MIRAGE === 'true') {
  const { makeServer } = require('@onr/mock');
  const { mocks } = require('@app/__mocks__');

  makeServer({ environment: 'development', mocks });
}
import { MyApp } from '@app';
import '../assets/tailwind-extension.css';

export default MyApp;
