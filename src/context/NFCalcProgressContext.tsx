"use client";

import {
  createContext,
  useContext,
  Dispatch,
  SetStateAction,
  useState,
} from "react";

interface INFCalcProgressContext {
  userId: string;
  progressVal: number;

  setUserId: Dispatch<SetStateAction<string>>;
  setProgressVal: Dispatch<SetStateAction<number>>;
}
const NFCalcProgressContext = createContext<INFCalcProgressContext>({
  userId: "",
  progressVal: 1,

  setUserId: (): string => "",
  setProgressVal: (): number => 0,
});

export const NFCalcProgressContextProvider = ({ children }: any) => {
  const [userId, setUserId] = useState("");
  const [progressVal, setProgressVal] = useState(0);

  return (
    <NFCalcProgressContext.Provider
      value={{
        userId,
        progressVal,

        setUserId,
        setProgressVal,
      }}
    >
      {children}
    </NFCalcProgressContext.Provider>
  );
};

export const useNFCalcProgressContext = () => useContext(NFCalcProgressContext);
