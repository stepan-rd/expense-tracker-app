import React, { useState } from "react";
import { Button1 } from "../Button1";
import { Dropdown } from "../Dropdown";
import { Overlay } from "../Overlay";
import { OverlayInvisible } from "../OverlayInvisible";
import { useThemeStore } from "@/state/ThemeStore";
import { useAddEntryModalStore } from "@/state/AddEntryModalStore";
import { motion } from "framer-motion";

const options = ["Income", "Expense"];

type Props = {};

export function SelectTypeSection({}: Props) {
  const { theme } = useThemeStore();

  const { typeBtnValue, setTypeBtnValue } = useAddEntryModalStore();

  const [selectTypeDropdownVisible, setSelectTypeDropdownVisible] =
    useState(false);

  function handleOptionClick(option: string) {
    setTypeBtnValue(option);
    setSelectTypeDropdownVisible(false);
  }

  return (
    <div>
      <Button1
        className="mr-2"
        onClick={() => setSelectTypeDropdownVisible(true)}
      >
        {typeBtnValue}
      </Button1>
      {selectTypeDropdownVisible && (
        <>
          <OverlayInvisible
            onClick={() => setSelectTypeDropdownVisible(false)}
          />
          <Dropdown className="absolute z-10">
            {options.map((option, optionIndex) => (
              <motion.option
                style={{ backgroundColor: theme.mainBgColor }}
                whileHover={{
                  backgroundColor: theme.hoverElementBgColor,
                  transition: { duration: 0 },
                }}
                key={`${optionIndex}-${option}`}
                onClick={() => handleOptionClick(option)}
                className="px-2 hover:cursor-pointer"
              >
                {option}
              </motion.option>
            ))}
          </Dropdown>
        </>
      )}
    </div>
  );
}
