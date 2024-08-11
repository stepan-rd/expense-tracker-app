import { create } from "zustand";

type Store = {
  dateBtnValue: string;
  setDateBtnValue: (val: any) => void;

  entryDate: number | null;
  setEntryDate: (val: number | null) => void;

  amountBtnValue: string;
  setAmountBtnValue: (val: string) => void;

  entryAmountUSD: number | null;
  setEntryAmountUSD: (val: number) => void;

  typeBtnValue: "Income" | "Expense" | "Type";
  setTypeBtnValue: (val: "Income" | "Expense" | "Type") => void;

  resetAddEntryModalStore: () => void;
};
export const useAddEntryModalStore = create<Store>((set) => ({
  dateBtnValue: "Date",
  setDateBtnValue: (val) => set((state) => ({ dateBtnValue: val })),

  entryDate: null,
  setEntryDate: (val) => set((state) => ({ entryDate: val })),

  amountBtnValue: "Amount",
  setAmountBtnValue: (val) => set((state) => ({ amountBtnValue: val })),

  entryAmountUSD: null,
  setEntryAmountUSD: (val) => set((state) => ({ entryAmountUSD: val })),

  typeBtnValue: "Type",
  setTypeBtnValue: (val) => set((state) => ({ typeBtnValue: val })),

  resetAddEntryModalStore: () =>
    set((state) => ({
      dateBtnValue: "Date",
      entryDate: null,
      amountBtnValue: "Amount",
      entryAmountUSD: null,
      typeBtnValue: "Type",
    })),
}));
