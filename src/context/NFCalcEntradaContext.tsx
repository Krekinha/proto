"use client";

import {
  createContext,
  useContext,
  Dispatch,
  SetStateAction,
  useState,
} from "react";
import {
  det,
  INfeGroup,
  ItemsRecSegregada,
  nbmST,
  ncmMonofasico,
  NF,
  NFCalcEntradaTotais,
} from "@/utils/types";

interface INFCalcEntradaContext {
  userId: string;
  openTab: number;
  grpNfes: INfeGroup[];
  selectedNfes: NF[];
  selectedNfe: NF;
  nbmsST: nbmST[];
  ncmsMonofasicos: ncmMonofasico[];
  itemsCFOP: det[];
  prdSTParam: det[];
  prdMonoConfirm: det[];
  prdMonoParam: det[];
  totals: NFCalcEntradaTotais;
  itemsRecSegregada: ItemsRecSegregada;

  setUserId: Dispatch<SetStateAction<string>>;
  setOpenTab: Dispatch<SetStateAction<number>>;
  setSelectedNfes: Dispatch<SetStateAction<NF[]>>;
  setSelectedNfe: Dispatch<SetStateAction<NF>>;
  setGrpNfes: Dispatch<SetStateAction<INfeGroup[]>>;
  setNbmsST: Dispatch<SetStateAction<nbmST[]>>;
  setNcmsMonofasicos: Dispatch<SetStateAction<ncmMonofasico[]>>;
  setItemsCFOP: Dispatch<SetStateAction<det[]>>;
  setPrdSTParam: Dispatch<SetStateAction<det[]>>;
  setPrdMonoConfirm: Dispatch<SetStateAction<det[]>>;
  setPrdMonoParam: Dispatch<SetStateAction<det[]>>;
  setTotals: Dispatch<SetStateAction<NFCalcEntradaTotais>>;
  setItemsRecSegregada: Dispatch<SetStateAction<ItemsRecSegregada>>;
}
const NFCalcEntradaContext = createContext<INFCalcEntradaContext>({
  userId: "",
  openTab: 1,
  grpNfes: [],
  selectedNfes: [],
  selectedNfe: {},
  nbmsST: [],
  ncmsMonofasicos: [],
  itemsCFOP: [],
  prdSTParam: [],
  prdMonoConfirm: [],
  prdMonoParam: [],
  totals: {},
  itemsRecSegregada: {},

  setUserId: (): string => "",
  setOpenTab: (): number => 1,
  setGrpNfes: (): INfeGroup[] => [],
  setSelectedNfes: (): NF[] => [],
  setSelectedNfe: (): NF => {
    return {};
  },
  setNbmsST: (): nbmST[] => [],
  setNcmsMonofasicos: (): ncmMonofasico[] => [],
  setItemsCFOP: (): det[] => [],
  setPrdSTParam: (): det[] => [],
  setPrdMonoConfirm: (): det[] => [],
  setPrdMonoParam: (): det[] => [],
  setTotals: function (value: SetStateAction<NFCalcEntradaTotais>): void {},
  setItemsRecSegregada: function (
    value: SetStateAction<ItemsRecSegregada>
  ): void {},
});

export const NFCalcEntradaContextProvider = ({ children }: any) => {
  const [userId, setUserId] = useState("");
  const [openTab, setOpenTab] = useState(1);
  const [grpNfes, setGrpNfes] = useState<[] | INfeGroup[]>([]);
  const [selectedNfes, setSelectedNfes] = useState<NF[]>([]);
  const [selectedNfe, setSelectedNfe] = useState<NF>({});
  const [nbmsST, setNbmsST] = useState<nbmST[]>([]);
  const [ncmsMonofasicos, setNcmsMonofasicos] = useState<ncmMonofasico[]>([]);
  const [itemsCFOP, setItemsCFOP] = useState<det[]>([]);
  const [prdSTParam, setPrdSTParam] = useState<det[]>([]);
  const [prdMonoConfirm, setPrdMonoConfirm] = useState<det[]>([]);
  const [prdMonoParam, setPrdMonoParam] = useState<det[]>([]);
  const [totals, setTotals] = useState<NFCalcEntradaTotais>({});
  const [itemsRecSegregada, setItemsRecSegregada] = useState<ItemsRecSegregada>(
    {}
  );

  return (
    <NFCalcEntradaContext.Provider
      value={{
        userId,
        openTab,
        grpNfes,
        selectedNfes,
        selectedNfe,
        nbmsST,
        ncmsMonofasicos,
        itemsCFOP,
        prdSTParam,
        prdMonoConfirm,
        prdMonoParam,
        totals,
        itemsRecSegregada,

        setUserId,
        setOpenTab,
        setGrpNfes,
        setSelectedNfes,
        setSelectedNfe,
        setNbmsST,
        setNcmsMonofasicos,
        setItemsCFOP,
        setPrdSTParam,
        setPrdMonoConfirm,
        setPrdMonoParam,
        setTotals,
        setItemsRecSegregada,
      }}
    >
      {children}
    </NFCalcEntradaContext.Provider>
  );
};

export const useNFCalcEntradaContext = () => useContext(NFCalcEntradaContext);
