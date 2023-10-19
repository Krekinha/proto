"use client";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";

export default function Page() {
  const { data: session, status } = useSession();

  console.log(session);

  if (status === "loading") {
    return <h1 className="text-3xl font-bold">Carregando!</h1>;
  }

  if (status === "authenticated") {
    return (
      <div>
        <div className="flex justify-start ml-3 mt-3 max-sm:flex-col max-sm:items-center gap-2">
          <h1>BEM VINDO!</h1>
        </div>
      </div>
    );
  }

  if (status === "unauthenticated") {
    redirect("/auth");
  }
}
