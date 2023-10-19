"use client";
import { useEffect } from "react";
import { nbmST } from "@/utils/types";
import { useNFCalcEntradaContext } from "@/context/NFCalcEntradaContext";
import ClientesList from "./ClientesList";
import { useSession } from "next-auth/react";
import LoadingSkeleton from "../layout/LoadingSkeleton";
import Unathorized from "@/app/(noMenu)/auth/Unathorized";

interface props {
  nbmsst: nbmST[];
}

export default function ClientesTab() {
  const { openTab } = useNFCalcEntradaContext();
  const { status } = useSession();

  function getTabUrl() {
    switch (openTab) {
      case 1:
        return "Lista";
        break;
      case 2:
        return "Notas";
        break;
      case 3:
        return "Itens";
        break;
      case 4:
        return "Totais";
      default:
        return "?";
        break;
    }
  }

  return (
    <div>
      <div className="flex space-x-1 ml-3">
        <div>
          <span className="flex-1 inline-block whitespace-nowrap rounded-full bg-red-900 px-[0.65em] pt-[0.35em] pb-[0.30em] text-center align-middle text-[0.65em] font-semibold leading-none text-neutral-50">
            Clientes
          </span>
        </div>
        <div>
          <span className="inline-block whitespace-nowrap rounded-full bg-green-800 px-[0.65em] pt-[0.35em] pb-[0.30em] text-center align-middle text-[0.65em] font-semibold leading-none text-neutral-50">
            {getTabUrl()}
          </span>
        </div>
      </div>
      {status === "authenticated" && (
        <div className="w-full">
          <div className="relative flex flex-col min-w-0 break-words w-full rounded">
            <div className="px-4 py-5 flex-auto">
              <div className="tab-content tab-space">
                <div className={openTab === 1 ? "block" : "hidden"} id="link1">
                  <ClientesList />
                </div>
                <div className={openTab === 2 ? "block" : "hidden"} id="link2">
                  {}
                </div>
                <div className={openTab === 3 ? "block" : "hidden"} id="link3">
                  {}
                </div>
                <div className={openTab === 4 ? "block" : "hidden"} id="link4">
                  {}
                </div>
                <div className={openTab === 5 ? "block" : "hidden"} id="link5">
                  {}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      {status === "loading" && (
        <div className="flex justify-center">
          <LoadingSkeleton model={1} />
        </div>
      )}
      {status === "unauthenticated" && (
        <div className="flex justify-center">
          <Unathorized />
        </div>
      )}
    </div>
  );
}
