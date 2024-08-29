import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useEditEntryModalStore } from "@/state/EditEntryModalStore";
import { useThemeStore } from "@/state/ThemeStore";
import { Input } from "../Input";
import { Button } from "../Button";
import { useFirebaseAuth } from "@/state/FirebaseAuth";
import { DiscardChangesModal } from "./DiscardChangesModal";

type Props = {};

export function EditNameAndDescSection({}: Props) {
  const { theme } = useThemeStore();

  const {
    currEditingEntry,
    editingNameOrDescription,
    setEditingNameOrDescription,
    editingEntryUid,
  } = useEditEntryModalStore();

  const { currUserData, currUser, updateUserData } = useFirebaseAuth();

  const [inputFocused, setInputFocused] = useState(false);
  const [initEntryName, setInitEntryName] = useState<string | null>(null);
  const [initEntryDescription, setInitEntryDescription] = useState<
    string | null
  >(null);
  const [entryName, setEntryName] = useState<string | null>(null);
  const [entryDescription, setEntryDescription] = useState<string | null>(null);
  const [discardChangesModalVisible, setDiscardChangesModalVisible] =
    useState(false);

  function handleCancelBtnClick() {
    if (
      entryName === initEntryName &&
      entryDescription === initEntryDescription
    ) {
      setEntryName(initEntryName);
      setEntryDescription(initEntryDescription);
      setEditingNameOrDescription(false);
      setDiscardChangesModalVisible(false);
    } else {
      setDiscardChangesModalVisible(true);
    }
  }

  function handleDiscardChangesBtnClick() {
    setEntryName(initEntryName);
    setEntryDescription(initEntryDescription);
    setEditingNameOrDescription(false);
    setDiscardChangesModalVisible(false);
  }

  async function handleSaveBtnClick() {
    const currEditingEntryIndex = currUserData.entries.findIndex(
      (entry) => entry.uid === editingEntryUid
    );

    if (currEditingEntryIndex === -1) {
      console.error("Editing entry not found");
      return;
    }

    if (
      currEditingEntry &&
      entryName &&
      entryDescription &&
      (entryName !== initEntryName || entryDescription !== initEntryDescription)
    ) {
      try {
        const updatedEntry = {
          ...currEditingEntry,
          name: entryName,
          description: entryDescription,
        };

        const updatedEntries = [...currUserData.entries];
        updatedEntries[currEditingEntryIndex] = updatedEntry;

        await updateUserData(currUser.uid, {
          ...currUserData,
          entries: updatedEntries,
        });
      } catch {
        console.error("Issue updating entry name and description");
      }
    } else {
      handleCancelBtnClick();
      return;
    }

    setInitEntryName(entryName);
    setInitEntryDescription(entryDescription);
    setEditingNameOrDescription(false);
  }

  useEffect(() => {
    if (currEditingEntry) {
      setEntryName(currEditingEntry.name);
      setEntryDescription(currEditingEntry.description);
    }
  }, [currEditingEntry]);

  useEffect(() => {
    if (currEditingEntry) {
      setInitEntryName(currEditingEntry.name);
      setInitEntryDescription(currEditingEntry.description);
    }
  }, []);

  return (
    <>
      <div className="relative" style={{ width: "60%" }}>
        <motion.div
          className="flex flex-col px-3 py-1 mt-5 ml-5 border rounded-lg"
          style={{
            borderColor: inputFocused
              ? theme.mainTextColor
              : editingNameOrDescription
                ? theme.mainBorderColor
                : theme.mainBgColor,
          }}
        >
          <Input
            placeholder="Entry name"
            className="py-2"
            onFocus={() => {
              setEditingNameOrDescription(true);
              setInputFocused(true);
            }}
            onBlur={() => setInputFocused(false)}
            value={entryName || ""}
            onChange={(e) => setEntryName(e.target.value)}
          />
          <textarea
            style={{
              backgroundColor: theme.mainBgColor,
              color: theme.mainTextColor,
            }}
            placeholder="Description"
            className="px-2 py-2 text-sm font-light outline-none resize-none"
            onFocus={() => {
              setEditingNameOrDescription(true);
              setInputFocused(true);
            }}
            onBlur={() => setInputFocused(false)}
            value={entryDescription || ""}
            onChange={(e) => setEntryDescription(e.target.value)}
          />
        </motion.div>
        {editingNameOrDescription && (
          <div className="absolute right-0 mt-2">
            <Button
              onClick={handleCancelBtnClick}
              hoverColor={theme.hoverElementBgColor}
              className="mr-2"
              style={{
                backgroundColor: theme.secondaryBgColor,
                color: theme.mainTextColor,
              }}
            >
              Cancel
            </Button>
            <Button onClick={handleSaveBtnClick}>Save</Button>
          </div>
        )}
      </div>
      {discardChangesModalVisible && (
        <DiscardChangesModal
          handleDiscardChangesBtnClick={handleDiscardChangesBtnClick}
          setDiscardChangesModalVisible={setDiscardChangesModalVisible}
        />
      )}
    </>
  );
}
