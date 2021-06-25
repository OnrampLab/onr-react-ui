// or use the path to the file as the only parameter
// const purgecss = await new PurgeCSS().purge('./purgecss.config.js');

(async function main() {
  const { PurgeCSS } = require('purgecss');
  const purgecss = await new PurgeCSS().purge();
  console.log('done!', purgecss);
})();
