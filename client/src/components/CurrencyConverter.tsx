import { useState, useEffect } from "react";
import ConverterForm from "./ConverterForm";
import ConversionResult from "./ConversionResult";
import ConversionHistory from "./ConversionHistory";
import { useExchangeRates } from "@/hooks/useExchangeRates";
import { ConversionHistoryItem } from "@/types/currency";
import { useToast } from "@/hooks/use-toast";

export default function CurrencyConverter() {
  const { toast } = useToast();
  
  // State for the form
  const [fromCurrency, setFromCurrency] = useState("USD");
  const [toCurrency, setToCurrency] = useState("EUR");
  const [amount, setAmount] = useState(1);
  
  // State for conversion results
  const [showResult, setShowResult] = useState(false);
  const [convertedAmount, setConvertedAmount] = useState(0);
  const [history, setHistory] = useState<ConversionHistoryItem[]>([]);
  
  // Get exchange rates using the custom hook
  const { 
    data: exchangeRate, 
    isLoading, 
    isError, 
    error,
    refetch
  } = useExchangeRates(fromCurrency, toCurrency);
  
  // Load history from local storage on initial render
  useEffect(() => {
    const savedHistory = localStorage.getItem("conversionHistory");
    if (savedHistory) {
      try {
        setHistory(JSON.parse(savedHistory));
      } catch (e) {
        console.error("Failed to parse conversion history", e);
      }
    }
  }, []);
  
  // Save history to local storage whenever it changes
  useEffect(() => {
    localStorage.setItem("conversionHistory", JSON.stringify(history));
  }, [history]);
  
  // Handle the conversion
  const handleConvert = async () => {
    if (!fromCurrency || !toCurrency || amount <= 0) {
      toast({
        title: "Invalid input",
        description: "Please select currencies and enter a valid amount",
        variant: "destructive"
      });
      return;
    }
    
    if (fromCurrency === toCurrency) {
      // If same currency, just show the same amount
      setConvertedAmount(amount);
      setShowResult(true);
      
      // Add to history for same currency conversions
      const newHistoryItem: ConversionHistoryItem = {
        from: {
          code: fromCurrency,
          amount: amount.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })
        },
        to: {
          code: toCurrency,
          amount: amount.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })
        },
        timestamp: Date.now()
      };
      
      setHistory(prevHistory => [newHistoryItem, ...prevHistory].slice(0, 10));
      return;
    }
    
    try {
      console.log("Converting with current exchange rate:", exchangeRate);
      
      // If we already have the exchange rate, use it, otherwise refetch
      const rate = exchangeRate || await refetch().then(result => {
        console.log("Refetch result:", result);
        if (result.error) {
          console.error("Refetch error:", result.error);
          throw result.error;
        }
        return result.data;
      });
      
      if (rate === undefined || rate === null) {
        console.error("No rate available after refetch");
        toast({
          title: "Error",
          description: "Failed to fetch exchange rate",
          variant: "destructive"
        });
        return;
      }
      
      // Calculate the converted amount
      const converted = amount * rate;
      setConvertedAmount(converted);
      setShowResult(true);
      
      // Add to history
      const newHistoryItem: ConversionHistoryItem = {
        from: {
          code: fromCurrency,
          amount: amount.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })
        },
        to: {
          code: toCurrency,
          amount: converted.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })
        },
        timestamp: Date.now()
      };
      
      setHistory(prevHistory => [newHistoryItem, ...prevHistory].slice(0, 10)); // Keep only the last 10 conversions
    } catch (err) {
      toast({
        title: "Error",
        description: "An error occurred during conversion",
        variant: "destructive"
      });
      console.error("Conversion error:", err);
    }
  };
  
  // Clear the conversion history
  const handleClearHistory = () => {
    setHistory([]);
    toast({
      title: "History cleared",
      description: "Your conversion history has been cleared"
    });
  };
  
  return (
    <div className="flex flex-col space-y-2 w-full max-w-md">
      <ConverterForm
        fromCurrency={fromCurrency}
        toCurrency={toCurrency}
        amount={amount}
        isLoading={isLoading}
        error={isError ? (error as Error).message : null}
        onFromCurrencyChange={setFromCurrency}
        onToCurrencyChange={setToCurrency}
        onAmountChange={setAmount}
        onConvert={handleConvert}
      />
      
      {showResult && (
        <ConversionResult
          fromCurrency={fromCurrency}
          toCurrency={toCurrency}
          amount={amount}
          convertedAmount={convertedAmount}
          exchangeRate={fromCurrency === toCurrency ? 1 : (exchangeRate || 1)}
          lastUpdated={new Date().toISOString()}
        />
      )}
      
      <ConversionHistory
        history={history}
        onClearHistory={handleClearHistory}
      />
    </div>
  );
}