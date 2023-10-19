"use client";
import { signIn } from "next-auth/react";
import React from "react";

export default function Signin() {
  return (
    <div>
      <button
        type="button"
        onClick={() => signIn()}
        className="bg-green-600 disabled:bg-gray-600 text-white disabled:text-gray-400 active:bg-green-800 hover:bg-green-700 
        font-semibold rounded shadow-md hover:shadow-lg focus:shadow-lg focus:bg-green-700 ease-linear transition-all 
        cursor-pointer duration-150 px-4 py-1"
      >
        Entrar
      </button>
    </div>
  );
}
