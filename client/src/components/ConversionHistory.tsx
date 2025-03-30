import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { ConversionHistoryItem } from "@/types/currency";
import { getCurrencySymbol } from "@/utils/currencyUtils";
import { Trash2 } from "lucide-react";

interface ConversionHistoryProps {
  history: ConversionHistoryItem[];
  onClearHistory: () => void;
}

export default function ConversionHistory({ history, onClearHistory }: ConversionHistoryProps) {
  if (history.length === 0) {
    return null;
  }

  return (
    <Card className="w-full max-w-md mx-auto p-4 mt-4 shadow-lg animate-fade-in">
      <div className="flex justify-between items-center mb-4">
        <h3 className="font-semibold text-lg">Conversion History</h3>
        <Button 
          variant="ghost" 
          size="sm"
          onClick={onClearHistory}
          className="text-destructive hover:text-destructive/90 hover:bg-destructive/10"
        >
          <Trash2 className="h-4 w-4 mr-1" />
          Clear
        </Button>
      </div>

      <div className="max-h-[300px] overflow-y-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>From</TableHead>
              <TableHead>To</TableHead>
              <TableHead className="text-right">Date</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {history.map((item, index) => (
              <TableRow key={index}>
                <TableCell className="font-medium">
                  {getCurrencySymbol(item.from.code)} {item.from.amount}
                </TableCell>
                <TableCell>
                  {getCurrencySymbol(item.to.code)} {item.to.amount}
                </TableCell>
                <TableCell className="text-right text-xs text-muted-foreground">
                  {new Date(item.timestamp).toLocaleString(undefined, {
                    month: 'short',
                    day: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit'
                  })}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </Card>
  );
}