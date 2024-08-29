import { create } from "zustand";

type Store = {
  isAddEntryModalVisible: boolean;
  setIsAddEntryModalVisible: (val: boolean) => void;

  isNavbarVisible: boolean;
  setIsNavbarVisible: (val: boolean | ((prev: boolean) => boolean)) => void;

  pagePaddingLeft: string;
  setPagePaddingLeft: (val: string) => void;

};
export const useGlobalStore = create<Store>((set) => ({
  isAddEntryModalVisible: false,
  setIsAddEntryModalVisible: (val) =>
    set(() => ({ isAddEntryModalVisible: val })),

  isNavbarVisible: true,
  setIsNavbarVisible: (val) =>
    set((state) => ({
      isNavbarVisible:
        typeof val === "function" ? val(state.isNavbarVisible) : val,
    })),

  pagePaddingLeft: "210px",
  setPagePaddingLeft: (val) => set(() => ({ pagePaddingLeft: val })),
 
}));
