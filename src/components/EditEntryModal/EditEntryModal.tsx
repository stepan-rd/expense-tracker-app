import React, { useEffect, useState } from "react";
import { Overlay } from "../Overlay";
import { useThemeStore } from "@/state/ThemeStore";
import { useFirebaseAuth } from "@/state/FirebaseAuth";
import { TopSection } from "@/components/EditEntryModal/TopSection";
import { EditAmountSection } from "./EditAmountSection";
import { EditCategorySection } from "./EditCategorySection";
import { useEditEntryModalStore } from "@/state/EditEntryModalStore";
import { EditNameAndDescSection } from "./EditNameAndDescSection";
import { EditTypeSection } from "./EditTypeSection";
import { EditDateSection } from "./EditDateSection";
import { formatMsToDate } from "@/utils/formatMsToDate";

type Props = {};

export function EditEntryModal({}: Props) {
  const { theme } = useThemeStore();

  const { currUserData, updateUserData, currUser } = useFirebaseAuth();

  const {
    editingEntryUid,
    setEditingEntryUid,
    setIsEditingEntry,
    setCurrEditingEntry,
    currEditingEntry,
    editingNameOrDescription,
    setEditingNameOrDescription,
    entryCategory,
    setEntryCategory,
    setEntryType,
    entryType,
    setEditingEntryDateBtnValue,
    entryDate,
    setEntryDate,
  } = useEditEntryModalStore();

  const [entryAmount, setEntryAmount] = useState<string | null>(null);

  function closeModal() {
    setIsEditingEntry(false);
    setEditingEntryUid(null);
    setEditingNameOrDescription(false);
  }

  async function updateEntry(updates: Partial<typeof currEditingEntry>) {
    if (!currEditingEntry) return;

    if (editingEntryUid) {
      try {
        const updatedEntry = { ...currEditingEntry, ...updates };
        const updatedEntries = currUserData.entries.map((entry) => {
          if (entry.uid === editingEntryUid) {
            return updatedEntry;
          }
          return entry;
        });

        await updateUserData(currUser.uid, {
          ...currUserData,
          entries: updatedEntries,
        });
      } catch (e: any) {
        console.error("Failed to update entry", e);
      }
    } else {
      console.log("no uid");
    }
  }

  // disable scrolling for content behind after opening, cleanup function enables scrolling again upon closing
  useEffect(() => {
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  useEffect(() => {
    const currEditingEntry = currUserData.entries.find(
      (entry) => entry.uid === editingEntryUid
    );

    if (currEditingEntry) {
      setCurrEditingEntry(currEditingEntry);
    }
  }, [editingEntryUid]);

  useEffect(() => {
    if (currEditingEntry) {
      setEntryType(currEditingEntry.type);
      setEntryAmount(currEditingEntry.amount.toString());
      setEntryCategory(currEditingEntry.category);
      setEditingEntryDateBtnValue(formatMsToDate(currEditingEntry.dateAddedMs))
      setEntryDate(currEditingEntry.dateAddedMs)
    }
  }, [currEditingEntry]);

  useEffect(() => {
    if (entryAmount && currEditingEntry?.amount !== Number(entryAmount)) {
      console.log("updating amount");
      updateEntry({ amount: Number(entryAmount) });
    }
  }, [entryAmount]);

  // Separate useEffect for category update
  useEffect(() => {
    if (entryCategory && currEditingEntry?.category !== entryCategory) {
      console.log("updating category");
      updateEntry({ category: entryCategory });
    }
  }, [entryCategory]);

  // Separate useEffect for type update
  useEffect(() => {
    if (entryType && currEditingEntry?.type !== entryType) {
      console.log("updating type");
      updateEntry({ type: entryType });
    }
  }, [entryType]);

  useEffect(() => {
    if (entryDate && currEditingEntry?.dateAddedMs !== entryDate) {
      console.log("updating date");
      updateEntry({ dateAddedMs: entryDate})
    }
  }, [entryDate])

  return (
    <>
      <Overlay className="z-10" onClick={closeModal} />
      <div
        className="fixed z-50 w-full overflow-hidden rounded-lg shadow-md lg:w-1/2 md:w-3/4"
        style={{
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          height: "85%",
          backgroundColor: theme.mainBgColor,
        }}
      >
        <TopSection closeModal={closeModal} />
        <hr style={{ borderColor: theme.mainTextColor }} />
        <div className="flex h-full">
          <EditNameAndDescSection />
          <div
            className="relative flex flex-col flex-grow px-2 py-4 ml-5 text-sm "
            style={{ backgroundColor: theme.secondaryBgColor }}
          >
            <div
              style={{
                color: editingNameOrDescription
                  ? theme.secondaryTextColor
                  : theme.mainTextColor,
              }}
            >
              <EditTypeSection disabled={editingNameOrDescription} />
              <hr
                className="my-2 rounded-lg"
                style={{ borderColor: theme.mainBorderColor }}
              />
              <EditCategorySection
                disabled={editingNameOrDescription}
                entryType={entryType}
              />
              <hr
                className="my-2 rounded-lg"
                style={{ borderColor: theme.mainBorderColor }}
              />
              <EditAmountSection
                disabled={editingNameOrDescription}
                entryAmount={entryAmount}
                onChange={(e) => setEntryAmount(e.target.value)}
              />
              <hr
                className="my-2 rounded-lg"
                style={{ borderColor: theme.mainBorderColor }}
              />
              <EditDateSection disabled={editingNameOrDescription} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
