export type EntryType = {
  uid: string;
  type: "Expense" | "Income";
  amount: number;
  dateAddedMs: number;
  name: string;
  description: string;
  category: string;
};

export type UserDataType = {
  username: string | null;
  entries: EntryType[];
  activityLogs: [];
  currency: { symbol: string; conversionRate: number };
};

export type SupportedCurrency = "USD" | "EUR" | "PLN" | "CZK";

export type CurrencyDetailsType = {
  symbol: string;
  conversionRate: number;
};
