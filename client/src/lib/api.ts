import { apiRequest } from "./queryClient";

// This function will use the server API endpoint to get exchange rates
export async function fetchExchangeRate(fromCurrency: string, toCurrency: string): Promise<number> {
  try {
    console.log(`Fetching exchange rate from ${fromCurrency} to ${toCurrency}`);
    
    const response = await apiRequest(
      "GET", 
      `/api/exchange-rate?from=${fromCurrency}&to=${toCurrency}`,
      undefined
    );
    
    // Check if the response is valid
    if (!response.ok) {
      console.error(`API request failed with status: ${response.status}`);
      const errorText = await response.text();
      console.error("Error response:", errorText);
      
      let errorData;
      try {
        errorData = JSON.parse(errorText);
      } catch (e) {
        // If it's not JSON, use the text as is
        throw new Error(`API Error (${response.status}): ${errorText}`);
      }
      
      throw new Error(errorData.message || `API Error (${response.status})`);
    }
    
    const data = await response.json();
    console.log("Exchange rate API response:", data);
    
    if (data && typeof data.rate === 'number') {
      console.log(`Got exchange rate: ${data.rate}`);
      return data.rate;
    } else {
      console.error("Invalid response format:", data);
      throw new Error("Invalid response format from exchange rate API");
    }
  } catch (error) {
    console.error("Error fetching exchange rate:", error);
    
    // Re-throw the error to be handled by the component
    if (error instanceof Error) {
      throw error;
    } else {
      throw new Error("Unknown error occurred while fetching exchange rate");
    }
  }
}
