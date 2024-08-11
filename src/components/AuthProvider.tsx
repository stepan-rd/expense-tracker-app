import { auth, db } from "@/firebase";
import { useFirebaseAuth } from "@/state/FirebaseAuth";
import { UserDataType } from "@/types/types";
import { onAuthStateChanged } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { useEffect } from "react";

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const { setCurrUser, setLoading, setCurrUserData } = useFirebaseAuth();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setLoading(true);

      if (user) {
        setCurrUser(user);

        try {
          const userRef = doc(db, "users", user.uid);
          const userDoc = await getDoc(userRef);

          if (userDoc.exists()) {
            setCurrUserData(userDoc.data() as UserDataType);
          } else {
            console.log("No user data found.");
          }
        } catch (e: any) {
          console.error(e.message || "Error fetch user data", e);
        }
      } else {
        setCurrUser(null);
        setCurrUserData({
          username: null,
          totalExpenses: 0,
          totalIncome: 0,
          logHistory: [],
        });
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, [setCurrUser, setLoading, setCurrUserData]);

  return <>{children}</>;
}
