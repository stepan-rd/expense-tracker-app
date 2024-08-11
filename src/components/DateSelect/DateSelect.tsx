import { useThemeStore } from "@/state/ThemeStore";
import React, { SetStateAction } from "react";
import { Month } from "./Month";
import { OverlayInvisible } from "../OverlayInvisible";
import "@/styles/styles.css";

const CURR_YEAR = new Date().getFullYear();
const CURR_MONTH = new Date().getMonth();

const years = [
  2024, 2023, 2022, 2021, 2020, 2019, 2018, 2017, 2016, 2015, 2014,
];

const monthNames = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const monthDays = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

type Props = {
  setIsDateSelectVisible: React.Dispatch<SetStateAction<boolean>>;
};

export function DateSelect({ setIsDateSelectVisible }: Props) {
  const { theme } = useThemeStore();

  return (
    <>
      <OverlayInvisible onClick={() => setIsDateSelectVisible(false)} />
      <div
        className="absolute z-10 flex flex-col overflow-x-hidden overflow-y-auto rounded-lg shadow-md custom-scrollbar h-96 w-fit"
        style={{ backgroundColor: theme.mainBgColor }}
      >
        {years.map((year) => {
          return monthNames.map((monthName, monthIndex) => {
            // if rendering currYear and the month rendering is smaller then curr month don't render the month.
            if (year === CURR_YEAR && monthIndex + 1 < CURR_MONTH + 1) return;

            return (
              <Month
                key={`${year}-${monthIndex}`}
                monthName={monthName}
                monthNumber={monthIndex + 1}
                year={year}
                numDays={monthDays[monthIndex]}
              />
            );
          });
        })}
      </div>
    </>
  );
}
