import { useFirebaseAuth } from "@/state/FirebaseAuth";
import { useThemeStore } from "@/state/ThemeStore";

type Props = {};

export default function UserProfile({}: Props) {
  const { theme } = useThemeStore();

  const { currUser, currUserData } = useFirebaseAuth();

  return (
    <div className="flex items-center">
      <div
        className="w-4 h-4 p-2 mr-2 bg-gray-200 border-2 border-black rounded-full"
        style={{ borderColor: theme.themeColor }}
      ></div>
      <h1>{currUserData.username}</h1>
    </div>
  );
}
