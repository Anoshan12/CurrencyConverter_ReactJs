export function getCurrencySymbol(currencyCode: string): string {
  const symbols: { [key: string]: string } = {
    'USD': '$',
    'EUR': '€',
    'GBP': '£',
    'JPY': '¥',
    'CAD': 'C$',
    'AUD': 'A$',
    'CHF': 'Fr',
    'CNY': '¥',
    'INR': '₹',
    'BRL': 'R$'
  };
  
  return symbols[currencyCode] || currencyCode;
}
