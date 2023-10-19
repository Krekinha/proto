"use client";

import {
  createContext,
  useContext,
  Dispatch,
  SetStateAction,
  useState,
} from "react";
import { nbmST, ncmMonofasico } from "@/utils/types";

interface ISettingsContext {
  openTab: number;
  nbmsST: nbmST[];
  ncmsMonofasicos: ncmMonofasico[];
  setOpenTab: Dispatch<SetStateAction<number>>;
  setNbmsST: Dispatch<SetStateAction<nbmST[]>>;
  setNcmsMonofasicos: Dispatch<SetStateAction<ncmMonofasico[]>>;
}
const SettingsContext = createContext<ISettingsContext>({
  openTab: 1,
  nbmsST: [],
  ncmsMonofasicos: [],
  setOpenTab: (): number => 1,
  setNbmsST: (): nbmST[] => [],
  setNcmsMonofasicos: (): ncmMonofasico[] => [],
});

export const SettingsContextProvider = ({ children }: any) => {
  const [openTab, setOpenTab] = useState(1);
  const [nbmsST, setNbmsST] = useState<nbmST[]>([]);
  const [ncmsMonofasicos, setNcmsMonofasicos] = useState<ncmMonofasico[]>([]);

  return (
    <SettingsContext.Provider
      value={{
        openTab,
        nbmsST,
        ncmsMonofasicos,
        setOpenTab,
        setNbmsST,
        setNcmsMonofasicos,
      }}
    >
      {children}
    </SettingsContext.Provider>
  );
};

export const useSettingsContext = () => useContext(SettingsContext);
