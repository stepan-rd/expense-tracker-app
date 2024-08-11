import { useThemeStore } from "@/state/ThemeStore";
import UserProfile from "./UserProfile";
import DisplayHideNavbarButton from "./DisplayHideNavbarButton";
import { useFirebaseAuth } from "@/state/FirebaseAuth";
import { AddEntryButton } from "./AddEntryButton";
import { useState } from "react";
import { Dropdown } from "./Dropdown";
import { useGlobalStore } from "@/state/GlobalStore"
import { motion } from "framer-motion";

type Props = {};

export function Navbar({}: Props) {
  const { theme } = useThemeStore();

  const { currUserData } = useFirebaseAuth();

  const { setIsAddEntryModalVisible } =
    useGlobalStore();


  return (
    <div
      className="px-4 pt-1"
      style={{ width: "210px", backgroundColor: theme.secondaryBgColor }}
    >
      <div className="flex justify-between p-1 mt-2">
        <UserProfile />
        <DisplayHideNavbarButton />
      </div>
      <AddEntryButton
        className="mt-3"
        onClick={() => setIsAddEntryModalVisible(true)}
      >
        Add
      </AddEntryButton>
    </div>
  );
}
