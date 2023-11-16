export const getMenuItemKey = (name: string, index: number, parentName?: string) => {
  const key = `${parentName ?? 'root'}_${name}_${index}`;

  return key.toLowerCase();
};
