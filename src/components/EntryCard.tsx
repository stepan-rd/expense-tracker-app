import { getCurrencyDetails } from "@/hooks/getCurrencyDetails";
import { useGlobalStore } from "@/state/GlobalStore";
import { useThemeStore } from "@/state/ThemeStore";
import { EntryType } from "@/types/types";
import React, { useEffect, useState } from "react";

type Props = {
  entry: EntryType;
};

export function EntryCard({ entry }: Props) {
  const { theme } = useThemeStore();

  const { userCurrency } = useGlobalStore();

  const [currencyDetails, setCurrencyDetails] = useState(
    getCurrencyDetails(userCurrency)
  );

  useEffect(() => {
    const newCurrencyDetails = getCurrencyDetails(userCurrency);

    setCurrencyDetails(newCurrencyDetails);
  }, [userCurrency]);

  return (
    <>
      <div
        className="relative grid items-center grid-cols-4 my-2"
        style={{ color: theme.mainTextColor }}
      >
        <div>
          <h1>{entry.name}</h1>
          <h1 className="mr-4 font-light break-all">{entry.description}</h1>
        </div>
        <h1 className="" style={{ left: "15%" }}>
          {entry.amount.toFixed(0)} {currencyDetails.symbol}
        </h1>
        <h1 className={`${entry.type === "Expense" ? "text-blue-500" : "text-cyan-400"}`} style={{ left: "60%" }}>
          {entry.type}
        </h1>
        <h1 className="text-sm">
          {formatDate(entry.dateAdded)}
        </h1>
      </div>
      <hr style={{borderColor: theme.mainBorderColor}}/>
    </>
  );
}

const formatDate = (timestamp: number) => {
  const date = new Date(timestamp);
  return date.toLocaleDateString("en-GB"); // 'en-GB' gives you DD MMM YYYY format
};
