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
    
    try {
      // Using the ExchangeRate-API for real-time rates
      // Free API key from environment variables
      const apiKey = process.env.API_KEY || process.env.EXCHANGE_RATE_API_KEY || "open_access_key";
      
      // Use the free ExchangeRate-API endpoint
      const response = await axios.get(
        `https://v6.exchangerate-api.com/v6/${apiKey}/pair/${from}/${to}`
      );
      
      if (response.data.result === "success") {
        return res.json({ 
          rate: response.data.conversion_rate,
          timestamp: new Date().toISOString()
        });
      } else {
        return res.status(500).json({ 
          message: "Failed to get exchange rate from external API" 
        });
      }
    } catch (error) {
      console.error("Error fetching exchange rate:", error);
      
      // Fallback to a free alternative API if the primary one fails
      try {
        const fallbackResponse = await axios.get(
          `https://api.exchangerate.host/convert?from=${from}&to=${to}`
        );
        
        if (fallbackResponse.data.success) {
          return res.json({ 
            rate: fallbackResponse.data.result,
            timestamp: new Date().toISOString()
          });
        } else {
          return res.status(500).json({ 
            message: "Failed to get exchange rate from fallback API" 
          });
        }
      } catch (fallbackError) {
        return res.status(500).json({ 
          message: "Could not retrieve exchange rate data. Please try again later."
        });
      }
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
