import { useThemeStore } from "@/state/ThemeStore";
import React, { SetStateAction, useEffect, useRef, useState } from "react";
import { OverlayInvisible } from "../OverlayInvisible";
import { useAddEntryModalStore } from "@/state/AddEntryModalStore";
import { Input } from "../Input";
import { Dropdown } from "../Dropdown";
import { Button1 } from "../Button1";
import { motion } from "framer-motion";
import { useGlobalStore } from "@/state/GlobalStore";
import { getCurrencyDetails } from "@/hooks/getCurrencyDetails";
import { CurrencyDetailsType, SupportedCurrency } from "@/types/types";
import { Button } from "../Button";
import { useSelectAmountDropdownStore } from "@/state/SelectAmountDropdownStore";

// temp array :
const currCurrencyOptions: SupportedCurrency[] = ["USD", "EUR", "PLN", "CZK"];

type Props = {
  setIsAmountSelectVisible: React.Dispatch<SetStateAction<boolean>>;
};

export function AmountSelect({ setIsAmountSelectVisible }: Props) {
  const { theme } = useThemeStore();

  const { amountBtnValue, setEntryAmountUSD, setAmountBtnValue } =
    useAddEntryModalStore();

  const {
    currencyDetails,
    setCurrencyDetails,
    currencyDropdownBtnValue,
    setCurrencyDropdownBtnValue,
    amountInputValue,
    setAmountInputValue,
  } = useSelectAmountDropdownStore();

  const [isCurrencyDropdownVisible, setIsCurrencyDropdownVisible] =
    useState(false);

  function handleInputOnChange(e: React.ChangeEvent<HTMLInputElement>) {
    setAmountInputValue(e.target.value);
    setAmountBtnValue(`${e.target.value} ${currencyDetails.symbol}`);

    const amountUSD = Number(e.target.value) / currencyDetails.conversionRate;
    setEntryAmountUSD(amountUSD);
  }

  function handleOptionClick(option: SupportedCurrency) {
    setCurrencyDropdownBtnValue(option);
    setIsCurrencyDropdownVisible(false);
  }

  useEffect(() => {
    const newCurrencyDetails = getCurrencyDetails(currencyDropdownBtnValue);
    setCurrencyDetails(newCurrencyDetails);
    setAmountBtnValue(`${amountInputValue} ${newCurrencyDetails.symbol}`);

    const amountUSD =
      Number(amountInputValue) / newCurrencyDetails.conversionRate;
    setEntryAmountUSD(amountUSD);
  }, [currencyDropdownBtnValue]);

  return (
    <>
      <OverlayInvisible onClick={() => setIsAmountSelectVisible(false)} />
      <div
        className="absolute z-10 flex items-center p-2 rounded-lg shadow-md"
        style={{ backgroundColor: theme.mainBgColor }}
      >
        <h1 className="" style={{ color: theme.mainTextColor }}>
          {currencyDetails.symbol}
        </h1>
        <Input
          value={amountInputValue}
          onChange={(e) => handleInputOnChange(e)}
          min={0}
          type="number"
          placeholder="Amount"
        ></Input>
        <div className="">
          <Button1 onClick={() => setIsCurrencyDropdownVisible(true)}>
            {currencyDropdownBtnValue}
          </Button1>
          {isCurrencyDropdownVisible && (
            <>
              <OverlayInvisible
                onClick={() => setIsCurrencyDropdownVisible(false)}
              />
              <Dropdown className="absolute">
                {currCurrencyOptions.map((option, optionIndex) => (
                  <motion.option
                    onClick={() => handleOptionClick(option)}
                    key={`${option}-${optionIndex}`}
                    style={{ backgroundColor: theme.mainBgColor }}
                    whileHover={{ backgroundColor: theme.secondaryBgColor }}
                    className="px-2 hover:cursor-pointer"
                  >
                    {option}
                  </motion.option>
                ))}
              </Dropdown>
            </>
          )}
        </div>
      </div>
    </>
  );
}
