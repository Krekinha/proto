"use client";
import Backbar from "@/app/(withMenu)/layout/Backbar";
import { useSNToolsContext } from "@/context/SNToolsContext";
import useAntecipacaoCalculate from "@/hooks/useAntecipacaoCalculate";
import ItemAntecipacaoCalculate from "./ItemAntecipacaoCalculate";

export default function AntecipacaoCalculate() {
  const { setOpenTab, selectedNfes } = useSNToolsContext();
  const nfsCalculadas = useAntecipacaoCalculate(selectedNfes)

  function chekIfSelectedNfeEmpty() {
    const count = selectedNfes?.length;
    if (!count || count <= 0) return true;
    else return false;
  }

  const unmakeCalculate = () => {
    setOpenTab(2);
  };

  return (
    <div>
      
      <div className="flex justify-end mr-4">
        <Backbar handleBack={unmakeCalculate} />
      </div>

      <div className="flex-col px-4 py-2 mt-2 rounded-lg shadow">
        {/* TABELA */}
        <table
          hidden={chekIfSelectedNfeEmpty()}
          className="min-w-full leading-normal w-full bg-gray-800"
        >
          <tbody>
            {nfsCalculadas &&
              nfsCalculadas.map((nf, index) => (
                <tr key={index}>
                  <td className="py-3">
                    <ItemAntecipacaoCalculate nf={nf} />
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
