const { generatePalette } = require('@onr/tailwind-palette');
const { paramCase } = require('change-case');
const fs = require('fs');
const { getAntdVariables } = require('./src/lib/getAntdVariables');
const { rgbHex } = require('./src/lib/rgbHex');
const { mergeArrayToObject } = require('./src/lib/mergeArrayToObject');
const paletteLess = fs.readFileSync(__dirname + '/src/assets/antd-custom.less', 'utf8');

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

module.exports = {
  mode: 'jit',
  purge: ['./src/**/*.{js,ts,jsx,tsx}'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {},
    colors: {
      ...customColors,
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
