import { motion } from "framer-motion";
import { useThemeStore } from "@/state/ThemeStore";

type Props = {
  options: string[];
  onClick?: (option: any) => void;
};

export function DropdownOptions({ options, onClick = () => {} }: Props) {
  const { theme } = useThemeStore();

  return options.map((choice, choiceIndex) => (
    <motion.button
      onClick={() => onClick(choice)}
      whileHover={{
        backgroundColor: theme.hoverElementBgColor,
        transition: { duration: 0 },
      }}
      style={{ backgroundColor: theme.mainBgColor }}
      key={`${choiceIndex}-${choice}`}
      className={`w-full px-2 text-left hover:cursor-pointer ${choiceIndex === 0 && "rounded-t-lg"} ${choiceIndex === options.length - 1 && "rounded-b-lg"}`}
    >
      {choice}
    </motion.button>
  ));
}
