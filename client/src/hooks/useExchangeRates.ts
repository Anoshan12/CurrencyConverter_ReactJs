import { useState } from "react";
import { fetchExchangeRate } from "@/lib/api";

export function useExchangeRates() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const getExchangeRate = async (fromCurrency: string, toCurrency: string): Promise<number> => {
    setIsLoading(true);
    setError(null);
    
    try {
      const rate = await fetchExchangeRate(fromCurrency, toCurrency);
      return rate;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Failed to fetch exchange rate";
      setError(errorMessage);
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  return {
    getExchangeRate,
    isLoading,
    error
  };
}
