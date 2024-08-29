import { auth, db } from "@/firebase";
import { UserDataType } from "@/types/types";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import { GoogleAuthProvider } from "firebase/auth";
import { doc, getDoc, setDoc, updateDoc } from "firebase/firestore";
import { create } from "zustand";

const initialUserData: UserDataType = {
  username: null,
  entries: [],
  activityLogs: [],
  currency: { symbol: "$", conversionRate: 1 },
};

type Store = {
  currUser: any;
  setCurrUser: (val: any) => void;

  loading: boolean;
  setLoading: (val: boolean) => void;

  error: string;
  setError: (val: string) => void;

  currUserData: UserDataType;
  setCurrUserData: (val: UserDataType) => void;

  registerUser: (email: string, password: string) => Promise<void>;
  loginUser: (email: string, password: string) => Promise<void>;
  signInWithGoogle: () => Promise<void>;
  logoutUser: () => Promise<void>;

  saveUserData: (userId: string, userData: UserDataType) => Promise<void>;
  getUserData: (userId: string) => Promise<UserDataType | null>;
  updateUserData: (
    userId: string,
    updatedData: Partial<UserDataType>
  ) => Promise<void>;
};

export const useFirebaseAuth = create<Store>((set) => ({
  currUser: "",
  setCurrUser: (val) => set(() => ({ currUser: val })),

  loading: true,
  setLoading: (val) => set(() => ({ loading: val })),

  error: "",
  setError: (val) => set(() => ({ error: val })),

  currUserData: {
    ...initialUserData,
  },
  setCurrUserData: (val) => set(() => ({ currUserData: val })),

  registerUser: async (email, password) => {
    try {
      set({ error: "" });
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const userId = userCredential.user.uid;
      set({ currUser: userCredential.user });

      const userRef = doc(db, "users", userId);
      await setDoc(userRef, initialUserData);
    } catch (e: any) {
      set({ error: e.message || "Registration failed" });
      throw new Error(e.message || "Registration failed");
    }
  },

  signInWithGoogle: async () => {
    try {
      set({ error: "" });
      const provider = new GoogleAuthProvider();
      const userCredential = await signInWithPopup(auth, provider);
      const userId = userCredential.user.uid;
      set({ currUser: userCredential.user });

      const userRef = doc(db, "users", userId);
      const docSnap = await getDoc(userRef);

      if (!docSnap.exists()) {
        await setDoc(userRef, initialUserData);
        set({ currUserData: initialUserData });
      } else {
        const userData = docSnap.data() as UserDataType;
        set({ currUserData: userData });
      }
    } catch (e: any) {
      set({ error: e.message || "Authentication failed" });
      throw new Error(e.message || "Authentication failed");
    }
  },

  loginUser: async (email, password) => {
    try {
      set({ error: "" });
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      const userId = userCredential.user.uid;
      set({ currUser: userCredential.user });

      const userRef = doc(db, "users", userId);
      const userDoc = await getDoc(userRef);

      if (userDoc.exists()) {
        const userData = userDoc.data() as UserDataType;
        set({ currUserData: userData });
      }
    } catch (e: any) {
      set({ error: e.message || "Login failed" });
      throw new Error(e.message || "Login failed");
    }
  },

  logoutUser: async () => {
    try {
      await signOut(auth);
      set({ currUser: null });
      set({ currUserData: initialUserData });
    } catch (e: any) {
      set({ error: e.message || "Logout failed" });
      throw new Error(e.message || "Logout failed");
    }
  },

  saveUserData: async (userId: string, userData: UserDataType) => {
    try {
      const userRef = doc(db, "users", userId);
      await setDoc(userRef, userData);
    } catch (e: any) {
      console.error("Error saving user data", e);
      throw new Error(e.message || "Failed to save user data");
    }
  },

  getUserData: async (userId: string) => {
    try {
      const userRef = doc(db, "users", userId);
      const docSnap = await getDoc(userRef);

      if (docSnap.exists()) {
        return docSnap.data() as UserDataType;
      } else {
        console.log("No such document!");
        return null;
      }
    } catch (e: any) {
      console.error("Error retrieving user data", e);
      throw new Error(e.message || "Failed to retrieve user data");
    }
  },

  updateUserData: async (
    userId: string,
    updatedData: Partial<UserDataType>
  ) => {
    try {
      const userRef = doc(db, "users", userId);
      await updateDoc(userRef, updatedData);
      set((state) => ({
        currUserData: { ...state.currUserData, ...updatedData },
      }));
    } catch (e: any) {
      console.error("Error updating user data", e);
      throw new Error(e.message || "Failed to update user data");
    }
  },
}));
