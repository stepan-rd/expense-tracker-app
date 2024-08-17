import { useThemeStore } from "@/state/ThemeStore";
import React from "react";
import { motion } from "framer-motion";

type Props = {
  onClick?: () => void;
  children: React.ReactNode;
  className?: string;
  isSelected?: boolean;
};

export function Button1({ onClick, children, className, isSelected }: Props) {
  const { theme } = useThemeStore();

  return (
    <motion.button
      whileHover={{ borderColor: theme.secondaryBorderColor }}
      whileFocus={{ borderColor: theme.secondaryBorderColor }}
      className={`px-2 font-light border rounded-lg ${className}`}
      style={{
        borderColor: isSelected ? theme.themeColor : theme.mainBorderColor,
      }}
      onClick={onClick}
    >
      {children}
    </motion.button>
  );
}
