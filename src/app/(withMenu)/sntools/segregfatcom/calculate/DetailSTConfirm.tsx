"use client";
import { useNFCalcSaidaContext } from "@/context/NFCalcSaidaContext";
import { det } from "@/utils/types";

interface STConfirmProps {
  produtos: det[];
}

export default function DetailSTConfirm({produtos}: STConfirmProps) {
  const {
    selectedNfe,
  } = useNFCalcSaidaContext();

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

  return (
    <>
      <div className="flex">
        <div className="flex-auto items-end space-x-4 mr-4"></div>
      </div>
      {/* TABELA */}

      <div className="px-4 py-4 overflow-x-auto">
        <div className="inline-block min-w-full shadow overflow-hidden rounded-lg">
          <table
            //hidden={chekIfSelectedNfeEmpty()}
            className="min-w-full leading-normal w-full bg-gray-800"
          >
            <thead className="border-b bg-zinc-900 w-full">
              <tr>
                <th
                  scope="col"
                  title="Número da nota"
                  className="px-5 py-3 border-b border-gray-200 text-white  text-left text-sm uppercase font-normal"
                >
                  Nota
                </th>
                <th
                  scope="col"
                  title="Código do produto"
                  className="px-5 py-3 border-b border-gray-200 text-white  text-left text-sm uppercase font-normal"
                >
                  Cod.
                </th>
                <th
                  scope="col"
                  title="Descrição do produto"
                  className="px-5 py-3  border-b border-gray-200 text-white  text-center text-sm uppercase font-normal"
                >
                  Descrição
                </th>
                <th
                  scope="col"
                  title="NCM do produto"
                  className="px-5 py-3  border-b border-gray-200 text-white  text-center text-sm uppercase font-normal"
                >
                  NCM/SH
                </th>
                <th
                  scope="col"
                  title="CSOSN do produto"
                  className="px-5 py-3  border-b border-gray-200 text-white  text-center text-sm uppercase font-normal"
                >
                  CSOSN
                </th>
                <th
                  scope="col"
                  title="CFOP do produto"
                  className="px-5 py-3  border-b border-gray-200 text-white  text-center text-sm uppercase font-normal"
                >
                  CFOP
                </th>
                <th
                  scope="col"
                  title="CST do produto"
                  className="px-5 py-3  border-b border-gray-200 text-white  text-center text-sm uppercase font-normal"
                >
                  CST
                </th>
                <th
                  scope="col"
                  title="Unidade comercial"
                  className="px-5 py-3  border-b border-gray-200 text-white  text-center text-sm uppercase font-normal"
                >
                  Unid
                </th>
                <th
                  scope="col"
                  title="Quantidade comercial"
                  className="px-5 py-3  border-b border-gray-200 text-white  text-center text-sm uppercase font-normal"
                >
                  Quant.
                </th>
                <th
                  scope="col"
                  title="Valor unitário de comercialização"
                  className="px-5 py-3  border-b border-gray-200 text-white  text-center text-sm uppercase font-normal"
                >
                  Val. Unit
                </th>
                <th
                  scope="col"
                  title="Valor total bruto dos produtos"
                  className="px-5 py-3  border-b border-gray-200 text-white  text-center text-sm uppercase font-normal"
                >
                  Val. Total
                </th>
              </tr>
            </thead>

            <tbody>
              {produtos &&
                produtos.map((prod, index) => (
                  <tr key={index}>
                    <td className="pl-5 py-2 border-b border-gray-400 bg-gray-300">
                      <p className="text-gray-900 whitespace-no-wrap text-[0.75em]">
                        {prod.nNF}
                      </p>
                    </td>
                    <td className="pl-2 py-2 border-b border-gray-400 bg-gray-300 text-center">
                      <p className="text-gray-900 whitespace-no-wrap text-[0.75em]">
                        {prod.prod?.cProd}
                      </p>
                    </td>
                    <td className="pl-2 py-2 border-b border-gray-400 bg-gray-300 text-center">
                      <p className="text-gray-900 whitespace-no-wrap text-[0.75em]">
                        {prod.prod?.xProd}
                      </p>
                    </td>
                    <td className="pl-2 py-2 border-b border-gray-400 bg-gray-300 text-center">
                      <p className="text-gray-900 whitespace-no-wrap text-[0.75em]">
                        {prod.prod?.NCM}
                      </p>
                    </td>
                    <td className="pl-2 py-2 border-b border-gray-400 bg-gray-300 text-center">
                      <p className="text-gray-900 whitespace-no-wrap text-[0.75em]">
                        {prod.imposto?.ICMS?.ICMSSN102?.orig}
                        {prod.imposto?.ICMS?.ICMSSN102?.CSOSN}
                      </p>
                    </td>
                    <td className="pl-2 py-2 border-b border-gray-400 bg-gray-300 text-center">
                      <p className="text-gray-900 whitespace-no-wrap text-[0.75em]">
                        {prod.prod?.CFOP}
                      </p>
                    </td>
                    <td className="pl-2 py-2 border-b border-gray-400 bg-gray-300 text-center">
                      <p className="text-gray-900 whitespace-no-wrap text-[0.75em]">
                        {prod.imposto?.PIS?.PISNT?.CST?.toString().padStart(
                          2,
                          "0"
                        )}
                      </p>
                    </td>
                    <td className="pl-2 py-2 border-b border-gray-400 bg-gray-300 text-center">
                      <p className="text-gray-900 whitespace-no-wrap text-[0.75em]">
                        {prod.prod?.uCom}
                      </p>
                    </td>
                    <td className="pl-2 py-2 border-b border-gray-400 bg-gray-300 text-center">
                      <p className="text-gray-900 whitespace-no-wrap text-[0.75em]">
                        {prod.prod?.qCom?.toString().padStart(2, "0")}
                      </p>
                    </td>
                    <td className="pl-2 py-2 border-b border-gray-400 bg-gray-300 text-center">
                      <p className="text-gray-900 whitespace-no-wrap text-[0.75em]">
                        {formatCurrency(prod.prod?.vUnCom || "0")}
                      </p>
                    </td>
                    <td className="pl-2 py-2 border-b border-gray-400 bg-gray-300 text-center">
                      <p className="text-gray-900 whitespace-no-wrap text-[0.75em]">
                        {formatCurrency(prod.prod?.vProd || "0")}
                      </p>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
