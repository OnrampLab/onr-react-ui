import Adapter from '@cfaester/enzyme-adapter-react-18';

require('enzyme').configure({ adapter: new Adapter() });

//env variables
require('dotenv').config({ path: '.env.test' });

import { setConfig } from 'next/config';
setConfig({
  publicRuntimeConfig: {
    processEnv: process.env,
  },
});
