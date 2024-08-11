import { useThemeStore } from "@/state/ThemeStore";
import { motion } from "framer-motion";

type Props = {
  onClick: () => void;
  text: string;
  className?: string;
};

export function GoogleCardSignIn({ onClick, text, className }: Props) {
  const { theme } = useThemeStore();

  return (
    <motion.div
      whileHover={{
        borderColor: theme.secondaryBorderColor,
        transition: { duration: 0.1 },
      }}
      whileTap={{ scale: 0.99 }}
      className={`justify-center flex items-center px-2 py-1 border rounded-lg hover:cursor-pointer ${className}`}
      style={{ borderColor: theme.mainBorderColor }}
      onClick={onClick}
    >
      <img
        className="w-5 mr-2"
        src="https://lh3.googleusercontent.com/COxitqgJr1sJnIDe8-jiKhxDx1FrYbtRHKJ9z_hELisAlapwE9LUPh6fcXIfb5vwpbMl4xl9H9TRFPc5NOO8Sb3VSgIBrfRYvW6cUA"
      ></img>
      <h1>{text}</h1>
    </motion.div>
  );
}
