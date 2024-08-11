import { Button } from "@/components/Button";
import { GoogleCardSignIn } from "@/components/GoogleCardSignIn";
import { Input } from "@/components/Input";
import { useFirebaseAuth } from "@/state/FirebaseAuth";
import { useThemeStore } from "@/state/ThemeStore";
import "@/styles/styles.css";
import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

type Props = {};

export function LoginPage({}: Props) {
  const navigate = useNavigate();

  const { theme } = useThemeStore();

  const { error, setError, loginUser, signInWithGoogle, saveUserData, currUser, currUserData } = useFirebaseAuth();

  const [loading, setLoading] = useState(false);

  const emailInputRef = useRef<HTMLInputElement | null>(null);
  const passwordInputRef = useRef<HTMLInputElement | null>(null);

  async function handleLogin() {
    const email = emailInputRef.current?.value || "";
    const password = passwordInputRef.current?.value || "";

    setError("");

    if (!email.includes("@") || !email.includes(".")) {
      setError("Invalid email !");
      return;
    }

    if (password.length < 7) {
      setError("Password must be longer than 6 characters !");
      return;
    }

    try {
      setLoading(true);
      await loginUser(email, password);
      navigate("/app/dashboard");
    } catch (e: any) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  }

  async function handleGoogleLogin() {
    try {
      setLoading(true);
      await signInWithGoogle();
      navigate("/app/dashboard");
    } catch (e: any) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div
      className="fixed inset-0 flex items-center justify-center w-screen h-screen endless-clouds-bg"
      style={{ backgroundColor: theme.mainBgColor }}
    >
      <div
        className="flex flex-col font-alexandria"
        style={{ backgroundColor: theme.secondaryBgColor, width: "300px" }}
      >
        <h1 className="mb-4 text-3xl font-bold" style={{}}>
          Login
        </h1>
        <Input
          type="email"
          placeholder="Email"
          className="mb-4 border"
          ref={emailInputRef}
        />
        <Input
          type="password"
          placeholder="Password"
          className="mb-4 border"
          ref={passwordInputRef}
        />
        {error && <h1 className="mb-4 text-red-600">{error}</h1>}
        <h1 className="flex items-center w-full mb-4">
          Don't have an account?&nbsp;
          <span
            className="underline hover:cursor-pointer"
            onClick={() => navigate("/register")}
          >
            Register
          </span>
        </h1>
        <Button disabled={loading} onClick={handleLogin}>
          Login
        </Button>
        <hr className="mt-4" />
        <GoogleCardSignIn
          className="mt-5"
          text="Login with Google"
          onClick={handleGoogleLogin}
        />
      </div>
      <div></div>
    </div>
  );
}
