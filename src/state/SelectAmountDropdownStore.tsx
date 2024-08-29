import { getCurrencyDetails } from "@/hooks/getCurrencyDetails";
import { CurrencyDetailsType, SupportedCurrency } from "@/types/types";
import { create } from "zustand";

type Store = {
  currencyDetails: CurrencyDetailsType;
  setCurrencyDetails: (val: CurrencyDetailsType) => void;

  currencyDropdownBtnValue: SupportedCurrency;
  setCurrencyDropdownBtnValue: (val: SupportedCurrency) => void;

  amountInputValue: string;
  setAmountInputValue: (val: string) => void;

  resetSelectAmountDropdownStoreStore: () => void;
};


export const useSelectAmountDropdownStore = create<Store>((set) => ({
  currencyDetails: getCurrencyDetails("USD"),
  setCurrencyDetails: (val) => set(() => ({ currencyDetails: val })),

  currencyDropdownBtnValue: "USD",
  setCurrencyDropdownBtnValue: (val) =>
    set(() => ({ currencyDropdownBtnValue: val })),

  amountInputValue: "",
  setAmountInputValue: (val) => set(() => ({ amountInputValue: val })),

  resetSelectAmountDropdownStoreStore: () =>
    set(() => ({
      currencyDetails: getCurrencyDetails("USD"),
      currencyDropdownBtnValue: "USD",
      amountInputValue: "",
    })),
}));
