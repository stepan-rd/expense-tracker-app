import { useThemeStore } from "@/state/ThemeStore";
import React from "react";

type Props = {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties
};
export function Dropdown({ children, className, style }: Props) {
  const { theme } = useThemeStore();

  return (
    <div
      className={`rounded-lg flex flex-col absolute shadow-md border ${className}`}
      style={{
        backgroundColor: theme.mainBgColor,
        color: theme.mainTextColor,
        borderColor: theme.mainBorderColor,
        ...style
      }}
    >
      {children}
    </div>
  );
}
