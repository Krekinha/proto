"use client";
import { useSNToolsContext } from "@/context/SNToolsContext";
import { formatarData } from "@/utils/format";
import { RiFileTextFill } from "react-icons/ri";
import Backbar from "../../layout/Backbar";
import { Badge } from "../../layout/Badge";
import ItemAntecipacao from "./ItemAntecipacao";

export default function DetailItens() {
  const { setOpenTab, selectedNfe } = useSNToolsContext();

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

  function getDespesas() {
    const frete = parseFloat(
      selectedNfe.nfeProc?.NFe?.infNFe?.total?.ICMSTot?.vFrete || "0"
    );
    const seguro = parseFloat(
      selectedNfe.nfeProc?.NFe?.infNFe?.total?.ICMSTot?.vSeg || "0"
    );
    const outros = parseFloat(
      selectedNfe.nfeProc?.NFe?.infNFe?.total?.ICMSTot?.vOutro || "0"
    );
    /*const desconto = parseFloat(
      selectedNfe.nfeProc?.NFe?.infNFe?.total?.ICMSTot?.vDesc || "0"
    );*/
    return frete + seguro + outros;
  }

  const unmakeItensDetail = () => {
    setOpenTab(2);
  };

  return (
    <>
      <div className="flex justify-end mr-4">
        <div>
          <Backbar handleBack={unmakeItensDetail} />
        </div>
      </div>

      {/* DETALHES DA NOTA  */}
      <div className="flex flex-col px-4 py-2 mt-2 mx-4 rounded-lg shadow-md shadow-black bg-violet-300">
        <div className="flex items-center">
          <div>
            <RiFileTextFill className="text-blue-900" />
          </div>

          <div className="flex ml-2 items-center">
            <span className="text-slate-900 text-[0.75rem] font-bold">
              DETALHES DA NOTA FISCAL
            </span>
            <span
              className="inline-block rounded-full border border-gray-500 px-[0.30rem]
                           text-center align-middle text-[0.70rem] font-bold text-red-800 ml-1"
            >
              {selectedNfe?.nfeProc?.NFe?.infNFe?.ide?.nNF}
            </span>
          </div>
        </div>

        <hr className="mb-2 mt-1 border-slate-500" />

        <div className="flex flex-wrap gap-1">
          <div>
            <Badge
              bgColor="bg-slate-800"
              nameColor="text-gray-300"
              valorColor="text-amber-400"
              divideColor="text-gray-300"
              name="EMITENTE"
              valor={selectedNfe.nfeProc?.NFe?.infNFe?.emit?.xNome}
            />
          </div>

          <div>
            <Badge
              bgColor="bg-slate-800"
              nameColor="text-gray-300"
              valorColor="text-amber-400"
              divideColor="text-gray-300"
              name="DESTINATÁRIO"
              valor={selectedNfe.nfeProc?.NFe?.infNFe?.dest?.xNome}
            />
          </div>

          <div>
            <Badge
              bgColor="bg-slate-800"
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

        <div className="flex flex-wrap gap-1 mt-1">
          <div>
            <Badge
              bgColor="bg-stone-700"
              nameColor="text-gray-300"
              valorColor="text-amber-400"
              divideColor="text-gray-300"
              name="QTD. ITENS"
              valor={selectedNfe.nfeProc?.NFe?.infNFe?.det?.length.toString()}
            />
          </div>

          <div>
            <Badge
              bgColor="bg-stone-700"
              nameColor="text-gray-300"
              valorColor="text-amber-400"
              divideColor="text-gray-300"
              name="DESPESAS"
              valor={formatCurrency(getDespesas().toString())}
            />
          </div>

          <div>
            <Badge
              bgColor="bg-stone-700"
              nameColor="text-gray-300"
              valorColor="text-amber-400"
              divideColor="text-gray-300"
              name="DESCONTO"
              valor={formatCurrency(
                selectedNfe.nfeProc?.NFe?.infNFe?.total?.ICMSTot?.vDesc || "0"
              )}
            />
          </div>

          <div>
            <Badge
              bgColor="bg-stone-700"
              nameColor="text-gray-300"
              valorColor="text-amber-400"
              divideColor="text-gray-300"
              name="IPI"
              valor={formatCurrency(
                selectedNfe.nfeProc?.NFe?.infNFe?.total?.ICMSTot?.vIPI || "0"
              )}
            />
          </div>

          <div>
            <Badge
              bgColor="bg-stone-700"
              nameColor="text-gray-300"
              valorColor="text-amber-400"
              divideColor="text-gray-300"
              name="VAL. ICMS"
              valor={formatCurrency(
                selectedNfe.nfeProc?.NFe?.infNFe?.total?.ICMSTot?.vICMS || "0"
              )}
            />
          </div>

          <div>
            <Badge
              bgColor={
                parseFloat(
                  selectedNfe.nfeProc?.NFe?.infNFe?.total?.ICMSTot?.vST || "0"
                ) > 0
                  ? "bg-red-500"
                  : "bg-stone-700"
              }
              nameColor="text-gray-300"
              valorColor="text-amber-400"
              divideColor="text-gray-300"
              name="VAL. ICMS-ST"
              valor={formatCurrency(
                selectedNfe.nfeProc?.NFe?.infNFe?.total?.ICMSTot?.vST || "0"
              )}
            />
          </div>

          <div>
            <Badge
              bgColor="bg-blue-900"
              nameColor="text-gray-300"
              valorColor="text-amber-400"
              divideColor="text-gray-300"
              name="VAL. NOTA"
              valor={formatCurrency(
                selectedNfe.nfeProc?.NFe?.infNFe?.total?.ICMSTot?.vNF || "0"
              )}
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
                    <ItemAntecipacao item={item} />
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
