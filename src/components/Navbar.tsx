import { useThemeStore } from "@/state/ThemeStore";
import { UserProfile } from "./UserProfile";
import DisplayHideNavbarButton from "./DisplayHideNavbarButton";
import { AddEntryButton } from "./AddEntryButton";
import { useEffect, useState } from "react";
import { useGlobalStore } from "@/state/GlobalStore";
import { motion } from "framer-motion";
import { getPaddingLeftBasedOnNavbar } from "@/utils/getPaddingLeftBasedOnNavbar";
import { Overlay } from "./Overlay";

type Props = {};

export function Navbar({}: Props) {
  const { theme } = useThemeStore();

  const {
    setIsAddEntryModalVisible,
    setIsNavbarVisible,
    isNavbarVisible,
    setPagePaddingLeft,
  } = useGlobalStore();


  const [isNavbarOverlayVisible, setIsNavbarOverlayVisible] = useState(false);
  const [openOnLgScreenEnter, setOpenOnLgScreenEnter] = useState(false);


  // handle navbar visibility, on screen resizing and animations.
  useEffect(() => {
    setPagePaddingLeft(getPaddingLeftBasedOnNavbar(isNavbarVisible));

    if (window.innerWidth <= 850) {
      setIsNavbarOverlayVisible(isNavbarVisible);
    }

    // hide navbar if the screen size is md or smaller
    const handleResize = () => {
      if (window.innerWidth <= 850) {
        setIsNavbarVisible(false);
        setOpenOnLgScreenEnter(true);
        setIsNavbarOverlayVisible(false);
        setPagePaddingLeft(getPaddingLeftBasedOnNavbar(false));
      } else if (openOnLgScreenEnter) {
        setIsNavbarVisible(true);
        setOpenOnLgScreenEnter(false);
      }
    };

    window.addEventListener("resize", handleResize);

    // Cleanup the event listener
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [isNavbarVisible]);

  return (
    <>
      {isNavbarOverlayVisible && (
        <Overlay className="z-10" onClick={() => setIsNavbarVisible(false)} />
      )}
      <motion.div
        className="fixed z-10 h-screen px-4 pt-1 text-sm transition-all duration-500 ease"
        style={{
          color: theme.mainTextColor,
          width: "210px",
          left: isNavbarVisible ? "0px" : "-210px",
          backgroundColor: theme.secondaryBgColor,
        }}
      >
        <div className="flex items-center justify-between mt-2">
          <UserProfile />
          <DisplayHideNavbarButton
            isNavbarVisible={isNavbarVisible}
            onClick={() => setIsNavbarVisible((prev) => !prev)}
          />
        </div>
        <AddEntryButton
          className="mt-3"
          onClick={() => setIsAddEntryModalVisible(true)}
        >
          Add Entry
        </AddEntryButton>
      </motion.div>
    </>
  );
}
