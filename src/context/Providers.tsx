"use client";
import { SessionProvider } from "next-auth/react";
import { SNToolsContextProvider } from "./SNToolsContext";

export default function Providers({ children }: any) {
  return (
    <SessionProvider>
      <SNToolsContextProvider>{children}</SNToolsContextProvider>
    </SessionProvider>
  );
}
