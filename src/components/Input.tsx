import { useThemeStore } from "@/state/ThemeStore";
import { forwardRef, Ref } from "react";
import "@/styles/styles.css";

type Props = {
  type?: string;
  placeholder?: string;
  className?: string;
  min?: number;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  value?: string;
};

const Input = forwardRef<HTMLInputElement, Props>(
  ({ type = "text", placeholder, className, min, onChange, value }, ref) => {
    const { theme } = useThemeStore();

    return (
      <input
        value={value}
        onChange={(e) => {
          onChange ? onChange(e) : null;
        }}
        min={min}
        ref={ref}
        className={`outline-none rounded-md px-2 py-1 ${className}`}
        style={{
          borderColor: theme.secondaryBorderColor,
          color: theme.mainTextColor,
        }}
        type={type}
        placeholder={placeholder}
      />
    );
  }
);

Input.displayName = "Input"; // Optional, helps with debugging

export { Input };
