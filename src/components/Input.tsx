import { useThemeStore } from "@/state/ThemeStore";
import { forwardRef } from "react";
import "@/styles/styles.css";

type Props = {
  disabled?: boolean;
  type?: string;
  placeholder?: string;
  className?: string;
  min?: number;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  value?: string | number;
  onFocus?: () => void;
  onBlur?: () => void;
  style?: React.CSSProperties
};

const Input = forwardRef<HTMLInputElement, Props>(
  (
    {
      disabled,
      type = "text",
      placeholder,
      className,
      min,
      onChange,
      value,
      onFocus,
      onBlur,
      style
    },
    ref
  ) => {
    const { theme } = useThemeStore();

    return (
      <input
        disabled={disabled}
        onBlur={onBlur}
        onFocus={onFocus}
        value={value}
        onChange={(e) => {
          onChange ? onChange(e) : null;
        }}
        min={min}
        ref={ref}
        className={`outline-none rounded-md px-2 py-1 ${disabled && "cursor-not-allowed"} ${className}`}
        style={{
          backgroundColor: theme.mainBgColor,
          color: disabled ? theme.secondaryTextColor : theme.mainTextColor,
          ...style
        }}
        type={type}
        placeholder={placeholder}
      />
    );
  }
);

Input.displayName = "Input"; // Optional, helps with debugging

export { Input };
