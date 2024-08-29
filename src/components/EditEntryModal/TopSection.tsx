import { EditModalSettingsDropdown } from "@/components/EditEntryModal/EditModalSettingsDropdown";
import { OverlayInvisible } from "@/components/OverlayInvisible";
import { useThemeStore } from "@/state/ThemeStore";
import { useState } from "react";

type Props = {
  closeModal: () => void;
};

export function TopSection({ closeModal }: Props) {

  const {theme} = useThemeStore();

  const [settingsDropdownVisible, setSettingsDropdownVisible] = useState(false);
  return (
    <div className="relative flex items-center h-6">
      <svg
        className="absolute cursor-pointer right-9"
        onClick={() => setSettingsDropdownVisible(true)}
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        style={{color: theme.mainTextColor}}
      >
        <g
          fill="none"
          stroke="currentColor"
          stroke-linecap="round"
          transform="translate(3 10)"
        >
          <circle cx="2" cy="2" r="2"></circle>
          <circle cx="9" cy="2" r="2"></circle>
          <circle cx="16" cy="2" r="2"></circle>
        </g>
      </svg>
      <svg
        style={{color: theme.mainTextColor}}
        onClick={() => closeModal()}
        className="absolute cursor-pointer right-2"
        width="20"
        height="20"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="currentColor"
      >
        <path
          fillRule="evenodd"
          d="M5.47 5.47a.75.75 0 0 1 1.06 0L12 10.94l5.47-5.47a.75.75 0 1 1 1.06 1.06L13.06 12l5.47 5.47a.75.75 0 1 1-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 0 1-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 0 1 0-1.06Z"
          clipRule="evenodd"
        />
      </svg>
      {settingsDropdownVisible && (
        <>
          <OverlayInvisible
            className="z-10"
            onClick={() => setSettingsDropdownVisible(false)}
          />
          <EditModalSettingsDropdown
            className="absolute z-10 right-8 top-5"
            closeModal={closeModal}
          />
        </>
      )}
    </div>
  );
}
