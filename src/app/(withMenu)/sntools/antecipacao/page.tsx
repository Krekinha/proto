"use client";
import Upload from "./Upload";
import { useSNToolsContext } from "@/context/SNToolsContext";
import DetailNotas from "./DetailNotas";
import useSWR from "swr";
import DetailItens from "./DetailItens";
import AntecipacaoCalculate from "./calculate/AntecipacaoCalculate";
import { ToastContainer } from "react-toastify";
import { baseUrl } from "@/utils/constants";

const fetcher = async (url: string) =>
  await fetch(url).then((res) => res.json());

export default function Page() {
  const { openTab } = useSNToolsContext();
  const { data, isLoading } = useSWR(`${baseUrl()}/api/nbm-st/list`, fetcher);
  return (
    <div>
      <ToastContainer icon={false} style={{ width: "max-content" }} />

      <div className="w-full">
        <div className="relative flex flex-col min-w-0 break-words w-full rounded">
          <div className="px-4 py-5 flex-auto">
            <div className="tab-content tab-space">
              <div className={openTab === 1 ? "block" : "hidden"} id="link1">
                <Upload nbmsst={data?.nbms} isLoadingNbms={isLoading} />
              </div>
              <div className={openTab === 2 ? "block" : "hidden"} id="link2">
                <DetailNotas nbmsst={data?.nbms} />
              </div>
              <div className={openTab === 3 ? "block" : "hidden"} id="link3">
                <DetailItens />
              </div>
              <div className={openTab === 4 ? "block" : "hidden"} id="link4">
                <AntecipacaoCalculate />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
