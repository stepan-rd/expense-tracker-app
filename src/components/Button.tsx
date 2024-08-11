import { useThemeStore } from "@/state/ThemeStore";
import { motion } from "framer-motion";

type Props = {
  className?: string;
  children: React.ReactNode;
  onClick?: () => void;
  disabled?: boolean;
};

export function Button({ className, children, onClick, disabled }: Props) {
  const { theme } = useThemeStore();

  return (
    <motion.button
      disabled={disabled}
      whileTap={{ scale: 0.99 }}
      whileHover={{
        boxShadow: "0 0 10px hsla(0, 0%, 0%, 0.1)",
        backgroundColor: theme.secondaryThemeColor,
        transition: { duration: 0.1 },
      }}
      className={`rounded-lg px-3 py-1 shadow-sm ${className} ${disabled && "cursor-not-allowed"}`}
      style={{
        color: theme.buttonTextColor,
        backgroundColor: theme.themeColor,
      }}
      onClick={onClick}
    >
      {children}
    </motion.button>
  );
}
