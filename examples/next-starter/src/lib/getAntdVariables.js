const lessToJs = require('less-vars-to-js');
const { camelCase } = require('change-case');

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
    newObj[camelCase(key)] = newVal;
    return newObj;
  }, {});
}

module.exports = {
  getAntdVariables,
};
