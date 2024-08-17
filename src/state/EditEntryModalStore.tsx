import { EntryType } from "@/types/types";
import { create } from "zustand";

type Store = {
  isEditingEntry: boolean;
  setIsEditingEntry: (val: boolean | ((prev: boolean) => boolean)) => void;

  editingEntryUid: string | null;
  setEditingEntryUid: (val: string | null) => void;

  currEditingEntry: EntryType | null;
  setCurrEditingEntry: (val: EntryType | null) => void;

  entryCategory: string | null;
  setEntryCategory: (val: string | null) => void;

  entryType: "Income" | "Expense" | null;
  setEntryType: (val: "Income" | "Expense" | null) => void;

  entryDate: number | null;
  setEntryDate: (val: number | null) => void;

  editingEntryDateBtnValue: string | null;
  setEditingEntryDateBtnValue: (val: string | null) => void;

  editingNameOrDescription: boolean;
  setEditingNameOrDescription: (
    val: boolean | ((prev: boolean) => boolean)
  ) => void;
};
export const useEditEntryModalStore = create<Store>((set) => ({
  isEditingEntry: false,
  setIsEditingEntry: (val) =>
    set((state) => ({
      isEditingEntry:
        typeof val === "function" ? val(state.isEditingEntry) : val,
    })),

  editingEntryUid: null,
  setEditingEntryUid: (val) => set((state) => ({ editingEntryUid: val })),

  currEditingEntry: null,
  setCurrEditingEntry: (val) => set((state) => ({ currEditingEntry: val })),

  entryCategory: null,
  setEntryCategory: (val) => set((state) => ({ entryCategory: val })),

  entryType: null,
  setEntryType: (val) => set((state) => ({ entryType: val })),

  entryDate: null,
  setEntryDate: (val) => set((state) => ({ entryDate: val })),

  editingEntryDateBtnValue: null,
  setEditingEntryDateBtnValue: (val) => set((state) => ({ editingEntryDateBtnValue: val })),

  editingNameOrDescription: false,
  setEditingNameOrDescription: (val) =>
    set((state) => ({
      editingNameOrDescription:
        typeof val === "function" ? val(state.editingNameOrDescription) : val,
    })),
}));
