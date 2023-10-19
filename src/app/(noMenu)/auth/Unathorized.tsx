"use client";
import { useSession } from "next-auth/react";
import Signin from "./Signin";

export default function Unathorized() {
  const { status } = useSession();

  return (
    <>
      <div className="flex mx-4 w-max justify-center">
        <div className="flex flex-col mt-3 py-5 px-3 items-center rounded-lg shadow-lg shadow-black bg-red-900">
          <span className="text-gray-300 mb-2">
            Você precisa estar logado para ter acesso a essa página
          </span>
          <Signin />
        </div>
      </div>
    </>
  );
}
