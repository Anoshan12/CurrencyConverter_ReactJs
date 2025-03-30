import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import axios from "axios";

export async function registerRoutes(app: Express): Promise<Server> {
  // API route for getting exchange rate
  app.get("/api/exchange-rate", async (req, res) => {
    const { from, to } = req.query;
    
    if (!from || !to) {
      return res.status(400).json({ 
        message: "Missing required parameters: 'from' and 'to' currencies are required" 
      });
    }
    
    // Log environment variables for debugging (excluding the actual key value)
    console.log("Environment variables check:");
    console.log("- EXCHANGE_RATE_API_KEY exists:", !!process.env.EXCHANGE_RATE_API_KEY);
    console.log("- API_KEY exists:", !!process.env.API_KEY);
    
    try {
      // Get API key from environment variables
      const apiKey = process.env.EXCHANGE_RATE_API_KEY || process.env.API_KEY;
      
      if (!apiKey) {
        console.error("No API key found in environment variables");
        throw new Error("API key not configured");
      }
      
      // Construct the URL for the ExchangeRate-API request
      const url = `https://v6.exchangerate-api.com/v6/${apiKey}/pair/${from}/${to}`;
      console.log("Requesting exchange rate from:", url.replace(apiKey, "API_KEY_HIDDEN"));
      
      // Make the API request
      const response = await axios.get(url);
      
      // Log response for debugging
      console.log("API Response status:", response.status);
      console.log("API Response data type:", typeof response.data);
      
      if (response.data && response.data.result === "success") {
        console.log("Successful conversion rate:", response.data.conversion_rate);
        return res.json({ 
          rate: response.data.conversion_rate,
          timestamp: new Date().toISOString()
        });
      } else {
        console.error("API returned unsuccessfully:", response.data);
        return res.status(500).json({ 
          message: "Failed to get exchange rate from external API",
          details: response.data
        });
      }
    } catch (error) {
      console.error("Error fetching exchange rate:", error);
      
      // Fallback to a free alternative API if the primary one fails
      try {
        console.log("Attempting fallback API...");
        // Using a more reliable fallback API
        const fallbackUrl = `https://open.er-api.com/v6/latest/${from}`;
        console.log("Requesting from fallback:", fallbackUrl);
        
        const fallbackResponse = await axios.get(fallbackUrl);
        
        if (fallbackResponse.data && fallbackResponse.data.rates) {
          // Get the rate for the target currency
          const rates = fallbackResponse.data.rates;
          console.log("Fallback API rates:", rates);
          
          if (rates[to as string]) {
            const rate = rates[to as string];
            console.log("Fallback successful, rate:", rate);
            return res.json({ 
              rate: rate,
              timestamp: new Date().toISOString()
            });
          } else {
            console.error("Target currency not found in fallback API rates");
            return res.status(500).json({ 
              message: "Target currency not available in fallback API",
              details: { availableCurrencies: Object.keys(rates) }
            });
          }
        } else {
          console.error("Fallback API unsuccessful:", fallbackResponse.data);
          return res.status(500).json({ 
            message: "Failed to get exchange rate from fallback API",
            details: fallbackResponse.data
          });
        }
      } catch (fallbackError) {
        console.error("Fallback API error:", fallbackError);
        return res.status(500).json({ 
          message: "Could not retrieve exchange rate data. Please try again later."
        });
      }
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
