import { Dropdown } from "./Dropdown";
import { motion } from "framer-motion";
import { useThemeStore } from "@/state/ThemeStore";
import { useFirebaseAuth } from "@/state/FirebaseAuth";
import { useNavigate } from "react-router-dom";
import themes from "@/data/themes.json";
import { useState } from "react";
import { EditUsernameModal } from "./EditUsernameModal";
import { ChangeCurrencyDropdown } from "./ChangeCurrencyDropdown";

const options = ["Change Theme", "Change Username", "Change Currency"];

type Props = { className?: string };

export function UserSettingsDropdown({ className }: Props) {
  const { theme, setTheme, themeName, setThemeName } = useThemeStore();

  const { logoutUser } = useFirebaseAuth();

  const navigate = useNavigate();

  const [isEditingUsername, setIsEditingUsername] = useState(false);
  const [isChangeCurrencyDropdownVisible, setIsChangeCurrencyDropdownVisible] =
    useState(false);

  function handleChangeThemeBtnClick() {
    if (themeName === "light") {
      setTheme(themes.dark);
      setThemeName("dark");
    } else {
      setTheme(themes.light);
      setThemeName("light");
    }
  }

  const dropdownOnClickFunctions = [
    handleChangeThemeBtnClick,
    () => setIsEditingUsername(true),
    () => setIsChangeCurrencyDropdownVisible(true),
  ];

  async function handleLogoutBtnClick() {
    try {
      await logoutUser();
      navigate("/login");
    } catch (e: any) {
      console.error("Logout failed:", e);
    }
  }

  return (
    <>
      <Dropdown className={`top-10 z-10 w-3/4 ${className}`}>
        {options.map((option, i) => (
          <motion.button
            onClick={dropdownOnClickFunctions[i]}
            className={`px-2 py-1 text-left ${i === 0 && "rounded-t-lg"} ${i === options.length - 1 && "rounded-b-lg"}`}
            style={{ backgroundColor: theme.mainBgColor }}
            whileHover={{ backgroundColor: theme.hoverElementBgColor }}
          >
            {option}
          </motion.button>
        ))}
        <hr style={{ borderColor: theme.mainBorderColor }} />
        <motion.button
          onClick={handleLogoutBtnClick}
          className="py-1 text-red-600 rounded-b-lg"
          style={{ backgroundColor: theme.mainBgColor }}
          whileHover={{ backgroundColor: theme.hoverElementBgColor }}
        >
          Logout
        </motion.button>
      </Dropdown>
      {isEditingUsername && (
        <EditUsernameModal
          overlayOnClick={() => setIsEditingUsername(false)}
          className=""
        />
      )}
      {isChangeCurrencyDropdownVisible && (
        <ChangeCurrencyDropdown
          className="absolute z-10 w-32"
          overlayOnClick={() => setIsChangeCurrencyDropdownVisible(false)}
          style={{right: "-91px", top: "98px"}}
        />
      )}
    </>
  );
}
