const { generatePalette } = require('@onr/tailwind-palette/lib');
const { paramCase } = require('change-case');
const fs = require('fs');
const { mergeArrayToObject } = require('./src/lib/mergeArrayToObject');
const { rgbHex } = require('./src/lib/rgbHex');
const lessToJs = require('less-vars-to-js');
const paletteLess = fs.readFileSync(__dirname + '/src/assets/antd-custom.less', 'utf8');

let colors;

if (process.env.TAILWINDCSS_ADD_ANTD_PALETTE === 'true') {
  const antdVariables = getAntdVariables(paletteLess);
  const colorCollection = Object.keys(antdVariables)
    .filter(key => key.includes('Color'))
    .map(key => {
      const colorName = paramCase(key.replace('Color', ''));
      const colorCode = antdVariables[key];
      const palette = generatePalette(colorCode.startsWith('#') ? colorCode : rgbHex(colorCode));

      return {
        [colorName]: palette.colors,
      };
    });

  const customColors = mergeArrayToObject(colorCollection);

  colors = {
    ...customColors,
  };
}

module.exports = {
  mode: process.env.ENABLE_TAILWINDCSS_JIT === 'true' ? 'jit' : null,
  purge: ['./src/**/*.{js,ts,jsx,tsx}'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors,
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
function getAntdVariables(paletteLess) {
  const lessVariables = lessToJs(paletteLess || '', {
    resolveVariables: true,
    stripPrefix: true,
  });

  const antdVariables = objectToCamelCase(lessVariables);

  return antdVariables;
}

function objectToCamelCase(origObj) {
  return Object.keys(origObj).reduce(function (newObj, key) {
    const val = origObj[key];
    const newVal = typeof val === 'object' ? objectToCamelCase(val) : val;
    // @ts-ignore
    newObj[camelCase(key)] = newVal;

    return newObj;
  }, {});
}
