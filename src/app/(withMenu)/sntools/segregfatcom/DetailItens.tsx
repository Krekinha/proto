"use client";
import { useSNToolsContext } from "@/context/SNToolsContext";
import { formatarData } from "@/utils/format";
import { RiFileTextFill } from "react-icons/ri";
import Backbar from "../../layout/Backbar";
import { Badge } from "../../layout/Badge";
import ItemSTMono from "./ItemSTMono";

export default function DetailItens() {
  const { setOpenTab, selectedNfe } = useSNToolsContext();

  //console.log(selectedNfe);

  function formatCurrency(valor: string) {
    return parseFloat(valor).toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL",
    });
  }

  function chekIfSelectedNfeEmpty() {
    const prd = selectedNfe?.nfeProc?.NFe?.infNFe?.det?.length;
    if (!prd || prd <= 0) return true;
    else return false;
  }

  const unmakeItensDetail = () => {
    setOpenTab((...prev) => 2);
  };

  return (
    <>
      <div className="flex justify-end mr-4">
        <div>
          <Backbar handleBack={unmakeItensDetail} />
        </div>
      </div>

      {/* DETALHES DA NOTA  */}
      <div className="flex-col px-4 py-2 mt-2 mx-4 rounded-lg shadow-md shadow-black bg-violet-300">
        <div className="flex items-center">
          <div>
            <RiFileTextFill className="text-blue-900" />
          </div>

          <div className="flex ml-2">
            <span className="text-slate-700 text-[0.75rem] font-medium">
              DETALHES DA NOTA FISCAL
            </span>
          </div>
        </div>

        <hr className="mb-2 mt-1 border-slate-500" />

        <div className="flex flex-row space-x-2">
          <div>
            <Badge
              bgColor="bg-blue-800"
              nameColor="text-gray-300"
              valorColor="text-amber-400"
              divideColor="text-gray-300"
              name="NOTA"
              valor={selectedNfe?.nfeProc?.NFe?.infNFe?.ide?.nNF}
            />
          </div>
          <div>
            <Badge
              bgColor="bg-blue-800"
              nameColor="text-gray-300"
              valorColor="text-amber-400"
              divideColor="text-gray-300"
              name="EMITENTE"
              valor={selectedNfe.nfeProc?.NFe?.infNFe?.emit?.xNome}
            />
          </div>

          <div>
            <Badge
              bgColor="bg-blue-800"
              nameColor="text-gray-300"
              valorColor="text-amber-400"
              divideColor="text-gray-300"
              name="DESTINATÁRIO"
              valor={selectedNfe.nfeProc?.NFe?.infNFe?.dest?.xNome}
            />
          </div>

          <div>
            <Badge
              bgColor="bg-blue-800"
              nameColor="text-gray-300"
              valorColor="text-amber-400"
              divideColor="text-gray-300"
              name="QTD. ITENS"
              valor={selectedNfe.nfeProc?.NFe?.infNFe?.det?.length.toString()}
            />
          </div>

          <div>
            <Badge
              bgColor="bg-blue-800"
              nameColor="text-gray-300"
              valorColor="text-amber-400"
              divideColor="text-gray-300"
              name="VAL. NOTA"
              valor={formatCurrency(
                selectedNfe.nfeProc?.NFe?.infNFe?.total?.ICMSTot?.vNF || "0"
              )}
            />
          </div>

          <div>
            <Badge
              bgColor="bg-blue-800"
              nameColor="text-gray-300"
              valorColor="text-amber-400"
              divideColor="text-gray-300"
              name="EMISSÃO:"
              valor={
                selectedNfe.nfeProc?.NFe?.infNFe?.ide?.dhEmi &&
                formatarData(selectedNfe.nfeProc?.NFe?.infNFe?.ide?.dhEmi)
              }
            />
          </div>
        </div>
      </div>

      <div className="flex-col px-4 py-2 mt-2 rounded-lg shadow">
        {/* TABELA */}
        <table
          hidden={chekIfSelectedNfeEmpty()}
          className="min-w-full leading-normal w-full bg-gray-800"
        >
          <tbody>
            {selectedNfe &&
              selectedNfe.nfeProc?.NFe?.infNFe?.det?.map((item, index) => (
                <tr key={index}>
                  <td className="py-1">
                    <ItemSTMono item={item} />
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
