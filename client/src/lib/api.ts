import { apiRequest } from "./queryClient";

// This function will use the server API endpoint to get exchange rates
export async function fetchExchangeRate(fromCurrency: string, toCurrency: string): Promise<number> {
  try {
    const response = await apiRequest(
      "GET", 
      `/api/exchange-rate?from=${fromCurrency}&to=${toCurrency}`,
      undefined
    );
    
    const data = await response.json();
    
    if (!data.rate) {
      throw new Error("Invalid response from exchange rate API");
    }
    
    return data.rate;
  } catch (error) {
    console.error("Error fetching exchange rate:", error);
    throw error;
  }
}
