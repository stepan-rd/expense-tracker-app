import { useThemeStore } from "@/state/ThemeStore";
import React from "react";

type Props = {
  onClick?: () => void;
  children: React.ReactNode;
  className?: string;
};

export function Button1({ onClick, children, className }: Props) {
  const { theme } = useThemeStore();

  return (
    <button
      className={`px-2 font-light border rounded-lg ${className}`}
      style={{ borderColor: theme.mainBorderColor }}
      onClick={onClick}
    >
      {children}
    </button>
  );
}
