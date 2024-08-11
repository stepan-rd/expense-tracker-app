import { useAddEntryModalStore } from "@/state/AddEntryModalStore";
import { useThemeStore } from "@/state/ThemeStore";
import React, { useEffect } from "react";

const CURR_YEAR = new Date().getFullYear();
const CURR_DAY = new Date().getDate();
const CURR_MONTH = new Date().getMonth() + 1;

type Props = {
  numDays: number;
  monthName: string;
  year: number;
  monthNumber: number;
};

export function Month({ numDays, monthName, year, monthNumber }: Props) {
  const { theme } = useThemeStore();

  const { setDateBtnValue, setEntryDate, entryDate } = useAddEntryModalStore();

  function handleDateClick(dayNumber: number) {
    const selectedDate = new Date(year, monthNumber - 1, dayNumber);
    const entryDateInMillis = selectedDate.getTime();

    const dateString = `${monthName.slice(0, 3)} ${dayNumber} ${year}`;

    setDateBtnValue(dateString);
    setEntryDate(entryDateInMillis);
  }

  return (
    <div className="p-2">
      <h1 className="my-2">
        {monthName} {year}
      </h1>

      <hr className="my-2" />
      <div className="grid grid-cols-7">
        {Array(numDays)
          .fill("")
          .map((_, dayIndex) => {
            const dayNumber = numDays - dayIndex;

            // if rendering curr month and curr year and curr day rendering is smaller than curr day the user will not be able to click it.
            if (
              monthNumber === CURR_MONTH &&
              dayNumber > CURR_DAY &&
              year === CURR_YEAR
            )
              return (
                <h1
                  key={`${year}-${monthNumber}-${dayNumber}`}
                  className="w-10 p-1 text-sm font-light text-center rounded-full"
                  style={{ color: theme.secondaryTextColor }}
                >
                  {dayNumber}
                </h1>
              );

            const currDate = new Date(year, monthNumber - 1, dayNumber);
            const currDateInMillis = currDate.getTime();

            let textColor = theme.mainTextColor;
            let fontBoldness = "font-light";
            let backgroundColor = theme.mainBgColor;

            // highlight curr day
            if (
              monthNumber === CURR_MONTH &&
              dayNumber === CURR_DAY &&
              year === CURR_YEAR
            ) {
              textColor = theme.themeColor;
              fontBoldness = "font-bold";
            }

            // highlight curr selected date
            if (entryDate && entryDate === currDateInMillis) {
              backgroundColor = theme.themeColor;
              textColor = theme.buttonTextColor;
            }

            return (
              <button
                key={`${year}-${monthNumber}-${dayNumber}`}
                className={`w-10 p-1 text-sm rounded-full ${fontBoldness}`}
                style={{ color: textColor, backgroundColor: backgroundColor }}
                onClick={() => handleDateClick(dayNumber)}
              >
                {dayNumber}
              </button>
            );
          })}
      </div>
    </div>
  );
}
