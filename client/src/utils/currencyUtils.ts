export function getCurrencySymbol(currencyCode: string): string {
  const symbols: Record<string, string> = {
    USD: "$",
    EUR: "€",
    GBP: "£",
    JPY: "¥",
    AUD: "A$",
    CAD: "C$",
    CHF: "CHF",
    CNY: "¥",
    INR: "₹",
    MXN: "$",
    BRL: "R$",
    KRW: "₩",
    SGD: "S$",
    NZD: "NZ$",
    HKD: "HK$",
  };

  return symbols[currencyCode] || currencyCode;
}