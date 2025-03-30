import { useQuery } from "@tanstack/react-query";
import { fetchExchangeRate } from "@/lib/api";

export function useExchangeRates(fromCurrency: string, toCurrency: string) {
  return useQuery({
    queryKey: ['/api/exchange-rate', fromCurrency, toCurrency],
    queryFn: () => fetchExchangeRate(fromCurrency, toCurrency),
    enabled: !!fromCurrency && !!toCurrency && fromCurrency !== toCurrency,
    refetchInterval: 60000, // Auto-update every minute
    staleTime: 55000, // Consider data stale after 55 seconds
  });
}