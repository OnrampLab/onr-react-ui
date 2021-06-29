import debug from 'debug';

export function getDebugger(namespace: string) {
  return debug(namespace);
}
