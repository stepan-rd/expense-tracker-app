import { useThemeStore } from "@/state/ThemeStore";
import React from "react";
import { motion } from "framer-motion";

type Props = {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
};

export function AddEntryButton({ children, className, onClick }: Props) {
  const { theme } = useThemeStore();

  return (
    <motion.button
      className={`flex items-center w-full p-1 rounded-lg ${className}`}
      onClick={onClick}
      style={{ backgroundColor: theme.secondaryBgColor }}
      whileHover={{
        backgroundColor: theme.hoverElementBgColor,
        transition: { duration: 0 },
      }}
      whileTap={{scale: 0.97}}
    >
      <svg
        style={{ color: theme.themeColor }}
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        className="mr-2"
        height="24"
        fill="none"
        viewBox="0 0 24 24"
      >
        <path
          fill="currentColor"
          fillRule="evenodd"
          d="M12 23c6.075 0 11-4.925 11-11S18.075 1 12 1 1 5.925 1 12s4.925 11 11 11Zm-.711-16.5a.75.75 0 1 1 1.5 0v4.789H17.5a.75.75 0 0 1 0 1.5h-4.711V17.5a.75.75 0 0 1-1.5 0V12.79H6.5a.75.75 0 1 1 0-1.5h4.789V6.5Z"
          clipRule="evenodd"
        ></path>
      </svg>
      {children}
    </motion.button>
  );
}
