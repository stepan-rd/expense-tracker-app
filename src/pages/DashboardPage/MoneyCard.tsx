import { useFirebaseAuth } from "@/state/FirebaseAuth";
import { useThemeStore } from "@/state/ThemeStore";
import React, { useEffect, useState } from "react";

type Props = {
  className?: string;
  amount: number;
  text: string
};

export function MoneyCard({ className, amount, text}: Props) {
  const { theme } = useThemeStore();

  const { currUserData } = useFirebaseAuth();

  return (
    <div
      className={`p-4 mr-4 ${className}`}
      style={{ backgroundColor: theme.mainBgColor, borderColor: theme.mainBorderColor }}
    >
      <h1 className="text-xl">{text}</h1>
      <h1 className="">{currUserData.currency.symbol}{amount.toFixed(0)}</h1>
    </div>
  );
}
