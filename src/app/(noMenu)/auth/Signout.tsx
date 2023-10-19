"use client";
import { signOut } from "next-auth/react";
import React from "react";

export default function Signout() {
  return (
    <div>
      <button
        type="button"
        onClick={() => signOut()}
        className="py-1 px-2 flex items-center bg-gray-800 
                 hover:bg-gray-700 text-white transition 
                 text-center shadow-md rounded-lg "
      >
        Sair
      </button>
    </div>
  );
}
