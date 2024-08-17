import React from "react";
import { Input } from "../Input";
import { useThemeStore } from "@/state/ThemeStore";

type Props = {
  disabled: boolean;
  entryAmount: string | null;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

export function EditAmountSection({ disabled, entryAmount, onChange }: Props) {
  const { theme } = useThemeStore();

  return (
    <div>
      <h1 className="px-2 text-xs font-bold">Amount</h1>
      <div className="flex items-center text-sm">
        <h1 className="pl-2">$</h1>
        <Input
          disabled={disabled}
          type="number"
          value={entryAmount || ""}
          onChange={onChange}
          placeholder="Amount"
          className="px-2"
          style={{ backgroundColor: theme.secondaryBgColor }}
        ></Input>
      </div>
    </div>
  );
}
