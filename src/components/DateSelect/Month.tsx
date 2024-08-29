import { useThemeStore } from "@/state/ThemeStore";

const CURR_YEAR = new Date().getFullYear();
const CURR_DAY = new Date().getDate();
const CURR_MONTH = new Date().getMonth() + 1;

type Props = {
  numDays: number;
  monthName: string;
  year: number;
  monthNumber: number;
  handleDateClick: (
    year: number,
    monthNumber: number,
    dayNumber: number,
    monthName: string
  ) => void;
  currSelectedDate: number | null;
};

export function Month({
  numDays,
  monthName,
  year,
  monthNumber,
  handleDateClick,
  currSelectedDate
}: Props) {
  const { theme } = useThemeStore();

  return (
    <div className="p-2 ">
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
                  style={{ color: theme.secondaryBorderColor }}
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
            if (currSelectedDate && currSelectedDate === currDateInMillis) {
              backgroundColor = theme.themeColor;
              textColor = theme.buttonTextColor;
            }

            return (
              <button
                key={`${year}-${monthNumber}-${dayNumber}`}
                className={`w-10 p-1 text-sm rounded-full ${fontBoldness}`}
                style={{ color: textColor, backgroundColor: backgroundColor }}
                onClick={() => handleDateClick(year, monthNumber, dayNumber, monthName)}
              >
                {dayNumber}
              </button>
            );
          })}
      </div>
    </div>
  );
}
