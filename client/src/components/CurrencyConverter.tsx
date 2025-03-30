import { useToast } from "@/hooks/use-toast";
import ConverterForm from "./ConverterForm";
import ConversionResult from "./ConversionResult";
import ConversionHistory from "./ConversionHistory";
import { useState, useEffect } from "react";
import { useExchangeRates } from "@/hooks/useExchangeRates";
import { ConversionHistoryItem } from "@/types/currency";

export default function CurrencyConverter() {
  const { toast } = useToast();
  const [fromCurrency, setFromCurrency] = useState("USD");
  const [toCurrency, setToCurrency] = useState("EUR");
  const [amount, setAmount] = useState(100);
  const [convertedAmount, setConvertedAmount] = useState<number | null>(null);
  const [exchangeRate, setExchangeRate] = useState<number | null>(null);
  const [lastUpdated, setLastUpdated] = useState<string | null>(null);
  const [history, setHistory] = useState<ConversionHistoryItem[]>([]);
  const [isConverting, setIsConverting] = useState(false);
  
  const { getExchangeRate, isLoading, error } = useExchangeRates();
  
  // Load history from localStorage on component mount
  useEffect(() => {
    const savedHistory = localStorage.getItem('conversionHistory');
    if (savedHistory) {
      try {
        const parsedHistory = JSON.parse(savedHistory);
        setHistory(parsedHistory);
      } catch (e) {
        console.error("Failed to parse conversion history", e);
      }
    }
  }, []);
  
  const handleConvert = async () => {
    if (amount <= 0) {
      toast({
        title: "Invalid amount",
        description: "Please enter a positive number",
        variant: "destructive"
      });
      return;
    }
    
    setIsConverting(true);
    
    try {
      const rate = await getExchangeRate(fromCurrency, toCurrency);
      const result = amount * rate;
      
      setExchangeRate(rate);
      setConvertedAmount(result);
      
      const now = new Date();
      const formattedDate = now.toLocaleDateString('en-US', { 
        day: '2-digit', 
        month: 'short', 
        year: 'numeric' 
      });
      
      const formattedTime = now.toLocaleTimeString('en-US', { 
        hour: '2-digit', 
        minute: '2-digit',
        hour12: false 
      });
      
      setLastUpdated(`Last updated: ${formattedDate}, ${formattedTime} UTC`);
      
      // Add to history
      const newHistoryItem: ConversionHistoryItem = {
        from: { code: fromCurrency, amount: amount.toFixed(2) },
        to: { code: toCurrency, amount: result.toFixed(2) },
        timestamp: now.getTime()
      };
      
      const updatedHistory = [newHistoryItem, ...history];
      if (updatedHistory.length > 10) {
        updatedHistory.pop(); // Keep only last 10 items
      }
      
      setHistory(updatedHistory);
      localStorage.setItem('conversionHistory', JSON.stringify(updatedHistory));
      
    } catch (err) {
      toast({
        title: "Conversion failed",
        description: error || "There was an error connecting to the currency service. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsConverting(false);
    }
  };
  
  const clearHistory = () => {
    setHistory([]);
    localStorage.removeItem('conversionHistory');
    
    toast({
      title: "History cleared",
      description: "Your conversion history has been cleared"
    });
  };
  
  return (
    <div className="w-full max-w-md mx-auto">
      {/* Title Section */}
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">Currency Converter</h1>
        <p className="text-gray-500">Get real-time exchange rates</p>
      </div>
      
      {/* Main Converter Card */}
      <div className="bg-white rounded-xl shadow-lg overflow-hidden animate-fade-in">
        <ConverterForm 
          fromCurrency={fromCurrency}
          toCurrency={toCurrency}
          amount={amount}
          isLoading={isConverting}
          error={error}
          onFromCurrencyChange={setFromCurrency}
          onToCurrencyChange={setToCurrency}
          onAmountChange={setAmount}
          onConvert={handleConvert}
        />
        
        {convertedAmount !== null && (
          <ConversionResult
            fromCurrency={fromCurrency}
            toCurrency={toCurrency}
            amount={amount}
            convertedAmount={convertedAmount}
            exchangeRate={exchangeRate || 0}
            lastUpdated={lastUpdated || ''}
          />
        )}
        
        <ConversionHistory 
          history={history}
          onClearHistory={clearHistory}
        />
      </div>
      
      {/* Footer Info */}
      <div className="mt-6 text-center text-xs text-gray-500">
        <p>Powered by <span className="font-medium">ExchangeRate-API</span></p>
        <p className="mt-1">© {new Date().getFullYear()} Currency Converter. All rights reserved.</p>
      </div>
    </div>
  );
}
