import React from "react";

export function PaddingContainer({ children }) {
  return (
    <div className="w-full max-w-[1420px] mx-auto px-[25px] md:px-[100px]">
      {children}
    </div>
  );
}
