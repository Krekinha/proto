"use client"
import Backbar from "@/app/(withMenu)/layout/Backbar";
import { useSNToolsContext } from "@/context/SNToolsContext";
import { nbmST } from "@/utils/types";
import CardCFOP from "./CardCFOP";
import CardSegreg from "./CardSegreg";
import CardSomaNotas from "./CardSomaNotas";

interface props {
  nbmsst: nbmST[];
  isLoadingNbms: boolean;
}

export default function HomeCalculate( { nbmsst, isLoadingNbms }: props) {
  const { setOpenTab, openTab } = useSNToolsContext();

  const unmakeCalculate = async () => {
    setOpenTab( 2);
  };

  return (
    <div className="flex flex-col">
      <div className="flex justify-end mr-4">
        <Backbar handleBack={unmakeCalculate} />
      </div>

      <div className="flex mt-3 gap-3 max-sm:flex-col">
        <div className="flex-col space-y-3">
          {/*CARD SOMA NOTAS*/}
          <div>
            <CardSomaNotas />
          </div>
          {/*CARD CFOP*/}
          <div>
            <CardCFOP />
          </div>
        </div>
        {/*CARD SEGREGACAO*/}
        <div className="">
          <CardSegreg nbmsst={nbmsst} isLoadingNbms={isLoadingNbms}/>
        </div>
      </div>
    </div>
  );
}
