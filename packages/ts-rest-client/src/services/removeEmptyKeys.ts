export function removeEmptyKeys(obj: any) {
  for (const key in obj) {
    if (obj[key] === null || obj[key] === undefined || obj[key] === '') {
      delete obj[key];
    } else if (typeof obj[key] === 'object') {
      removeEmptyKeys(obj[key]);
    }
  }

  return obj;
}
