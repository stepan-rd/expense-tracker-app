import { create } from "zustand";

type Store = {
  currDisplayingTimePeriod: "today" | "week" | "moth" | "year" | "total";
  setCurrDisplayingTimePeriod: (
    val: "today" | "week" | "moth" | "year" | "total"
  ) => void;
};
export const useDashboardPageStore = create<Store>((set) => ({
  currDisplayingTimePeriod: "total",
  setCurrDisplayingTimePeriod: (val) =>
    set((state) => ({ currDisplayingTimePeriod: val })),
}));
