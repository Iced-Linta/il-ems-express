export const currencyFilter = (currency: string): String => {
    return `${parseInt(currency).toLocaleString(undefined, { 
        style: 'decimal', 
        maximumFractionDigits: 2,
        minimumFractionDigits: 2
      })}`;
}