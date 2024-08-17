import { PieChart } from "@/charts/ExpensesCategoryChart";
import { useThemeStore } from "@/state/ThemeStore";
import { EntryType } from "@/types/types";
import React from "react";

const MemoPieChart = React.memo(PieChart);

type Props = {
  entries: EntryType[];
  text: string;
  className?: string;
};

export function ChartSection({ entries, text, className }: Props) {
  const { theme } = useThemeStore();

  return (
    <div
      className={`flex flex-col items-center w-full mx-auto ${className}`}
      style={{ width: "400px", height: "400px" }}
    >
      <h1 className="flex justify-center w-full text-xl font-bold">{text}</h1>
      {entries.length === 0 && (
        <h1
          className="flex justify-center w-full text-sm"
          style={{ color: theme.secondaryTextColor }}
        >
          No data...
        </h1>
      )}
      <MemoPieChart className="" data={entries} />
    </div>
  );
}
