"use client";
import HomeCalculate from "./calculate/HomeCalculate";
import DetailNotas from "./DetailNotas";
import DetailItens from "./DetailItens";
import Upload from "./Upload";
import DetailSTTab from "./calculate/DetailSTTab";
import DetailMonoTab from "./calculate/DetailMonoTab";
import useSWR from "swr";
import { baseUrl } from "@/utils/constants";
import DetailCFOP from "./calculate/DetailCFOP";
import { useSNToolsContext } from "@/context/SNToolsContext";

const fetcher = async (url: string) =>
  await fetch(url).then((res) => res.json());

export default function Page() {
  const { openTab } = useSNToolsContext(); //useNFCalcSaidaContext();
  const { data, isLoading } = useSWR(`${baseUrl()}/api/nbm-st/list`, fetcher);

  /*const monoData = useSWR(`${baseUrl()}/api/monofasicos/list`, fetcher);
  const monos: ncmMonofasico[] = monoData.data?.ncm;*/

  return (
    <div>
      <div className="w-full">
        <div className="relative flex flex-col min-w-0 break-words w-full rounded">
          <div className="px-4 py-5 flex-auto">
            <div className="tab-content tab-space">
              <div className={openTab === 1 ? "block" : "hidden"} id="link1">
                <Upload nbmsst={data?.nbms} isLoadingNbms={isLoading} />
              </div>
              <div className={openTab === 2 ? "block" : "hidden"} id="link2">
                <DetailNotas />
              </div>
              <div className={openTab === 3 ? "block" : "hidden"} id="link3">
                <DetailItens />
              </div>
              <div className={openTab === 4 ? "block" : "hidden"} id="link4">
                <HomeCalculate nbmsst={data?.nbms} isLoadingNbms={isLoading} />
              </div>
              <div className={openTab === 5 ? "block" : "hidden"} id="link5">
                <DetailSTTab />
              </div>
              <div className={openTab === 6 ? "block" : "hidden"} id="link6">
                <DetailMonoTab />
              </div>
              <div className={openTab === 7 ? "block" : "hidden"} id="link7">
                <DetailCFOP />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
