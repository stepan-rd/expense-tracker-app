import { create } from "zustand";

type Store = {
  isAddEntryModalVisible: boolean;
  setIsAddEntryModalVisible: (val: boolean) => void;

  userCurrency: "USD" | "EUR" | "PLN" | "CZK";
  setUserCurrency: (val: "USD" | "EUR" | "PLN" | "CZK") => void;
};
export const useGlobalStore = create<Store>((set) => ({
  isAddEntryModalVisible: false,
  setIsAddEntryModalVisible: (val) =>
    set((state) => ({ isAddEntryModalVisible: val })),

  userCurrency: "USD",
  setUserCurrency: (val) => set((state) => ({ userCurrency: val })),
}));
