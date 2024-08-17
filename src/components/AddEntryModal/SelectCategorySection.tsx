import React, { useEffect, useState } from "react";
import { Button1 } from "../Button1";
import { useAddEntryModalStore } from "@/state/AddEntryModalStore";
import { Dropdown } from "../Dropdown";
import { DropdownOptions } from "../DropdownOptions";
import { OverlayInvisible } from "../OverlayInvisible";
import dropdownExpenseOptions from "@/data/dropdownExpenseOptions.json"
import dropdownIncomeOptions from "@/data/dropdownIncomeOptions.json"


type Props = {};

export function SelectCategorySection({}: Props) {
  const { categoryBtnValue, setCategoryBtnValue, typeBtnValue } =
    useAddEntryModalStore();

  const [isCategoryDropdownVisible, setIsCategoryDropdownVisible] =
    useState(false);

  function handleChoiceClick(choice: string) {
    setCategoryBtnValue(choice);
    setIsCategoryDropdownVisible(false)
  }

  useEffect(() => {
    setCategoryBtnValue("Category")
  }, [typeBtnValue])

  return (
    <div className="mr-2">
      <Button1
        isSelected={categoryBtnValue !== "Category"}
        className="flex items-center py-1"
        onClick={() => setIsCategoryDropdownVisible(true)}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          className="mr-1"
          fill="none"
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <path
            fill="currentColor"
            fill-rule="evenodd"
            d="m3.914 11.086 6.5-6.5A2 2 0 0 1 11.828 4H18a2 2 0 0 1 2 2v6.172a2 2 0 0 1-.586 1.414l-6.5 6.5a2 2 0 0 1-2.828 0l-6.172-6.171a2 2 0 0 1 0-2.829Zm.707.707a1 1 0 0 0 0 1.415l6.172 6.171a1 1 0 0 0 1.414 0l6.5-6.5a1 1 0 0 0 .293-.707V6a1 1 0 0 0-1-1h-6.172a1 1 0 0 0-.707.293l-6.5 6.5Zm10.129-1.292a1.25 1.25 0 1 0 0-2.5 1.25 1.25 0 0 0 0 2.5Z"
            clip-rule="evenodd"
          ></path>
        </svg>
        {categoryBtnValue}
      </Button1>
      {isCategoryDropdownVisible && (
        <>
          <OverlayInvisible
            onClick={() => setIsCategoryDropdownVisible(false)}
          />
          <Dropdown className="absolute z-10">
            {typeBtnValue === "Expense" ? (
              <DropdownOptions
                options={dropdownExpenseOptions}
                onClick={handleChoiceClick}
              />
            ) : (
              <DropdownOptions
                options={dropdownIncomeOptions}
                onClick={handleChoiceClick}
              />
            )}
          </Dropdown>
        </>
      )}
    </div>
  );
}
