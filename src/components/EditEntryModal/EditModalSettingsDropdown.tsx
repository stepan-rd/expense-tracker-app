import { Dropdown } from "../Dropdown";
import { useThemeStore } from "@/state/ThemeStore";
import { motion } from "framer-motion";
import { useFirebaseAuth } from "@/state/FirebaseAuth";
import { useEditEntryModalStore } from "@/state/EditEntryModalStore";

const options = [""];

type Props = {
  className?: string;
  closeModal: () => void;
};

export function EditModalSettingsDropdown({ className, closeModal }: Props) {
  const { theme } = useThemeStore();

  const { editingEntryUid } = useEditEntryModalStore();

  const { currUserData, updateUserData, currUser } = useFirebaseAuth();

  async function handleDeleteOptionClick() {
    const entryToRemoveIndex = currUserData.entries.findIndex(
      (entry) => entry.uid === editingEntryUid
    );

    if (entryToRemoveIndex === -1) {
      console.error("Remove index not found");
      return;
    }

    try {
      const newUserEntries = [...currUserData.entries];

      newUserEntries.splice(entryToRemoveIndex, 1);

      const newUserData = { ...currUserData, entries: newUserEntries };

      await updateUserData(currUser.uid, newUserData);
    } catch (e: any) {
      console.error("Failed to remove entry", e);
    }
    closeModal();
  }

  return (
    <Dropdown className={`p-2 ${className}`}>
      {options.map((option) => (
        <motion.button
          style={{ backgroundColor: theme.mainBgColor }}
          whileHover={{
            backgroundColor: theme.hoverElementBgColor,
            transition: { duration: 0 },
          }}
          className="py-1 pl-4 pr-20 mt-1 text-left rounded-lg"
        >
          {option}
        </motion.button>
      ))}
      <hr className="mt-1" style={{ borderColor: theme.mainBorderColor }} />
      <motion.button
        onClick={handleDeleteOptionClick}
        style={{ backgroundColor: theme.mainBgColor }}
        whileHover={{
          backgroundColor: theme.hoverElementBgColor,
          transition: { duration: 0 },
        }}
        className="flex items-center justify-center py-1 pl-4 pr-20 mt-1 text-left text-red-600 rounded-lg"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          className="mr-2 text-sm font-light"
        >
          <g fill="none" fill-rule="evenodd">
            <path d="M0 0h24v24H0z"></path>
            <rect
              width="14"
              height="1"
              x="5"
              y="6"
              fill="currentColor"
              rx="0.5"
            ></rect>
            <path fill="currentColor" d="M10 9h1v8h-1V9zm3 0h1v8h-1V9z"></path>
            <path
              stroke="currentColor"
              d="M17.5 6.5h-11V18A1.5 1.5 0 0 0 8 19.5h8a1.5 1.5 0 0 0 1.5-1.5V6.5zm-9 0h7V5A1.5 1.5 0 0 0 14 3.5h-4A1.5 1.5 0 0 0 8.5 5v1.5z"
            ></path>
          </g>
        </svg>
        <h1>Delete</h1>
      </motion.button>
    </Dropdown>
  );
}
