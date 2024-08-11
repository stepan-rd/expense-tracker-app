import { useFirebaseAuth } from "@/state/FirebaseAuth";
import { ChooseUsernamePopup } from "./ChooseUsernamePopup";
import { useThemeStore } from "@/state/ThemeStore";
import { IncomeCard } from "./IncomeCard";
import { ExpenseCard } from "./ExpenseCard";
import SelectTimeBtn from "./SelectTimeBtn";
import { useDashboardPageStore } from "@/state/DashboardPageStore";
import { EntryCard } from "@/components/EntryCard";
import { useEffect, useState } from "react";
import { EntryType } from "@/types/types";

type Props = {};

export function DashboardPage({}: Props) {
  const { theme } = useThemeStore();

  const { currUserData } = useFirebaseAuth();

  const { currDisplayingTimePeriod } = useDashboardPageStore();

  const [currDisplayingEntries, setCurrDisplayingEntries] = useState<
    EntryType[]
  >(currUserData.entries);

  useEffect(() => {
    setCurrDisplayingEntries(currUserData.entries);
  }, [currUserData.entries]);

  return (
    <div
      className="mx-auto py-14 font-alexandria"
      style={{ backgroundColor: theme.mainBgColor, maxWidth: "600px"  }}
    >
      <h1 className="text-3xl font-bold capitalize">
        {currDisplayingTimePeriod}
      </h1>
      <div className="flex justify-center mt-5">
        <IncomeCard className="w-64" />
        <ExpenseCard className="w-64" />
        <SelectTimeBtn />
      </div>
      <div className="mt-96" style={{ color: theme.mainTextColor }}>
        <div className="grid items-center grid-cols-4 py-2">
          <div>
            <h1>Name</h1>
            <h1 className="font-light">Description</h1>
          </div>
          <h1>Amount</h1>
          <h1>Type</h1>
          <h1 className="">Date</h1>
        </div>
        <hr style={{ borderColor: theme.mainTextColor }} />
        {currDisplayingEntries.length === 0 && (
          <h1
            className="flex justify-center w-full text-sm"
            style={{ color: theme.secondaryTextColor }}
          >
            No entries yet...
          </h1>
        )}
        {currDisplayingEntries.map((entry) => (
          <EntryCard key={entry.uid} entry={entry} />
        ))}
      </div>
      {currUserData.username === null && <ChooseUsernamePopup />}
    </div>
  );
}
