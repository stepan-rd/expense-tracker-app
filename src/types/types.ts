export type EntryType = {
  uid: string
  type: "Expense" | "Income",
  amount: number;
  dateAdded: number;
  name: string;
  description: string;
}


export type UserDataType = {
  username: string | null;
  totalExpenses: number;
  totalIncome: number;
  entries: EntryType[];
  activityLogs: [];
}

export type SupportedCurrency = "USD" | "EUR" | "PLN" | "CZK" 

export type CurrencyDetailsType = {
  symbol: string;
  conversionRate: number;
}