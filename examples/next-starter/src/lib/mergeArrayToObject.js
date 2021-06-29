const _ = require('lodash');

function mergeArrayToObject(arr) {
  const myArray = arr || [];
  if (!Array.isArray(myArray)) {
    throw new Error('Input is not an array');
  }

  const result = myArray.reduce(function (previous, obj) {
    return {
      ...previous,
      ...obj,
    };
  }, {});

  return result;
}

module.exports = {
  mergeArrayToObject,
};
