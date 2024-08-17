import { create } from "zustand";

export type DisplayingTimePeriod =
  | "Today"
  | "This Week"
  | "This Month"
  | "This Year"
  | "All Time";

type Store = {
  currDisplayingTimePeriod: DisplayingTimePeriod;
  setCurrDisplayingTimePeriod: (val: DisplayingTimePeriod) => void;


};
export const useDashboardPageStore = create<Store>((set) => ({
  currDisplayingTimePeriod: "All Time",
  setCurrDisplayingTimePeriod: (val) =>
    set((state) => ({ currDisplayingTimePeriod: val })),


}));
