import React from "react";

type Props = {
  onClick?: () => void;
  className?: string;
};

export function OverlayInvisible({ onClick, className }: Props) {
  return (
    <div
      onClick={onClick}
      className={`fixed inset-0 h-screen w-screen ${className}`}
    ></div>
  );
}
