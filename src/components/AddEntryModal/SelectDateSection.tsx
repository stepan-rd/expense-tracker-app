import { useState } from "react";
import { Button1 } from "../Button1";
import { DateSelect } from "../DateSelect/DateSelect";
import { useAddEntryModalStore } from "@/state/AddEntryModalStore";
import { useThemeStore } from "@/state/ThemeStore";

type Props = {};

export function SelectDateSection({}: Props) {
  const { theme } = useThemeStore();

  const { dateBtnValue, setDateBtnValue, setEntryDate, entryDate } =
    useAddEntryModalStore();

  const [isDateSelectVisible, setIsDateSelectVisible] = useState(false);

  function handleDateClick(
    year: number,
    monthNumber: number,
    dayNumber: number,
    monthName: string
  ) {
    const selectedDate = new Date(year, monthNumber - 1, dayNumber);
    const entryDateInMillis = selectedDate.getTime();

    const dateString = `${monthName.slice(0, 3)} ${dayNumber} ${year}`;

    setDateBtnValue(dateString);
    setEntryDate(entryDateInMillis);
  }

  return (
    <div className="">
      <Button1
        isSelected={dateBtnValue !== "Date"}
        className="flex items-center py-1 mr-2"
        onClick={() => setIsDateSelectVisible(true)}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          className="mr-1"
          height="16"
          style={{ color: theme.secondaryTextColor }}
          viewBox="0 0 16 16"
        >
          <path
            fill="currentColor"
            d="M12 2a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h8zm0 1H4a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1V4a1 1 0 0 0-1-1zm-1.25 7a.75.75 0 1 1 0 1.5.75.75 0 0 1 0-1.5zm.75-5a.5.5 0 1 1 0 1h-7a.5.5 0 0 1 0-1h7z"
          ></path>
        </svg>

        {dateBtnValue}
      </Button1>
      {isDateSelectVisible && (
        <DateSelect
          currSelectedDate={entryDate}
          overlayOnClick={() => setIsDateSelectVisible(false)}
          handleDateClick={handleDateClick}
        />
      )}
    </div>
  );
}
