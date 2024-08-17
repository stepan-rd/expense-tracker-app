import React, { useState } from "react";
import { Button2 } from "../Button2";
import { useThemeStore } from "@/state/ThemeStore";
import { DateSelect } from "../DateSelect/DateSelect";
import { useEditEntryModalStore } from "@/state/EditEntryModalStore";

type Props = {
  disabled?: boolean;
};

export function EditDateSection({ disabled }: Props) {
  const { theme } = useThemeStore();

  const { setEntryDate, editingEntryDateBtnValue, setEditingEntryDateBtnValue, entryDate } = useEditEntryModalStore();

  const [dateSelectVisible, setDateSelectVisible] = useState(false);

  
  function handleDateClick(
    year: number,
    monthNumber: number,
    dayNumber: number,
    monthName: string
  ) {
    const selectedDate = new Date(year, monthNumber - 1, dayNumber);
    const entryDateInMillis = selectedDate.getTime();

    const dateString = `${monthName.slice(0, 3)} ${dayNumber} ${year}`;

    setEntryDate(entryDateInMillis)
    setEditingEntryDateBtnValue(dateString)
  }

  return (
    <div>
      <h1 className="pl-2 text-xs font-bold">Date</h1>
      <Button2
        disabled={disabled}
        onClick={() => setDateSelectVisible(true)}
        className={`w-full px-2 mt-1 ${disabled && "cursor-not-allowed"}`}
        style={{ backgroundColor: theme.secondaryBgColor }}
      >
        {editingEntryDateBtnValue || ""}
      </Button2>
      {dateSelectVisible && (
        <DateSelect
          overlayOnClick={() => setDateSelectVisible(false)}
          handleDateClick={handleDateClick}
          currSelectedDate={entryDate}
        />
      )}
    </div>
  );
}
