import { useEditEntryModalStore } from "@/state/EditEntryModalStore";
import { useThemeStore } from "@/state/ThemeStore";
import React, { useEffect, useState } from "react";
import { Button2 } from "../Button2";
import { Dropdown } from "../Dropdown";
import { OverlayInvisible } from "../OverlayInvisible";
import { motion } from "framer-motion";

const dropdownOptions: ("Income" | "Expense")[] = ["Income", "Expense"];

type Props = {
  className?: string;
  disabled?: boolean;
};

export function EditTypeSection({ className, disabled }: Props) {
  const { theme } = useThemeStore();

  const { entryType, setEntryType } = useEditEntryModalStore();

  const [typeDropdownVisible, setTypeDropdownVisible] = useState(false);

  function handleOptionClick(option: "Income" | "Expense") {
    setEntryType(option);
    setTypeDropdownVisible(false);
  }

  return (
    <div>
      <h1 className="px-2 text-xs font-bold">Type</h1>
      <Button2
        disabled={disabled}
        className="w-full px-2 mt-1 text-left"
        onClick={() => setTypeDropdownVisible(true)}
        style={{ backgroundColor: theme.secondaryBgColor }}
      >
        {entryType || ""}
      </Button2>
      {typeDropdownVisible && (
        <>
          <OverlayInvisible
            className="z-10"
            onClick={() => setTypeDropdownVisible(false)}
          />
          <Dropdown className="z-10 w-3/4">
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
