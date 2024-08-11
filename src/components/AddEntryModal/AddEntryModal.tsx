import { useThemeStore } from "@/state/ThemeStore";
import { useGlobalStore } from "@/state/GlobalStore";
import { OverlayInvisible } from "../OverlayInvisible";
import { Input } from "../Input";
import { Button } from "../Button";
import { SecondaryButton } from "@/components/SecondaryButton";
import { useEffect, useRef, useState } from "react";
import { useFirebaseAuth } from "@/state/FirebaseAuth";
import { EntryType } from "@/types/types";
import { SelectDateSection } from "./SelectDateSection";
import { useAddEntryModalStore } from "@/state/AddEntryModalStore";
import { SelectAmountSection } from "./SelectAmountSection";
import { SelectTypeSection } from "./SelectTypeSection";
import { useSelectAmountDropdownStore } from "@/state/SelectAmountDropdownStore";
import { v4 as uuidv4 } from 'uuid';


type Props = {};

export function AddEntryModal({}: Props) {
  const { theme } = useThemeStore();

  const { currUser, getUserData, updateUserData } = useFirebaseAuth();

  const { setIsAddEntryModalVisible } = useGlobalStore();

  const { entryDate, resetAddEntryModalStore, entryAmountUSD, typeBtnValue } =
    useAddEntryModalStore();

  const { resetSelectAmountDropdownStoreStore } =
    useSelectAmountDropdownStore();

  const entryNameInputRef = useRef<HTMLInputElement | null>(null);
  const entryDescriptionInputRef = useRef<HTMLInputElement | null>(null);

  const [error, setError] = useState("");

  async function handleAddEntryBtnClick() {
    const entryName = entryNameInputRef.current?.value || "";
    const entryDescription = entryDescriptionInputRef.current?.value || "";

    if (
      entryName &&
      entryDescription &&
      entryDate &&
      entryAmountUSD &&
      typeBtnValue !== "Type"
    ) {
      try {
        const userData = await getUserData(currUser.uid);

        const entryUniqueId: string = uuidv4();

        const newEntry: EntryType = {
          uid: entryUniqueId,
          type: typeBtnValue,
          amount: entryAmountUSD,
          dateAdded: entryDate,
          name: entryName,
          description: entryDescription,
        };

        if (userData) {
          const updatedUserData = {
            ...userData,
            totalIncome: typeBtnValue === "Income" ? userData.totalIncome + entryAmountUSD : userData.totalIncome,
            totalExpenses: typeBtnValue === "Expense" ? userData.totalExpenses + entryAmountUSD : userData.totalExpenses,
            entries: [...userData.entries, newEntry],
          };
          updateUserData(currUser.uid, updatedUserData);
          handleCancelClick();
        }
      } catch (e: any) {
        console.error(e);
      }
    } else {
      console.log(`entryName: ${entryName}`);
      console.log(`entryDescription: ${entryDescription}`);
      console.log(`entryDate: ${entryDate}`);
      console.log(`entryAmountUSD: ${entryAmountUSD}`);
      console.log(`typeBtnValue: ${typeBtnValue}`);
      setError("Please fill every field.");
    }
  }

  function handleCancelClick() {
    setIsAddEntryModalVisible(false);
    resetAddEntryModalStore();
    resetSelectAmountDropdownStoreStore();
  }

  useEffect(() => {
    if (error) {
      const timeoutId = setTimeout(() => {
        setError("");
      }, 3500);

      return () => {
        clearTimeout(timeoutId);
      };
    }
  }, [error]);

  return (
    <>
      <OverlayInvisible
        className=""
        onClick={() => setIsAddEntryModalVisible(false)}
      />
      <div className="fixed inset-0 flex items-center justify-center w-screen h-screen pointer-events-none">
        <div
          className="relative flex flex-col w-full p-4 rounded-lg shadow-2xl pointer-events-auto bottom-52 md:w-4/5"
          style={{
            height: "200px",
            width: "524px",
            backgroundColor: theme.mainBgColor,
          }}
        >
          <Input
            ref={entryNameInputRef}
            className="text-xl"
            placeholder="Entry name"
          ></Input>
          <Input
            ref={entryDescriptionInputRef}
            className="font-light"
            placeholder="description"
          ></Input>
          <div className="flex mt-2">
            <SelectDateSection />
            <SelectAmountSection />
            <SelectTypeSection />
          </div>
          <hr className="relative mt-4 right-4 " style={{ width: "524px" }} />
          <h1 className="my-2 text-red-600">{error}</h1>
          <div className="absolute mt-2 right-4 bottom-5">
            <SecondaryButton className="mr-2" onClick={handleCancelClick}>
              Cancel
            </SecondaryButton>
            <Button onClick={handleAddEntryBtnClick}>Add</Button>
          </div>
        </div>
      </div>
    </>
  );
}
