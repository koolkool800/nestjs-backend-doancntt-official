export const slugConvert = (name: string) => {
  return name.replace(/\s/g, '-').toLowerCase().split('/').join('-');
};
