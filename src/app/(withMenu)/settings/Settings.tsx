"use client";
import { useSettingsContext } from "@/context/SettingsContext";
import { baseUrl } from "@/utils/constants";
import { nbmST, ncmMonofasico } from "@/utils/types";
import { useEffect } from "react";
import SettingsAplicacaoST from "./SettingsAplicacaoST";
import SettingsCapitulosST from "./SettingsCapitulosST";
import SettingsMonofasicos from "./SettingsMonofasicos";
import SettingsNbmST from "./SettingsNbmST";

interface Isettings {
  nbmsst: nbmST[];
  ncmsmonofasicos: ncmMonofasico[];
}

export default function Settings({ nbmsst, ncmsmonofasicos }: Isettings) {
  const { openTab, nbmsST, setOpenTab, setNbmsST, setNcmsMonofasicos } = useSettingsContext();

  useEffect(() => {
    setNbmsST(nbmsst);
    setNcmsMonofasicos(ncmsmonofasicos);
  });

  return (
    <div>
      <div className="flex flex-wrap ml-3 mt-3">
        <div>
          <div className="mx-1 inline-block focus:outline-none">
            <ul className="flex mb-0 flex-wrap flex-row" role="tablist">
              <li className="-mb-px mr-2 last:mr-0 flex-auto text-center">
                <a
                  className={
                    "text-xs font-bold uppercase px-3 py-3 shadow-lg rounded block leading-normal " +
                    (openTab === 1
                      ? "text-white bg-green-600 shadow-md shadow-black"
                      : "text-gray-400 shadow-md shadow-gray-900")
                  }
                  onClick={(e) => {
                    e.preventDefault();
                    setOpenTab(1);
                  }}
                  data-toggle="tab"
                  href="#link1"
                  role="tablist"
                >
                  NBMs. ST
                </a>
              </li>
              
              <li className="-mb-px mr-2 last:mr-0 flex-auto text-center">
                <a
                  className={
                    "text-xs font-bold uppercase px-3 py-3 shadow-lg rounded block leading-normal " +
                    (openTab === 2
                      ? "text-white bg-green-600 shadow-md shadow-black"
                      : "text-gray-400 shadow-md shadow-gray-900")
                  }
                  onClick={(e) => {
                    e.preventDefault();
                    setOpenTab(2);
                  }}
                  data-toggle="tab"
                  href="#link2"
                  role="tablist"
                >CAPITULOS ST
                </a>
              </li>

              <li className="-mb-px mr-2 last:mr-0 flex-auto text-center">
                <a
                  className={
                    "text-xs font-bold uppercase px-3 py-3 shadow-lg rounded block leading-normal " +
                    (openTab === 3
                      ? "text-white bg-green-600 shadow-md shadow-black"
                      : "text-gray-400 shadow-md shadow-gray-900")
                  }
                  onClick={(e) => {
                    e.preventDefault();
                    setOpenTab(3);
                  }}
                  data-toggle="tab"
                  href="#link3"
                  role="tablist"
                >APLICAÇÕES ST
                </a>
              </li>

              <li className="-mb-px mr-2 last:mr-0 flex-auto text-center">
                <a
                  className={
                    "text-xs font-bold uppercase px-3 py-3 shadow-lg rounded block leading-normal " +
                    (openTab === 4
                      ? "text-white bg-green-600 shadow-md shadow-black"
                      : "text-gray-400 shadow-md shadow-gray-900")
                  }
                  onClick={(e) => {
                    e.preventDefault();
                    setOpenTab(4);
                  }}
                  data-toggle="tab"
                  href="#link4"
                  role="tablist"
                >
                  MONOFÁSICOS
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div className="w-full">
        <div className="relative mt-2 flex flex-col min-w-0 break-words w-full rounded">
          <div className="px-4 flex-auto">
            <div className="tab-content tab-space">
              <div className={openTab === 1 ? "block" : "hidden"} id="link1">
                <SettingsNbmST />
              </div>
              <div className={openTab === 2 ? "block" : "hidden"} id="link2">
                <SettingsCapitulosST />
              </div>
              <div className={openTab === 3 ? "block" : "hidden"} id="link3">
                <SettingsAplicacaoST />
              </div>
              <div className={openTab === 4 ? "block" : "hidden"} id="link4">
                <SettingsMonofasicos />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

