import { useFirebaseAuth } from "@/state/FirebaseAuth";
import { useThemeStore } from "@/state/ThemeStore";
import { useEffect, useState } from "react";

type Props = {
  className?: string;
};

export function ExpenseCard({ className }: Props) {
  const { theme } = useThemeStore();

  const { currUserData } = useFirebaseAuth();

  const [currDisplayingExpenses, setCurrDisplayingExpenses] = useState(
    currUserData.entries
      .filter((entry) => entry.type === "Expense")
      .reduce((acc, entry) => acc + entry.amount, 0)
  );

  useEffect(() => {
    const totalExpenses = currUserData.entries
      .filter((entry) => entry.type === "Expense")
      .reduce((acc, entry) => acc + entry.amount, 0);
    setCurrDisplayingExpenses(totalExpenses);
  }, [currUserData.entries]);

  return (
    <div
      className={`p-4 rounded-lg ${className}`}
      style={{
        backgroundColor: theme.mainBgColor,
        borderColor: theme.mainBorderColor,
      }}
    >
      <h1 className="text-xl">Expenses</h1>
      <h1 className="">${currDisplayingExpenses.toFixed(0)}</h1>
    </div>
  );
}
