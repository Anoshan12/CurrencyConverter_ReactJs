import { Button } from "@/components/ui/button";
import { ConversionHistoryItem } from "@/types/currency";

interface ConversionHistoryProps {
  history: ConversionHistoryItem[];
  onClearHistory: () => void;
}

export default function ConversionHistory({ history, onClearHistory }: ConversionHistoryProps) {
  return (
    <div className="border-t border-gray-200 p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-medium text-gray-800">Conversion History</h3>
        <Button 
          variant="ghost" 
          className="text-sm text-gray-500 hover:text-gray-700"
          onClick={onClearHistory}
        >
          Clear history
        </Button>
      </div>
      
      {history.length > 0 ? (
        <div className="space-y-3">
          {history.map((item, index) => (
            <div key={index} className="p-3 bg-white rounded-lg border border-gray-200 shadow-sm animate-fade-in">
              <div className="flex justify-between">
                <div>
                  <span className="font-medium">{item.from.amount} {item.from.code}</span>
                  <span className="text-gray-400 mx-2">→</span>
                  <span className="font-medium text-green-500">{item.to.amount} {item.to.code}</span>
                </div>
                <div className="text-xs text-gray-400">
                  {new Date(item.timestamp).toLocaleDateString('en-US', { 
                    day: '2-digit', 
                    month: 'short'
                  })}, {new Date(item.timestamp).toLocaleTimeString('en-US', { 
                    hour: '2-digit', 
                    minute: '2-digit',
                    hour12: false
                  })}
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-6">
          <p className="text-gray-500">Your conversion history will appear here</p>
        </div>
      )}
    </div>
  );
}
