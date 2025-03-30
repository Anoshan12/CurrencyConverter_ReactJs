import { useQuery } from "@tanstack/react-query";
import { fetchExchangeRate } from "@/lib/api";

export function useExchangeRates(fromCurrency: string, toCurrency: string) {
  return useQuery({
    queryKey: ['/api/exchange-rate', fromCurrency, toCurrency],
    queryFn: async () => {
      if (!fromCurrency || !toCurrency) {
        throw new Error("Currency codes are required");
      }
      
      if (fromCurrency === toCurrency) {
        // If same currency, return 1 (same value conversion)
        return 1;
      }
      
      return fetchExchangeRate(fromCurrency, toCurrency);
    },
    enabled: !!fromCurrency && !!toCurrency,
    refetchInterval: 60000, // Auto-update every minute
    staleTime: 55000, // Consider data stale after 55 seconds
    retry: 2, // Retry failed requests twice
    retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000), // Exponential backoff
  });
}