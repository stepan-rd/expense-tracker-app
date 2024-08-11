import { SupportedCurrency } from "@/types/types";

export function getCurrencyDetails(currency: SupportedCurrency) {
  // Precise conversion rates from USD to other currencies (as of August 2024)
  const conversionRates: { [key in SupportedCurrency]: number } = {
    USD: 1.0000,   // USD is the base currency, so its rate is 1
    EUR: 0.9135,   // Precise conversion rate for EUR
    PLN: 4.1412,   // Precise conversion rate for PLN
    CZK: 22.3534   // Precise conversion rate for CZK
  };

  const symbols: { [key in SupportedCurrency]: string } = {
    USD: "$",    // US Dollar symbol
    EUR: "€",    // Euro symbol
    PLN: "zł",   // Polish Zloty symbol
    CZK: "Kč"    // Czech Koruna symbol
  };

  switch (currency) {
    case "USD":
      return { symbol: symbols.USD, conversionRate: conversionRates.USD };
    case "EUR":
      return { symbol: symbols.EUR, conversionRate: conversionRates.EUR };
    case "PLN":
      return { symbol: symbols.PLN, conversionRate: conversionRates.PLN };
    case "CZK":
      return { symbol: symbols.CZK, conversionRate: conversionRates.CZK };
    default:
      throw new Error(`Unsupported currency: ${currency}`);
  }
}
