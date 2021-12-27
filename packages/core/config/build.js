import fs from 'fs-extra';
import path from 'path';

const MODULE_ENTRIES = {
  API: 'api',
};

// Building submodule entries

const BUILD_TARGETS = {
  [`${MODULE_ENTRIES.API}.js`]: "module.exports = require('./lib/api');\n",
};

Object.entries(BUILD_TARGETS).forEach(([target, content]) => {
  fs.writeFile(path.join(process.cwd(), target), content, err => {
    if (err) throw err;
    console.log(`[build] created "${target}" in root folder`);
  });
});

// Building types

const TYPES_TARGETS = [`${MODULE_ENTRIES.API}`];

TYPES_TARGETS.forEach(target => {
  fs.copy(path.resolve('types', target), path.join(process.cwd(), target), err => {
    if (err) throw err;
    console.log(`[build-types] copying "${target}" to root folder`);
  });
});
