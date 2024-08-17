import { useThemeStore } from "@/state/ThemeStore";
import { useGlobalStore } from "@/state/GlobalStore";
import { OverlayInvisible } from "../OverlayInvisible";
import { Input } from "../Input";
import { Button } from "../Button";
import { SecondaryButton } from "@/components/SecondaryButton";
import { useEffect, useState } from "react";
import { useFirebaseAuth } from "@/state/FirebaseAuth";
import { EntryType } from "@/types/types";
import { SelectDateSection } from "./SelectDateSection";
import { useAddEntryModalStore } from "@/state/AddEntryModalStore";
import { SelectAmountSection } from "./SelectAmountSection";
import { SelectTypeSection } from "./SelectTypeSection";
import { useSelectAmountDropdownStore } from "@/state/SelectAmountDropdownStore";
import { v4 as uuidv4 } from "uuid";
import { SelectCategorySection } from "./SelectCategorySection";
import { motion, AnimatePresence } from "framer-motion";

export function AddEntryModal() {
  const { theme } = useThemeStore();
  const { currUser, getUserData, updateUserData } = useFirebaseAuth();
  const { isAddEntryModalVisible, setIsAddEntryModalVisible } =
    useGlobalStore();
  const {
    entryDate,
    resetAddEntryModalStore,
    entryAmountUSD,
    typeBtnValue,
    categoryBtnValue,
  } = useAddEntryModalStore();
  const { resetSelectAmountDropdownStoreStore } =
    useSelectAmountDropdownStore();

  const [entryName, setEntryName] = useState("");
  const [entryDescription, setEntryDescription] = useState("");
  const [error, setError] = useState("");
  const [addBtnDisabled, setAddBtnDisabled] = useState(true);

  async function handleAddEntryBtnClick() {
    if (
      !isFormValid(
        entryName,
        entryDescription,
        entryDate,
        entryAmountUSD,
        categoryBtnValue,
        typeBtnValue
      )
    ) {
      setError("Please fill every field.");
      return;
    }

    try {
      const userData = await getUserData(currUser.uid);

      if (!userData) throw new Error("User data not found.");

      const entryUniqueId = uuidv4();
      const newEntry: EntryType = {
        uid: entryUniqueId,
        type: typeBtnValue as "Income" | "Expense",
        amount: entryAmountUSD!,
        dateAddedMs: entryDate!,
        name: entryName,
        description: entryDescription,
        category: categoryBtnValue,
      };

      const updatedUserData = {
        ...userData,
        entries: [...userData.entries, newEntry],
      };

      await updateUserData(currUser.uid, updatedUserData);
      handleCancelClick();
    } catch (e) {
      console.error(e);
      setError("Failed to add entry.");
    }
  }

  function handleCancelClick() {
    setIsAddEntryModalVisible(false);
    resetAddEntryModalStore();
    resetSelectAmountDropdownStoreStore();
  }

  useEffect(() => {
    if (error) {
      const timeoutId = setTimeout(() => setError(""), 3500);
      return () => clearTimeout(timeoutId);
    }
  }, [error]);

  useEffect(() => {
    setAddBtnDisabled(
      !isFormValid(
        entryName,
        entryDescription,
        entryDate,
        entryAmountUSD,
        categoryBtnValue,
        typeBtnValue
      )
    );
  }, [
    entryName,
    entryDescription,
    entryDate,
    entryAmountUSD,
    categoryBtnValue,
    typeBtnValue,
  ]);

  return (
    <AnimatePresence mode="wait">
      {isAddEntryModalVisible && (
        <>
          <OverlayInvisible
            className="z-10"
            onClick={handleCancelClick}
          />
          <motion.div
            key="modal"
            initial={{ opacity: 0, scale: 0.75 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.75 }}
            transition={{ duration: 0.2, ease: "easeInOut" }}
            className="fixed inset-0 z-20 flex items-center justify-center pointer-events-none"
          >
            <div
              className="relative flex flex-col w-full p-4 border rounded-lg shadow-2xl pointer-events-auto bottom-64 md:w-4/5"
              style={{
                height: "200px",
                width: "524px",
                color: theme.mainTextColor,
                backgroundColor: theme.secondaryBgColor,
              }}
            >
              <Input
                onChange={(e) => setEntryName(e.target.value)}
                className="text-md"
                placeholder="Entry name"
                style={{backgroundColor: theme.secondaryBgColor}}
              />
              <Input
                style={{backgroundColor: theme.secondaryBgColor}}
                onChange={(e) => setEntryDescription(e.target.value)}
                className="text-sm font-light"
                placeholder="Description"
              />
              <div className="flex mt-2 text-sm">
                <SelectTypeSection />
                <SelectCategorySection />
                <SelectAmountSection />
                <SelectDateSection />
              </div>
              <hr
                className="relative mt-4 right-4"
                style={{ width: "524px" }}
              />
              <h1 className="my-2 text-red-600">{error}</h1>
              <div className="absolute mt-2 right-4 bottom-5">
                <SecondaryButton
                  className="mr-2 text-sm"
                  onClick={handleCancelClick}
                >
                  Cancel
                </SecondaryButton>
                <Button
                  disabled={addBtnDisabled}
                  className="text-sm"
                  onClick={handleAddEntryBtnClick}
                >
                  Add
                </Button>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

function isFormValid(
  entryName: string,
  entryDescription: string,
  entryDate: number | null,
  entryAmountUSD: number | null,
  categoryBtnValue: string,
  typeBtnValue: string
) {
  return (
    entryName.trim() !== "" &&
    entryDescription.trim() !== "" &&
    entryDate !== null &&
    entryAmountUSD !== null &&
    typeBtnValue !== "Type" &&
    categoryBtnValue !== "Category"
  );
}
