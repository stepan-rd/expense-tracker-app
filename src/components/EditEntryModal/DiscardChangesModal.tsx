import React from "react";
import { Button } from "../Button";
import { useThemeStore } from "@/state/ThemeStore";
import { Overlay } from "../Overlay";

type Props = {
  handleDiscardChangesBtnClick: () => void;
  setDiscardChangesModalVisible: React.Dispatch<React.SetStateAction<boolean>>
};

export function DiscardChangesModal({ handleDiscardChangesBtnClick, setDiscardChangesModalVisible }: Props) {
  const { theme } = useThemeStore();

  return (
    <>
      <Overlay className="z-10" />
      <div
        className="absolute z-10 w-3/4 p-4 text-sm -translate-x-1/2 -translate-y-1/2 rounded-lg shadow-md top-1/4 left-1/2"
        style={{ backgroundColor: theme.mainBgColor, height: "140px" }}
      >
        <h1 className="mb-2 text-base">Discard changes?</h1>
        <h1 className="mb-2" style={{ color: theme.secondaryTextColor }}>
          The changes you've made won't be saved.
        </h1>
        <div className="relative flex flex-grow w-full">
          <div className="absolute top-3 right-1">
            <Button
              onClick={() => setDiscardChangesModalVisible(false)}
              className="mr-2"
              style={{
                backgroundColor: theme.secondaryBgColor,
                color: theme.mainTextColor,
              }}
            >
              Cancel
            </Button>
            <Button onClick={handleDiscardChangesBtnClick}>Discard</Button>
          </div>
        </div>
      </div>
    </>
  );
}
