import { useState } from "react";
import { Button1 } from "../Button1";
import { Dropdown } from "../Dropdown";
import { OverlayInvisible } from "../OverlayInvisible";
import { useAddEntryModalStore } from "@/state/AddEntryModalStore";
import { DropdownOptions } from "../DropdownOptions";

const options = ["Income", "Expense"];

type Props = {};

export function SelectTypeSection({}: Props) {

  const { typeBtnValue, setTypeBtnValue } = useAddEntryModalStore();

  const [selectTypeDropdownVisible, setSelectTypeDropdownVisible] =
    useState(false);

  function handleOptionClick(choice: string) {
    if (choice !== "Income" && choice !== "Expense") return;

    setTypeBtnValue(choice);
    setSelectTypeDropdownVisible(false);
  }

  return (
    <div>
      <Button1
        isSelected={typeBtnValue !== "Type"}
        className="py-1 mr-2"
        onClick={() => setSelectTypeDropdownVisible(true)}
      >
        {typeBtnValue}
      </Button1>
      {selectTypeDropdownVisible && (
        <>
          <OverlayInvisible
            onClick={() => setSelectTypeDropdownVisible(false)}
          />
          <Dropdown className="z-10 text-sm">
            <DropdownOptions options={options} onClick={handleOptionClick} />
          </Dropdown>
        </>
      )}
    </div>
  );
}
