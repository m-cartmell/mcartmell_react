export const prepString = (data) => {
  return data.toString().replace(/\s+/g, '-').toLowerCase().replace(/,/g, ' ');
};
