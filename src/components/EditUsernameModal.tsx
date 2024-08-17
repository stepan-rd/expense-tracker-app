import { useThemeStore } from "@/state/ThemeStore";
import { Input } from "./Input";
import { Overlay } from "./Overlay";
import { Button } from "./Button";
import { useState } from "react";
import { useFirebaseAuth } from "@/state/FirebaseAuth";

type Props = { className?: string; overlayOnClick: () => void };

export function EditUsernameModal({ className, overlayOnClick }: Props) {
  const { theme } = useThemeStore();

  const { currUserData, updateUserData, currUser } = useFirebaseAuth();

  const [newUsername, setNewUsername] = useState("");

  async function handleSaveBtnClick() {
    if (newUsername) {
      try {
        const updatedUserData = { ...currUserData, username: newUsername };
        await updateUserData(currUser.uid, updatedUserData);
      } catch (e: any) {
        console.error("Failed to update username", e);
      }
    }

    overlayOnClick();
  }

  return (
    <>
      <div className="fixed inset-0 z-10 flex items-center justify-center w-screen h-screen">
        <Overlay className="z-10" onClick={overlayOnClick} />
        <div
          className={`shadow-md py-4 w-5/12 flex justify-center flex-col px-4 z-10 rounded-lg ${className}`}
          style={{ backgroundColor: theme.mainBgColor }}
        >
          <h1 className="px-2 my-2 text-sm font-bold">
            Enter your new username:
          </h1>
          <Input
            placeholder="Username"
            onChange={(e) => setNewUsername(e.target.value)}
            value={newUsername}
          ></Input>
          <div className="my-2">
            <Button
              className="mr-2"
              onClick={overlayOnClick}
              hoverColor={theme.hoverElementBgColor}
              style={{
                backgroundColor: theme.secondaryBgColor,
                color: theme.mainTextColor,
              }}
            >
              Cancel
            </Button>
            <Button onClick={handleSaveBtnClick}>Save</Button>
          </div>
        </div>
      </div>
    </>
  );
}
