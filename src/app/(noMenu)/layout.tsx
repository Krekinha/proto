import "@/globals.css";
import React from "react";
import Footer from "../(withMenu)/layout/Footer";
import Providers from "../../context/Providers";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head />
      <body className="bg-gray-600 h-screen flex flex-col">
        <Providers>
          <div className="flex-grow">{children}</div>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
