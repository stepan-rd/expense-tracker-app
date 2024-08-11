import { Button } from "@/components/Button";
import { Input } from "@/components/Input";
import { Overlay } from "@/components/Overlay";
import { useFirebaseAuth } from "@/state/FirebaseAuth";
import { useThemeStore } from "@/state/ThemeStore";
import React, { useEffect, useRef, useState } from "react";

type Props = {};

export function ChooseUsernamePopup({}: Props) {
  const { theme } = useThemeStore();

  const { currUser, updateUserData } = useFirebaseAuth();

  const [error, setError] = useState("");

  const usernameInputRef = useRef<HTMLInputElement | null>(null);

  async function handleContinueBtnClick() {
    const username = usernameInputRef.current?.value;

    if (username && currUser?.uid) {
      try {
        await updateUserData(currUser.uid, { username });
      } catch (e: any) {
        setError(
          e.message || "Failed to update username please try again later."
        );
        console.error(e);
      }
    } else {
      setError("Username field is empty or the user is not logged in.");
    }
  }

  useEffect(() => {
    if (error) {
      const timeoutId = setTimeout(() => {
        setError("");
      }, 3500);

      return () => {
        clearTimeout(timeoutId);
      };
    }
  }, [error]);

  return (
    <div className="fixed inset-0 flex items-center justify-center w-screen h-screen">
      <Overlay />
      <div
        className="relative z-50 flex flex-col items-center p-6 rounded-lg shadow-lg"
        style={{
          backgroundColor: theme.mainBgColor,
          height: "auto",
          width: "80%",
          maxWidth: "400px",
        }}
      >
        <h1
          className="mb-2 text-2xl font-bold"
          style={{ color: theme.mainTextColor }}
        >
          Welcome!
        </h1>
        <p className="mb-6 text-center" style={{ color: theme.mainTextColor }}>
          Please choose your username to continue
        </p>
        <Input
          ref={usernameInputRef}
          className="w-full mb-4"
          placeholder="Enter your username"
        />
        {error && <h1 className="my-4 text-red-600">{error}</h1>}
        <Button
          onClick={handleContinueBtnClick}
          className="w-full py-2 mt-4 rounded-lg "
        >
          Continue to the App
        </Button>
      </div>
    </div>
  );
}
