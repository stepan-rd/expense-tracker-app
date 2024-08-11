import { useThemeStore } from "@/state/ThemeStore";
import { motion } from "framer-motion";

type Props = {
  className?: string;
  children: React.ReactNode;
  onClick?: () => void;
  disabled?: boolean;
};

export function SecondaryButton({
  className,
  children,
  onClick,
  disabled,
}: Props) {
  const { theme } = useThemeStore();

  return (
    <motion.button
      disabled={disabled}
      whileTap={{ scale: 0.99 }}
      whileHover={{
        backgroundColor: theme.hoverElementBgColor,
        transition: { duration: 0.1 },
      }}
      className={`rounded-lg px-3 py-1 shadow-sm ${className} ${disabled && "cursor-not-allowed"}`}
      style={{
        color: theme.mainTextColor,
        backgroundColor: theme.secondaryBgColor,
      }}
      onClick={onClick}
    >
      {children}
    </motion.button>
  );
}
