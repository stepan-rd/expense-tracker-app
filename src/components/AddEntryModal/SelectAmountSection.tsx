import { useState } from "react";
import { Button1 } from "../Button1";
import { AmountSelect } from "./AmountSelect";
import { useAddEntryModalStore } from "@/state/AddEntryModalStore";
import { useSelectAmountDropdownStore } from "@/state/SelectAmountDropdownStore";

type Props = {};

export function SelectAmountSection({}: Props) {

  const { amountBtnValue } = useAddEntryModalStore();

  const { currencyDetails } = useSelectAmountDropdownStore();

  const [isAmountSelectVisible, setIsAmountSelectVisible] = useState(false);

  return (
    <div className="mr-2">
      <Button1
        isSelected={amountBtnValue !== "Amount" && amountBtnValue.length !== 2}
        className="flex items-center py-1"
        onClick={() => setIsAmountSelectVisible(true)}
      >
        {amountBtnValue === "Amount" && (
          <h1 className="mr-1">{currencyDetails.symbol}</h1>
        )}
        {amountBtnValue.length === 2 ? "$ Amount" : amountBtnValue}
      </Button1>
      {isAmountSelectVisible && (
        <AmountSelect setIsAmountSelectVisible={setIsAmountSelectVisible} />
      )}
    </div>
  );
}
