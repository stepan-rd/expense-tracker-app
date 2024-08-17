import { Dropdown } from "./Dropdown";
import { DropdownOptions } from "./DropdownOptions";
import { OverlayInvisible } from "./OverlayInvisible";
import { useFirebaseAuth } from "@/state/FirebaseAuth";
import { SupportedCurrency, UserDataType } from "@/types/types";
import { getCurrencyDetails } from "@/hooks/getCurrencyDetails";

import currCurrencyOptions from "@/data/appCurrencyOptions.json";

type Props = {
  overlayOnClick: () => void;
  className?: string;
  style?: React.CSSProperties;
};

export function ChangeCurrencyDropdown({
  overlayOnClick,
  className,
  style,
}: Props) {
  const { currUserData, updateUserData, currUser } = useFirebaseAuth();

  async function handleDropdownChoiceClick(option: SupportedCurrency) {
    try {
      const updatedUserData: UserDataType = {
        ...currUserData,
        currency: getCurrencyDetails(option),
      };
  
      await updateUserData(currUser.uid, updatedUserData);
    } catch (e: any) {
      console.error("Failed to update currency", e)
    }

  }

  return (
    <>
      <OverlayInvisible className="z-10" onClick={overlayOnClick} />
      <Dropdown className={` ${className}`} style={{ ...style }}>
        <DropdownOptions
          options={currCurrencyOptions}
          onClick={handleDropdownChoiceClick}
        />
      </Dropdown>
    </>
  );
}
