import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Currency } from "@/types/currency";
import { currencies } from "@/assets/currencyFlags";
import { ArrowRightLeft } from "lucide-react";

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
  onConvert,
}: ConverterFormProps) {
  // Function to swap currencies
  const handleSwapCurrencies = () => {
    const temp = fromCurrency;
    onFromCurrencyChange(toCurrency);
    onToCurrencyChange(temp);
  };

  return (
    <Card className="w-full max-w-md mx-auto p-6 shadow-lg animate-fade-in">
      <h2 className="text-2xl font-bold text-center mb-6 bg-gradient-to-r from-primary/80 to-primary text-transparent bg-clip-text">
        Currency Converter
      </h2>
      
      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="amount">Amount</Label>
          <Input
            id="amount"
            type="number"
            min="0"
            step="0.01"
            value={amount}
            onChange={(e) => onAmountChange(parseFloat(e.target.value) || 0)}
            className="w-full"
          />
        </div>

        <div className="grid grid-cols-[1fr,auto,1fr] items-center gap-2">
          <div className="space-y-2">
            <Label htmlFor="fromCurrency">From</Label>
            <Select
              value={fromCurrency}
              onValueChange={onFromCurrencyChange}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select currency" />
              </SelectTrigger>
              <SelectContent>
                {currencies.map((currency: Currency) => (
                  <SelectItem key={currency.code} value={currency.code}>
                    <div className="flex items-center gap-2">
                      <span>{currency.flag}</span>
                      <span>{currency.code}</span>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="mt-7">
            <Button variant="ghost" size="icon" onClick={handleSwapCurrencies}>
              <ArrowRightLeft className="h-4 w-4" />
            </Button>
          </div>

          <div className="space-y-2">
            <Label htmlFor="toCurrency">To</Label>
            <Select
              value={toCurrency}
              onValueChange={onToCurrencyChange}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select currency" />
              </SelectTrigger>
              <SelectContent>
                {currencies.map((currency: Currency) => (
                  <SelectItem key={currency.code} value={currency.code}>
                    <div className="flex items-center gap-2">
                      <span>{currency.flag}</span>
                      <span>{currency.code}</span>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        {error && (
          <div className="text-destructive text-sm mt-2">
            {error}
          </div>
        )}

        <Button 
          onClick={onConvert} 
          className="w-full mt-4" 
          disabled={isLoading || amount <= 0 || !fromCurrency || !toCurrency || fromCurrency === toCurrency}
        >
          {isLoading ? "Converting..." : "Convert"}
        </Button>
      </div>
    </Card>
  );
}