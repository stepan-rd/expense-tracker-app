import { useThemeStore } from "@/state/ThemeStore";
import { motion } from "framer-motion";

type Props = {
  className?: string;
  children: React.ReactNode;
  onClick?: () => void;
  disabled?: boolean;
  style?: React.CSSProperties;
  hoverColor?: string;
};

export function Button({ className, children, onClick, disabled, style, hoverColor}: Props) {
  const { theme } = useThemeStore();

  return (
    <motion.button
      disabled={disabled}
      whileTap={{ scale: 0.99 }}
      whileHover={!disabled ? {
        boxShadow: "0 0 10px hsla(0, 0%, 0%, 0.1)",
        backgroundColor: hoverColor ? hoverColor : theme.secondaryThemeColor,
        transition: { duration: 0 },
      }: {}}
      className={`rounded-lg px-3 py-1 shadow-sm ${className} ${disabled && "cursor-not-allowed"}`}
      style={{
        color: theme.buttonTextColor,
        backgroundColor: disabled ? theme.disabledBgColor : theme.themeColor,
        ...style
      }}
      onClick={onClick}
    >
      {children}
    </motion.button>
  );
}
