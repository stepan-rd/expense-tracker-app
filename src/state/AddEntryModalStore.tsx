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

  categoryBtnValue: string;
  setCategoryBtnValue: (val: string) => void;

  resetAddEntryModalStore: () => void;
};
export const useAddEntryModalStore = create<Store>((set) => ({
  dateBtnValue: "Date",
  setDateBtnValue: (val) => set(() => ({ dateBtnValue: val })),

  entryDate: null,
  setEntryDate: (val) => set(() => ({ entryDate: val })),

  amountBtnValue: "Amount",
  setAmountBtnValue: (val) => set(() => ({ amountBtnValue: val })),

  entryAmountUSD: null,
  setEntryAmountUSD: (val) => set(() => ({ entryAmountUSD: val })),

  typeBtnValue: "Type",
  setTypeBtnValue: (val) => set(() => ({ typeBtnValue: val })),

  categoryBtnValue: "Category",
  setCategoryBtnValue: (val) => set(() => ({ categoryBtnValue: val })),

  resetAddEntryModalStore: () =>
    set(() => ({
      dateBtnValue: "Date",
      entryDate: null,
      amountBtnValue: "Amount",
      entryAmountUSD: null,
      typeBtnValue: "Type",
      categoryBtnValue: "Category"
    })),
}));
