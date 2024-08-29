import { useState } from "react";

import { motion } from "framer-motion";
import { useThemeStore } from "@/state/ThemeStore";
import { Dropdown } from "@/components/Dropdown";
import { OverlayInvisible } from "@/components/OverlayInvisible";
import { DisplayingTimePeriod, useDashboardPageStore } from "@/state/DashboardPageStore";

const timePeriodDropdownOptions = [
  "Today",
  "This Week",
  "This Month",
  "This Year",
  "All Time",
];

type Props = {};

export function TimePeriodSection({}: Props) {
  const { theme } = useThemeStore();

  const { currDisplayingTimePeriod, setCurrDisplayingTimePeriod } = useDashboardPageStore();

  const [timePeriodDropdown, setTimePeriodDropdown] = useState(false);

  function handleTimePeriodOptionClick(option: DisplayingTimePeriod) {
    setCurrDisplayingTimePeriod(option);
    setTimePeriodDropdown(false)
  }

  return (
    <div className="">
      <h1 className="px-3 font-bold">Time Period</h1>
      <motion.div
        onClick={() => setTimePeriodDropdown(true)}
        style={{
          backgroundColor: theme.mainBgColor,
          color: theme.mainTextColor,
        }}
        whileHover={{
          backgroundColor: theme.hoverElementBgColor,
          transition: { duration: 0 },
        }}
        className="flex justify-between px-3 py-2 mt-2 rounded-lg hover:cursor-pointer"
      >
        <h1>{currDisplayingTimePeriod}</h1>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          fill="none"
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <path
            fill="currentColor"
            d="M15.646 9.647a.5.5 0 0 1 .708.707l-4 4a.5.5 0 0 1-.708 0l-4-4a.5.5 0 1 1 .708-.707L12 13.294l3.646-3.647Z"
          ></path>
        </svg>
      </motion.div>
      {timePeriodDropdown && (
        <>
          <OverlayInvisible onClick={() => setTimePeriodDropdown(false)} />
          <Dropdown className="absolute w-full top-18">
            {timePeriodDropdownOptions.map((option, i) => (
              <motion.button
                onClick={() => handleTimePeriodOptionClick(option as DisplayingTimePeriod)}
                style={{ backgroundColor: theme.mainBgColor }}
                whileHover={{
                  backgroundColor: theme.hoverElementBgColor,
                  transition: { duration: 0 },
                }}
                className={`px-2 py-1 text-left ${i === 0 && "rounded-t-lg"} ${i === timePeriodDropdownOptions.length - 1 && "rounded-b-lg"}`}
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
