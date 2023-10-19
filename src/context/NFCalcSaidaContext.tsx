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
  SegregFaturamentoTotais,
} from "@/utils/types";

interface INFCalcSaidaContext {
  userId: string;
  openTab: number;
  grpNfes: INfeGroup[];
  selectedNfes: NF[];
  selectedNfe: NF;
  nbmsST: nbmST[];
  ncmsMonofasicos: ncmMonofasico[];
  prdSTConfirm: det[];
  prdSTParam: det[];
  prdMonoConfirm: det[];
  prdMonoParam: det[];
  totals: SegregFaturamentoTotais;
  itemsRecSegregada: ItemsRecSegregada;
  itemsCFOP: det[];

  setUserId: Dispatch<SetStateAction<string>>;
  setOpenTab: Dispatch<SetStateAction<number>>;
  setSelectedNfes: Dispatch<SetStateAction<NF[]>>;
  setSelectedNfe: Dispatch<SetStateAction<NF>>;
  setGrpNfes: Dispatch<SetStateAction<INfeGroup[]>>;
  setNbmsST: Dispatch<SetStateAction<nbmST[]>>;
  setNcmsMonofasicos: Dispatch<SetStateAction<ncmMonofasico[]>>;
  setPrdSTConfirm: Dispatch<SetStateAction<det[]>>;
  setPrdSTParam: Dispatch<SetStateAction<det[]>>;
  setPrdMonoConfirm: Dispatch<SetStateAction<det[]>>;
  setPrdMonoParam: Dispatch<SetStateAction<det[]>>;
  setTotals: Dispatch<SetStateAction<SegregFaturamentoTotais>>;
  setItemsRecSegregada: Dispatch<SetStateAction<ItemsRecSegregada>>;
  setItemsCFOP: Dispatch<SetStateAction<det[]>>;
}
const NFCalcSaidaContext = createContext<INFCalcSaidaContext>({
  userId: "",
  openTab: 1,
  grpNfes: [],
  selectedNfes: [],
  selectedNfe: {},
  nbmsST: [],
  ncmsMonofasicos: [],
  prdSTConfirm: [],
  prdSTParam: [],
  prdMonoConfirm: [],
  prdMonoParam: [],
  totals: {},
  itemsRecSegregada: {},
  itemsCFOP: [],

  setUserId: (): string => "",
  setOpenTab: (): number => 1,
  setGrpNfes: (): INfeGroup[] => [],
  setSelectedNfes: (): NF[] => [],
  setSelectedNfe: (): NF => {
    return {};
  },
  setNbmsST: (): nbmST[] => [],
  setNcmsMonofasicos: (): ncmMonofasico[] => [],
  setPrdSTConfirm: (): det[] => [],
  setPrdSTParam: (): det[] => [],
  setPrdMonoConfirm: (): det[] => [],
  setPrdMonoParam: (): det[] => [],
  setTotals: function (value: SetStateAction<SegregFaturamentoTotais>): void {},
  setItemsRecSegregada: function (
    value: SetStateAction<ItemsRecSegregada>
  ): void {},
  setItemsCFOP: (): det[] => [],
});

export const NFCalcSaidaContextProvider = ({ children }: any) => {
  const [userId, setUserId] = useState("");
  const [openTab, setOpenTab] = useState(1);
  const [grpNfes, setGrpNfes] = useState<[] | INfeGroup[]>([]);
  const [selectedNfes, setSelectedNfes] = useState<NF[]>([]);
  const [selectedNfe, setSelectedNfe] = useState<NF>({});
  const [nbmsST, setNbmsST] = useState<nbmST[]>([]);
  const [ncmsMonofasicos, setNcmsMonofasicos] = useState<ncmMonofasico[]>([]);
  const [prdSTConfirm, setPrdSTConfirm] = useState<det[]>([]);
  const [prdSTParam, setPrdSTParam] = useState<det[]>([]);
  const [prdMonoConfirm, setPrdMonoConfirm] = useState<det[]>([]);
  const [prdMonoParam, setPrdMonoParam] = useState<det[]>([]);
  const [totals, setTotals] = useState<SegregFaturamentoTotais>({});
  const [itemsRecSegregada, setItemsRecSegregada] = useState<ItemsRecSegregada>(
    {}
  );
  const [itemsCFOP, setItemsCFOP] = useState<det[]>([]);

  return (
    <NFCalcSaidaContext.Provider
      value={{
        userId,
        openTab,
        grpNfes,
        selectedNfes,
        selectedNfe,
        nbmsST,
        ncmsMonofasicos,
        prdSTConfirm,
        prdSTParam,
        prdMonoConfirm,
        prdMonoParam,
        totals,
        itemsRecSegregada,
        itemsCFOP,

        setUserId,
        setOpenTab,
        setGrpNfes,
        setSelectedNfes,
        setSelectedNfe,
        setNbmsST,
        setNcmsMonofasicos,
        setPrdSTConfirm,
        setPrdSTParam,
        setPrdMonoConfirm,
        setPrdMonoParam,
        setTotals,
        setItemsRecSegregada,
        setItemsCFOP,
      }}
    >
      {children}
    </NFCalcSaidaContext.Provider>
  );
};

export const useNFCalcSaidaContext = () => useContext(NFCalcSaidaContext);
