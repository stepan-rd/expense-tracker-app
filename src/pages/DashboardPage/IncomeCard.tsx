import { useFirebaseAuth } from "@/state/FirebaseAuth";
import { useThemeStore } from "@/state/ThemeStore";
import React, { useEffect, useState } from "react";

type Props = {
  className?: string;
};

export function IncomeCard({ className }: Props) {
  const { theme } = useThemeStore();

  const { currUserData } = useFirebaseAuth();

  const [currDisplayingIncome, setCurrDisplayingIncome] = useState(
    currUserData.totalIncome
  );

  useEffect(() => {
    setCurrDisplayingIncome(currUserData.totalIncome);
  }, [currUserData.totalIncome]);

  return (
    <div
      className={`p-4 mr-4 ${className}`}
      style={{ backgroundColor: theme.mainBgColor }}
    >
      <h1 className="text-xl">Income</h1>
      <h1 className="">${currDisplayingIncome.toFixed(0)}</h1>
    </div>
  );
}
