export const enumToOptions = (e: any) => {
  return Object.entries(e).map(([label, value]) => ({
    label,
    value,
  }));
};
