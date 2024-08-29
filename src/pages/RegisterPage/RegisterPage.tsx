import { Button } from "@/components/Button";
import { GoogleCardSignIn } from "@/components/GoogleCardSignIn";
import { Input } from "@/components/Input";
import { useFirebaseAuth } from "@/state/FirebaseAuth";
import { useThemeStore } from "@/state/ThemeStore";
import "@/styles/styles.css";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

type Props = {};

export function RegisterPage({}: Props) {
  const navigate = useNavigate();

  const { theme } = useThemeStore();

  const { registerUser, signInWithGoogle, error, setError } =
    useFirebaseAuth();

  const [loading, setLoading] = useState(false);

  const emailInputRef = useRef<HTMLInputElement | null>(null);
  const passwordInputRef = useRef<HTMLInputElement | null>(null);
  const retypedPasswordInputRef = useRef<HTMLInputElement | null>(null);

  async function handleRegister() {
    const email = emailInputRef.current?.value || "";
    const password = passwordInputRef.current?.value || "";
    const retypedPassword = retypedPasswordInputRef.current?.value || "";

    if (password !== retypedPassword) {
      setError("Passwords do not match !");
      return;
    }

    if (!email.includes("@") || !email.includes(".")) {
      setError("Invalid email !");
      return;
    }

    try {
      setLoading(true);
      await registerUser(email, password);
      navigate("/app/dashboard");
    } catch (e: any) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  }

  async function handleGoogleRegister() {
    try {
      setLoading(true);
      await signInWithGoogle();
      navigate("/app/dashboard");
    } catch (e: any) {
      console.log(e)
      setError(e.message)
    } finally {
      setLoading(false);
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
    <div
      className="fixed inset-0 flex items-center justify-center w-screen h-screen endless-clouds-bg"
      style={{ backgroundColor: theme.mainBgColor, color: theme.mainTextColor }}
    >
      <div
        className="flex flex-col font-alexandria"
        style={{ backgroundColor: theme.mainBgColor, width: "300px" }}
      >
        <h1 className="mb-4 text-3xl font-bold" style={{}}>
          Register
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
        <Input
          type="password"
          placeholder="Repeat password"
          className="mb-4 border"
          ref={retypedPasswordInputRef}
        />
        {error && <h1 className="mb-4 text-red-600">{error}</h1>}
        <h1 className="flex items-center w-full mb-4">
          Already registered?&nbsp;
          <span
            className="underline hover:cursor-pointer"
            onClick={() => navigate("/login")}
          >
            Login
          </span>
        </h1>
        <Button disabled={loading} onClick={handleRegister}>
          Register
        </Button>
        <hr className="mt-4"/>
        <GoogleCardSignIn
          className="mt-5"
          onClick={handleGoogleRegister}
          text={"Register with Google"}
        />
      </div>
      <div></div>
    </div>
  );
}
