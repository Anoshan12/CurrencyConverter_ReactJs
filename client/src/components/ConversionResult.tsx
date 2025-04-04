import { Card } from "@/components/ui/card";
import { getCurrencySymbol } from "@/utils/currencyUtils";
import { currencies } from "@/assets/currencyFlags";

interface ConversionResultProps {
  fromCurrency: string;
  toCurrency: string;
  amount: number;
  convertedAmount: number;
  exchangeRate: number;
  lastUpdated: string;
}

export default function ConversionResult({
  fromCurrency,
  toCurrency,
  amount,
  convertedAmount,
  exchangeRate,
  lastUpdated,
}: ConversionResultProps) {
  // Find currency data for flags
  const fromCurrencyData = currencies.find(c => c.code === fromCurrency);
  const toCurrencyData = currencies.find(c => c.code === toCurrency);
  
  // Format the date
  const formattedDate = new Date(lastUpdated).toLocaleString();
  
  return (
    <Card className="w-full max-w-md mx-auto p-6 mt-4 shadow-lg animate-fade-in animate-slide-up bg-secondary/5">
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            <span className="text-slate-300">{fromCurrencyData?.flag}</span>
            <span className="text-xl font-medium text-secondary">{fromCurrency}</span>
          </div>
          <div className="text-xl text-secondary">→</div>
          <div className="flex items-center gap-2">
            <span className="text-slate-300">{toCurrencyData?.flag}</span>
            <span className="text-xl font-medium text-secondary">{toCurrency}</span>
          </div>
        </div>
        
        <div className="grid grid-cols-2 gap-4 py-4 border-y">
          <div className="text-center">
            <p className="text-slate-300 text-muted-foreground">You Send</p>
            <p className="text-xl font-bold text-secondary">
              {getCurrencySymbol(fromCurrency)} {amount.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </p>
          </div>
          <div className="text-center">
            <p className="text-slate-300 text-muted-foreground">You Get</p>
            <p className="text-xl font-bold text-secondary">
              {getCurrencySymbol(toCurrency)} {convertedAmount.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </p>
          </div>
        </div>
        
        <div className="text-medium text-muted-foreground text-secondary">
          <p className="flex justify-between">
            <span>Exchange Rate:</span>
            <span className="font-medium">
              {fromCurrency === toCurrency ? (
                // For same currency, show 1:1 rate
                `1 ${fromCurrency} = ${getCurrencySymbol(toCurrency)} 1.0000`
              ) : (
                `1 ${fromCurrency} = ${getCurrencySymbol(toCurrency)} ${exchangeRate.toLocaleString(undefined, { minimumFractionDigits: 4, maximumFractionDigits: 4 })}`
              )}
            </span>
          </p>
          <p className="flex justify-between mt-1">
            <span>Last Updated:</span>
            <span>{formattedDate}</span>
          </p>
        </div>
      </div>
    </Card>
  );
}