import React, { useState } from "react";
import { Button1 } from "../Button1";
import { useThemeStore } from "@/state/ThemeStore";
import { AmountSelect } from "../DateSelect/AmountSelect";
import { useAddEntryModalStore } from "@/state/AddEntryModalStore";

type Props = {};

export function SelectAmountSection({}: Props) {
  const { theme } = useThemeStore();

  const { amountBtnValue } = useAddEntryModalStore();

  const [isAmountSelectVisible, setIsAmountSelectVisible] = useState(false);

  return (
    <div>
      <Button1 className="mr-2" onClick={() => setIsAmountSelectVisible(true)}>
        {amountBtnValue}
      </Button1>
      {isAmountSelectVisible && (
        <AmountSelect setIsAmountSelectVisible={setIsAmountSelectVisible} />
      )}
    </div>
  );
}
