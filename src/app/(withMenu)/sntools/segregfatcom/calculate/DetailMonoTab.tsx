"use client";
import { useNFCalcSaidaContext } from "@/context/NFCalcSaidaContext";
import { useState } from "react";
import { IoMdArrowRoundBack } from "react-icons/io";
import DetailMonoConfirm from "./DetailMonoConfirm";
import DetailMonoParam from "./DetailMonoParam";
import DetailMonoNoParam from "./DetailMonoNoParam";

export default function DetailMonoTab() {
  const { setOpenTab } = useNFCalcSaidaContext();
  const [openTab2, setOpenTab2] = useState(1);

  function unmakeDetail() {
    setOpenTab(4);
  }

  return (
    <div>
      <div className="flex flex-wrap ml-3 mt-3">
        <div className="flex-auto space-x-4 mr-4">
          <div className="inline-block mx-1 justify-start focus:outline-none">
            <ul className="flex mb-0 flex-wrap flex-row" role="tablistB">
              <li className="-mb-px mr-2 last:mr-0 flex-auto text-center">
                <a
                  className={
                    "text-xs font-bold uppercase px-3 py-3 shadow-lg rounded block leading-normal " +
                    (openTab2 === 1
                      ? "text-white bg-green-600 shadow-md shadow-black"
                      : "text-gray-400 shadow-md shadow-gray-900")
                  }
                  onClick={(e) => {
                    e.preventDefault();
                    setOpenTab2(1);
                  }}
                  data-toggle="tab"
                  href="#link1A"
                  role="tablistB"
                >
                  PRDs. Monofásicos (Confirmados)
                </a>
              </li>
              <li className="-mb-px mr-2 last:mr-0 flex-auto text-center">
                <a
                  className={
                    "text-xs font-bold uppercase px-3 py-3 shadow-lg rounded block leading-normal " +
                    (openTab2 === 2
                      ? "text-white bg-green-600 shadow-md shadow-black"
                      : "text-gray-400 shadow-md shadow-gray-900")
                  }
                  onClick={(e) => {
                    e.preventDefault();
                    setOpenTab2(2);
                  }}
                  data-toggle="tab"
                  href="#link2A"
                  role="tablistB"
                >
                  PRDs. Monofásicos (Parametrizados)
                </a>
              </li>
              <li className="-mb-px mr-2 last:mr-0 flex-auto text-center">
                <a
                  className={
                    "text-xs font-bold uppercase px-3 py-3 shadow-lg rounded block leading-normal " +
                    (openTab2 === 3
                      ? "text-white bg-green-600 shadow-md shadow-black"
                      : "text-gray-400 shadow-md shadow-gray-900")
                  }
                  onClick={(e) => {
                    e.preventDefault();
                    setOpenTab2(3);
                  }}
                  data-toggle="tab"
                  href="#link3A"
                  role="tablistB"
                >
                  PRDs. Monofásicos (Não-Parametrizados)
                </a>
              </li>
            </ul>
          </div>

          <div className="inline-flex justify-end">
            <button
              type="button"
              onClick={() => {
                unmakeDetail();
              }}
              className="bg-violet-600 disabled:bg-gray-600 text-white disabled:text-gray-400 active:bg-violet-800 hover:bg-violet-700 font-bold uppercase px-2 py-2 rounded-full shadow-md hover:shadow-lg  focus:shadow-lg focus:bg-violet-700 ease-linear transition-all duration-150"
            >
              <IoMdArrowRoundBack />
            </button>
          </div>
        </div>
      </div>
      <div className="w-full">
        <div className="relative mt-2 flex flex-col min-w-0 break-words w-full rounded">
          <div className=" flex-auto">
            <div className="tab-content tab-space">
              <div className={openTab2 === 1 ? "block" : "hidden"} id="link1A">
                <DetailMonoConfirm />
              </div>
              <div className={openTab2 === 2 ? "block" : "hidden"} id="link2A">
                <DetailMonoParam />
              </div>
              <div className={openTab2 === 3 ? "block" : "hidden"} id="link3A">
                <DetailMonoNoParam />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
