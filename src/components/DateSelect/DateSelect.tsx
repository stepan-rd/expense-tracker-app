import { useThemeStore } from "@/state/ThemeStore";
import React, { SetStateAction, useEffect } from "react";
import { Month } from "./Month";
import { OverlayInvisible } from "../OverlayInvisible";
import "@/styles/styles.css";

const CURR_YEAR = new Date().getFullYear();
const CURR_MONTH = new Date().getMonth();

const years = [
  2024, 2023, 2022, 2021, 2020, 2019, 2018, 2017, 2016, 2015, 2014,
];

const monthNames = [
  "December",
  "November",
  "October",
  "September",
  "August",
  "July",
  "June",
  "May",
  "April",
  "March",
  "February",
  "January",
];

const monthDays = [31, 30, 31, 30, 31, 30, 31, 31, 30, 31, 28, 31];

type Props = {
  overlayOnClick: () => void;
  handleDateClick: (
    year: number,
    monthNumber: number,
    dayNumber: number,
    monthName: string
  ) => void;
  currSelectedDate: number | null;
};

export function DateSelect({
  overlayOnClick,
  handleDateClick,
  currSelectedDate,
}: Props) {
  const { theme } = useThemeStore();

  return (
    <>
      <OverlayInvisible className="z-10" onClick={overlayOnClick} />
      <div
        className="absolute z-10 overflow-x-hidden overflow-y-scroll text-sm shadow-md w-fit h-96"
        style={{ backgroundColor: theme.mainBgColor }}
      >
        {years.map((year) => {
          return monthNames.map((monthName, i) => {
            const mappingMonthNumber = monthNames.length - i;
            // if rendering currYear and the month rendering is smaller then curr month don't render the month.
            if (year === CURR_YEAR && mappingMonthNumber > CURR_MONTH + 1)
              return;

            return (
              <Month
                currSelectedDate={currSelectedDate}
                handleDateClick={handleDateClick}
                key={`${year}-${mappingMonthNumber}`}
                monthName={monthName}
                monthNumber={mappingMonthNumber}
                year={year}
                numDays={monthDays[i]}
              />
            );
          });
        })}
      </div>
    </>
  );
}
