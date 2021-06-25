if (process.env.NODE_ENV === 'development' && process.env.NEXT_PUBLIC_ENABLE_MIRAGE === 'true') {
  const { makeServer } = require('@onr/mock');
  const { mocks } = require('@app/__mocks__');

  makeServer({ environment: 'development', mocks });
}
import { MyApp } from '@app';
import '../assets/tailwind-extension.css';
// https://www.npmjs.com/package/next-plugin-antd-less?activeTab=readme
// Need to use require to import less
// import '../assets/styles.less';
/*! purgecss start ignore */
require('../assets/styles.less');
// import '../assets/styles.less';
/*! purgecss end ignore */

// require('../assets/styles.less');

export default MyApp;
