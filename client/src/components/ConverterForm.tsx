import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Loader2 } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { getCurrencySymbol } from "@/utils/currencyUtils";
import { currencies } from "@/assets/currencyFlags";

interface ConverterFormProps {
  fromCurrency: string;
  toCurrency: string;
  amount: number;
  isLoading: boolean;
  error: string | null;
  onFromCurrencyChange: (currency: string) => void;
  onToCurrencyChange: (currency: string) => void;
  onAmountChange: (amount: number) => void;
  onConvert: () => void;
}

export default function ConverterForm({
  fromCurrency,
  toCurrency,
  amount,
  isLoading,
  error,
  onFromCurrencyChange,
  onToCurrencyChange,
  onAmountChange,
  onConvert
}: ConverterFormProps) {
  const [currencySymbol, setCurrencySymbol] = useState("$");
  
  useEffect(() => {
    setCurrencySymbol(getCurrencySymbol(fromCurrency));
  }, [fromCurrency]);
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onConvert();
  };
  
  return (
    <form className="p-6" onSubmit={handleSubmit}>
      {/* Currency Selection Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        {/* From Currency Dropdown */}
        <div>
          <Label htmlFor="from-currency" className="block text-sm font-medium text-gray-600 mb-2">
            From Currency
          </Label>
          <Select value={fromCurrency} onValueChange={onFromCurrencyChange}>
            <SelectTrigger id="from-currency" className="w-full pl-10 pr-10 py-3 text-base border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary bg-white rounded-lg">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <div className="w-6 h-4 bg-cover bg-center" style={{ 
                  backgroundImage: `url(${currencies.find(c => c.code === fromCurrency)?.flag})` 
                }} />
              </div>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {currencies.map((currency) => (
                <SelectItem key={currency.code} value={currency.code} className="flex items-center">
                  <div className="flex items-center">
                    <div 
                      className="w-6 h-4 mr-2 bg-cover bg-center"
                      style={{ backgroundImage: `url(${currency.flag})` }}
                    />
                    {currency.code} - {currency.name}
                  </div>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        
        {/* To Currency Dropdown */}
        <div>
          <Label htmlFor="to-currency" className="block text-sm font-medium text-gray-600 mb-2">
            To Currency
          </Label>
          <Select value={toCurrency} onValueChange={onToCurrencyChange}>
            <SelectTrigger id="to-currency" className="w-full pl-10 pr-10 py-3 text-base border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary bg-white rounded-lg">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <div className="w-6 h-4 bg-cover bg-center" style={{ 
                  backgroundImage: `url(${currencies.find(c => c.code === toCurrency)?.flag})` 
                }} />
              </div>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {currencies.map((currency) => (
                <SelectItem key={currency.code} value={currency.code} className="flex items-center">
                  <div className="flex items-center">
                    <div 
                      className="w-6 h-4 mr-2 bg-cover bg-center"
                      style={{ backgroundImage: `url(${currency.flag})` }}
                    />
                    {currency.code} - {currency.name}
                  </div>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
      
      {/* Amount Input */}
      <div className="mb-6">
        <Label htmlFor="amount" className="block text-sm font-medium text-gray-600 mb-2">
          Amount
        </Label>
        <div className="relative mt-1 rounded-md shadow-sm">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <span id="currency-symbol" className="text-gray-500 sm:text-sm">{currencySymbol}</span>
          </div>
          <Input 
            type="number"
            id="amount"
            className="block w-full pl-8 pr-12 py-3 text-base border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary rounded-lg"
            placeholder="0.00"
            min="0.01"
            step="0.01"
            value={amount}
            onChange={(e) => onAmountChange(parseFloat(e.target.value) || 0)}
          />
          <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
            <span className="text-gray-500 sm:text-sm" id="amount-currency">{fromCurrency}</span>
          </div>
        </div>
      </div>
      
      {/* Error Message Area */}
      {error && (
        <div className="mb-4 animate-fade-in">
          <Alert variant="destructive">
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        </div>
      )}
      
      {/* Convert Button */}
      <Button 
        type="submit" 
        className="w-full bg-primary hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary text-white font-bold py-3 px-6 rounded-lg transition duration-200 ease-in-out transform hover:-translate-y-1 active:translate-y-0"
        disabled={isLoading}
      >
        {isLoading ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Converting...
          </>
        ) : (
          "Convert"
        )}
      </Button>
    </form>
  );
}
