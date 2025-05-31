export const PRODUCTION_YEARS = Array.from(
  { length: new Date().getFullYear() - 1899 },
  (_, i) => {
    const year = new Date().getFullYear() - i;
    return { label: year.toString(), value: year.toString() };
  }
);
