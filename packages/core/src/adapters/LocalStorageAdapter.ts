export class LocalStorageAdapter<T> {
  set(key: string, value: T) {
    if (typeof localStorage === 'undefined') {
      return;
    }
    localStorage.setItem(key, JSON.stringify(value));
  }

  get(key: string): T | null {
    if (typeof localStorage === 'undefined') {
      return null;
    }

    const json = localStorage.getItem(key) as string;

    try {
      const object = JSON.parse(json);

      return json ? (object as T) : null;
    } catch (error) {
      return json as T;
    }
  }

  remove(key: string) {
    localStorage.removeItem(key);
  }
}
