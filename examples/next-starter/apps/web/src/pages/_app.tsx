if (process.env.NODE_ENV === 'development' && process.env.NEXT_PUBLIC_ENABLE_MIRAGE === 'true') {
  const { makeServer } = require('@onr/mock');
  const { mocks } = require('../__mocks__');

  makeServer({ environment: 'development', mocks });
}
import '../assets/styles.css';
import { MyApp } from '../components';

export default MyApp;
