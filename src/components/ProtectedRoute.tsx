import { useFirebaseAuth } from "@/state/FirebaseAuth";
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

type Props = {
  children: React.ReactNode;
};

export function ProtectedRoute({ children }: Props) {
  const navigate = useNavigate();

  const { loading, currUser } = useFirebaseAuth();

  useEffect(() => {
    if (!currUser && !loading) {
      navigate("/login");
      return;
    }
  }, [currUser, navigate, loading]);

  if (loading) {
    return <h1>...Loading</h1>;
  }

  if (currUser) {
    return <>{children}</>
  }

  return null
}
