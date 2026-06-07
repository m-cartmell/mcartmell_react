export const prepString = (data?: string | string[]): string | undefined => {
  if (!data) return;

  return data.toString().replace(/\s+/g, '-').toLowerCase().replace(/,/g, ' ');
};
