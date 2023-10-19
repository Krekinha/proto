"use client";

import {
  det,
  INfeGroup,
  nbmST,
  ncmMonofasico,
  NF,
  SegregFaturamentoTotais,
  RouteMap,
} from "@/utils/types";
import {
  createContext,
  useContext,
  Dispatch,
  SetStateAction,
  useState,
} from "react";

interface ISNToolsContext {
  openTab: number;
  routeMap: RouteMap[];
  grpNfes: INfeGroup[];
  selectedNfe: NF;
  selectedNfes: NF[];
  nbmsST: nbmST[];
  ncmsMonofasicos: ncmMonofasico[];
  totals: SegregFaturamentoTotais;
  itemsCFOP: det[];

  setOpenTab: Dispatch<SetStateAction<number>>;
  setRouteMap: Dispatch<SetStateAction<RouteMap[]>>;
  setGrpNfes: Dispatch<SetStateAction<INfeGroup[]>>;
  setSelectedNfe: Dispatch<SetStateAction<NF>>;
  setSelectedNfes: Dispatch<SetStateAction<NF[]>>;
  setNbmsST: Dispatch<SetStateAction<nbmST[]>>;
  setNcmsMonofasicos: Dispatch<SetStateAction<ncmMonofasico[]>>;
  setTotals: Dispatch<SetStateAction<SegregFaturamentoTotais>>;
  setItemsCFOP: Dispatch<SetStateAction<det[]>>;
}
const SNToolsContext = createContext<ISNToolsContext>({
  openTab: 1,
  routeMap: [],
  grpNfes: [],
  selectedNfe: {},
  selectedNfes: [],
  nbmsST: [],
  ncmsMonofasicos: [],
  totals: {},
  itemsCFOP: [],

  setOpenTab: (): number => 1,
  setRouteMap: (): RouteMap[] => [],
  setGrpNfes: (): INfeGroup[] => [],
  setSelectedNfe: (): NF => {
    return {};
  },
  setSelectedNfes: (): NF[] => [],
  setNbmsST: (): nbmST[] => [],
  setNcmsMonofasicos: (): ncmMonofasico[] => [],
  setTotals: function (value: SetStateAction<SegregFaturamentoTotais>): void {},
  setItemsCFOP: (): det[] => [],
});

export const SNToolsContextProvider = ({ children }: any) => {
  const [openTab, setOpenTab] = useState(1);
  const [routeMap, setRouteMap] = useState<RouteMap[]>([]);
  const [grpNfes, setGrpNfes] = useState<[] | INfeGroup[]>([]);
  const [selectedNfe, setSelectedNfe] = useState<NF>({});
  const [selectedNfes, setSelectedNfes] = useState<NF[]>([]);
  const [nbmsST, setNbmsST] = useState<nbmST[]>([]);
  const [ncmsMonofasicos, setNcmsMonofasicos] = useState<ncmMonofasico[]>([]);
  const [totals, setTotals] = useState<SegregFaturamentoTotais>({});
  const [itemsCFOP, setItemsCFOP] = useState<det[]>([]);

  return (
    <SNToolsContext.Provider
      value={{
        openTab,
        routeMap,
        grpNfes,
        selectedNfes,
        nbmsST,
        ncmsMonofasicos,
        selectedNfe,
        totals,
        itemsCFOP,

        setOpenTab,
        setRouteMap,
        setGrpNfes,
        setSelectedNfe,
        setSelectedNfes,
        setNbmsST,
        setNcmsMonofasicos,
        setTotals,
        setItemsCFOP,
      }}
    >
      {children}
    </SNToolsContext.Provider>
  );
};

export const useSNToolsContext = () => useContext(SNToolsContext);
