import { useThemeStore } from "@/state/ThemeStore";
import React from "react";
import { motion } from "framer-motion";

type Props = {
  className?: string;
  children: string;
  onClick?: () => void;
  style?: React.CSSProperties;
  disabled?: boolean;
};

export function Button2({
  className,
  children,
  onClick,
  style,
  disabled,
}: Props) {
  const { theme } = useThemeStore();

  return (
    <motion.button
      disabled={disabled}
      onClick={onClick}
      className={`rounded-lg py-1 ${className} ${disabled && "cursor-not-allowed"}`}
      whileHover={{ backgroundColor: disabled ? theme.secondaryBgColor : theme.hoverElementBgColor }}
      style={{ backgroundColor: theme.mainBgColor, ...style }}
    >
      <div className="flex justify-between">
        {children}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          fill="none"
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <path
            fill="currentColor"
            d="M15.646 9.647a.5.5 0 0 1 .708.707l-4 4a.5.5 0 0 1-.708 0l-4-4a.5.5 0 1 1 .708-.707L12 13.294l3.646-3.647Z"
          ></path>
        </svg>
      </div>
    </motion.button>
  );
}
