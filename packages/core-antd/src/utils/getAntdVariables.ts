import { camelCase } from 'change-case';
// @ts-ignore
import lessToJs from 'less-vars-to-js';
import { Theme } from '../definitions';

export function getAntdVariables(paletteLess: string): Theme {
  const lessVariables = lessToJs(paletteLess || '', {
    resolveVariables: true,
    stripPrefix: true,
  });

  const antdVariables = objectToCamelCase(lessVariables);

  return antdVariables as Theme;
}

function objectToCamelCase(origObj: any) {
  return Object.keys(origObj).reduce(function (newObj, key) {
    const val = origObj[key];
    const newVal = typeof val === 'object' ? objectToCamelCase(val) : val;
    // @ts-ignore
    newObj[camelCase(key)] = newVal;

    return newObj;
  }, {});
}
