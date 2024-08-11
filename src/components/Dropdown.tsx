import { useThemeStore } from "@/state/ThemeStore";
import React from "react";

type Props = {
  children: React.ReactNode;
  className?: string;
};
export function Dropdown({ children, className }: Props) {
  const { theme } = useThemeStore();

  return (
    <div
      className={`rounded-lg shadow-md border ${className}`}
      style={{ backgroundColor: theme.mainBgColor }}
    >
      {children}
    </div>
  );
}
