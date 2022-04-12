export const format = (value: number) => {
  //Crear formateador
  const formatter = new Intl.NumberFormat(
    "es-MX",
    // "en-US",
    {
      style: "currency",
      currency: "MXN",
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }
  );

  return formatter.format(value);
};
