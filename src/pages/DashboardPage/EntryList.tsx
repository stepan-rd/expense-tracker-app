import { EntryCard } from "@/components/EntryCard";
import { useEditEntryModalStore } from "@/state/EditEntryModalStore";
import { useThemeStore } from "@/state/ThemeStore";
import { EntryType } from "@/types/types";
import { v4 as uuidv4 } from "uuid";

type Props = {
  currDisplayingEntries: EntryType[];
};

export function EntryList({ currDisplayingEntries }: Props) {
  const { theme } = useThemeStore();

  const { setIsEditingEntry, setEditingEntryUid } = useEditEntryModalStore();

  function handleEntryCardClick(uid: string) {
    setIsEditingEntry(true);
    setEditingEntryUid(uid);
  }

  return (
    <div className="mt-10 shadow-md" style={{ color: theme.mainTextColor }}>
      <div
        className="grid items-center grid-cols-5 py-2 rounded-t-lg"
        style={{ backgroundColor: theme.secondaryBgColor }}
      >
        <div className="flex flex-col items-center justify-center">
          <h1 className="">Name</h1>
          <h1 className="font-light">Description</h1>
        </div>
        <h1 className="flex justify-center">Category</h1>
        <h1 className="flex justify-center">Amount</h1>
        <h1 className="flex justify-center">Type</h1>
        <h1 className="flex justify-center">Date</h1>
      </div>
      <hr style={{ borderColor: theme.mainTextColor }} />
      <div
        className="overflow-x-hidden overflow-y-auto"
        style={{ maxHeight: "512px" }}
      >
        {currDisplayingEntries.length === 0 && (
          <h1
            className="box-content flex justify-center w-full pr-4 my-5 text-sm"
            style={{ color: theme.secondaryTextColor }}
          >
            No entries yet...
          </h1>
        )}
        {currDisplayingEntries.map((entry, i) => (
          <EntryCard
            key={uuidv4()}
            index={i}
            entry={entry}
            onClick={() => handleEntryCardClick(entry.uid)}
          />
        ))}
      </div>
    </div>
  );
}
