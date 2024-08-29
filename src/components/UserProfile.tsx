import { useFirebaseAuth } from "@/state/FirebaseAuth";
import { useThemeStore } from "@/state/ThemeStore";
import { motion } from "framer-motion";
import { useState } from "react";
import { UserSettingsDropdown } from "./UserSettingsDropdown";
import { OverlayInvisible } from "./OverlayInvisible";

type Props = {};

export function UserProfile({}: Props) {
  const { theme } = useThemeStore();

  const { currUserData } = useFirebaseAuth();

  const [isDropdownVisible, setIsDropdownVisible] = useState(false);

  return (
    <>
      <motion.div
        style={{ backgroundColor: theme.secondaryBgColor }}
        whileHover={{ backgroundColor: theme.hoverElementBgColor }}
        className="flex items-center w-3/4 p-1 rounded-lg cursor-pointer"
        onClick={() => setIsDropdownVisible((prev) => !prev)}
      >
        <div
          className="w-4 h-4 p-2 mr-2 bg-gray-200 border-2 border-black rounded-full"
          style={{ borderColor: theme.themeColor }}
        ></div>
        <h1>{currUserData.username}</h1>
      </motion.div>
      {isDropdownVisible && (
        <>
          <OverlayInvisible className="z-10" onClick={() => setIsDropdownVisible(false)} />
          <UserSettingsDropdown />
        </>
      )}
    </>
  );
}
