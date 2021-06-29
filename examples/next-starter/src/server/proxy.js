require('dotenv').config({ path: '.env.local' });

const devProxy = {
  '/api': {
    target: process.env.NEXT_PUBLIC_API_URL,
    changeOrigin: true,
  },
};

module.exports = devProxy;
