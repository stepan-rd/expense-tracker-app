import { useThemeStore } from "@/state/ThemeStore";
import { EntryType } from "@/types/types";
import { motion } from "framer-motion"
import { useFirebaseAuth } from "@/state/FirebaseAuth";

type Props = {
  entry: EntryType;
  index: number;
  onClick?: () => void;
};

export function EntryCard({ entry, index, onClick }: Props) {
  const { theme } = useThemeStore();

  const { currUserData } = useFirebaseAuth();
  
  return (
    <>
      <motion.div
        whileHover={{backgroundColor: theme.hoverElementBgColor, transition: { duration: 0 }}}
        onClick={onClick}
        className="relative grid items-center grid-cols-5 px-4 py-3 hover:cursor-pointer"
        style={{
          color: theme.mainTextColor,
          backgroundColor:
            index % 2 !== 0 ? theme.secondaryBgColor : theme.mainBgColor,
        }}
      >
        <div className="flex flex-col items-center justify-center text-center">
          <h1 className="break-all w-fit">{entry.name}</h1>
          <h1 className="font-light break-all w-fit">{entry.description}</h1>
        </div>
        <h1 className="flex justify-center">{entry.category}</h1>
        <h1 className="flex justify-center" style={{ left: "15%" }}>
          {(Number(entry.amount) * currUserData.currency.conversionRate).toFixed(0)} {currUserData.currency.symbol}
        </h1>
        <h1
          className={`flex justify-center`}
          style={{ left: "60%", color: entry.type === "Expense" ? theme.secondaryThemeColor : theme.themeColor }}
        >
          {entry.type}
        </h1>
        <h1 className="flex justify-center text-sm">
          {formatDate(entry.dateAddedMs)}
        </h1>
      </motion.div>
      <hr style={{ borderColor: theme.mainBorderColor }} />
    </>
  );
}

const formatDate = (timestamp: number) => {
  const date = new Date(timestamp);
  return date.toLocaleDateString("en-GB") || timestamp; // 'en-GB' gives you DD MMM YYYY format
};
