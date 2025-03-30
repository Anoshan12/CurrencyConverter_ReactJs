import { ArrowRight } from "lucide-react";

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
  lastUpdated
}: ConversionResultProps) {
  return (
    <div className="border-t border-gray-200 bg-gray-50 p-6 animate-slide-up">
      <div className="flex justify-between items-center mb-4">
        <div className="text-sm text-gray-500">
          <span>1 {fromCurrency} = </span>
          <span className="font-medium">{exchangeRate.toFixed(4)}</span>
          <span> {toCurrency}</span>
        </div>
        <div className="text-xs text-gray-400">
          {lastUpdated}
        </div>
      </div>
      
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-gray-500 mb-1">You're converting</p>
          <p className="text-2xl font-bold text-gray-800">
            <span>{amount.toFixed(2)}</span> 
            <span className="font-medium"> {fromCurrency}</span>
          </p>
        </div>
        
        <div className="flex items-center text-green-500">
          <ArrowRight className="h-6 w-6" />
        </div>
        
        <div>
          <p className="text-sm text-gray-500 mb-1">You'll get approximately</p>
          <p className="text-2xl font-bold text-green-500">
            <span>{convertedAmount.toFixed(2)}</span> 
            <span className="font-medium"> {toCurrency}</span>
          </p>
        </div>
      </div>
    </div>
  );
}
