import { create } from "zustand";

type AppThemeType = {
  mainBgColor: string; // Background color of the main UI
  secondaryBgColor: string; // Background color of secondary elements
  mainTextColor: string; // Main text color
  secondaryTextColor: string; // Color for less prominent text
  mainBorderColor: string; // Border color of main elements
  secondaryBorderColor: string; // Border color of secondary elements
  themeColor: string; // Primary color for accents, buttons, etc.
  buttonTextColor: string;
  secondaryThemeColor: string; // Secondary color for accents, hover effects, etc.
  hoverElementBgColor: string
};

type Store = {
  theme: AppThemeType;
  setTheme: (val: AppThemeType) => void;
};

export const useThemeStore = create<Store>((set) => ({
  theme: {
    mainBgColor: "#fffefc", 
    secondaryBgColor: "rgb(252, 250, 248)", 
    mainTextColor: "#333333", 
    secondaryTextColor: "#757575", 
    mainBorderColor: "#E0E0E0", 
    secondaryBorderColor: "#BDBDBD", 
    themeColor: "#ffb34d",
    secondaryThemeColor: "#ffb34d",
    buttonTextColor: "#f9f9f9",
    hoverElementBgColor: "#f5f5f5"
  },
  setTheme: (val) => set(() => ({ theme: val })),
}));
