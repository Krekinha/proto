"use client";

import {
  createContext,
  useContext,
  Dispatch,
  SetStateAction,
  useState,
} from "react";

interface IHelpContext {
  openTab: number;
  url: string;
  setOpenTab: Dispatch<SetStateAction<number>>;
  setUrl: Dispatch<SetStateAction<string>>;
}
const HelpContext = createContext<IHelpContext>({
  openTab: 1,
  url: "",
  setOpenTab: (): number => 1,
  setUrl: (): string => "",
});

export const HelpContextProvider = ({ children }: any) => {
  const [openTab, setOpenTab] = useState(1);
  const [url, setUrl] = useState("");

  return (
    <HelpContext.Provider
      value={{
        openTab,
        url,
        setOpenTab,
        setUrl,
      }}
    >
      {children}
    </HelpContext.Provider>
  );
};

export const useHelpContext = () => useContext(HelpContext);
