import { useEffect, useState } from "react";
import { Button2 } from "../Button2";
import { Dropdown } from "../Dropdown";
import dropdownExpenseOptions from "@/data/dropdownExpenseOptions.json";
import dropdownIncomeOptions from "@/data/dropdownIncomeOptions.json";
import { motion } from "framer-motion";
import { useThemeStore } from "@/state/ThemeStore";
import { useEditEntryModalStore } from "@/state/EditEntryModalStore";
import { OverlayInvisible } from "../OverlayInvisible";

type Props = {
  entryType: "Income" | "Expense" | null;
  disabled?: boolean;
};

export function EditCategorySection({ entryType, disabled }: Props) {
  const { theme } = useThemeStore();

  const { entryCategory, setEntryCategory } = useEditEntryModalStore();

  const [categoryDropdownVisible, setCategoryDropdownVisible] = useState(false);
  const [dropdownOptions, setDropdownOptions] = useState<string[]>([]);

  function handleOptionClick(option: string) {
    setEntryCategory(option);
    setCategoryDropdownVisible(false);
  }

  useEffect(() => {
    if (entryType === "Income") {
      setDropdownOptions(dropdownIncomeOptions);
    } else if (entryType === "Expense") {
      setDropdownOptions(dropdownExpenseOptions);
    }
  }, [entryType]);

  return (
    <div>
      <h1 className="px-2 text-xs font-bold">Category</h1>
      <Button2
        disabled={disabled}
        className="w-full px-2 mt-1 text-left"
        onClick={() => setCategoryDropdownVisible(true)}
        style={{ backgroundColor: theme.secondaryBgColor }}
      >
        {entryCategory || ""}
      </Button2>
      {categoryDropdownVisible && (
        <>
          <OverlayInvisible
            className="z-10"
            onClick={() => setCategoryDropdownVisible(false)}
          />
          <Dropdown className="z-10">
            {dropdownOptions.map((option, i) => (
              <motion.button
                onClick={() => handleOptionClick(option)}
                className={`px-2 py-1 text-left ${i === 0 && "rounded-t-lg"} ${i === dropdownOptions.length - 1 && "rounded-b-lg"}`}
                style={{ backgroundColor: theme.mainBgColor }}
                whileHover={{
                  backgroundColor: theme.hoverElementBgColor,
                  transition: { duration: 0 },
                }}
              >
                {option}
              </motion.button>
            ))}
          </Dropdown>
        </>
      )}
    </div>
  );
}
