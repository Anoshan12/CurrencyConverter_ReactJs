export interface Currency {
  code: string;
  name: string;
  flag: string;
}

export interface ConversionHistoryItem {
  from: {
    code: string;
    amount: string;
  };
  to: {
    code: string;
    amount: string;
  };
  timestamp: number;
}