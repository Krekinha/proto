"use client";
import { det } from "@/utils/types";

interface STParamProps {
  produtos: det[];
}

export default function DetailSTParam({ produtos }: STParamProps) {
  function formatCurrency(valor: string) {
    return parseFloat(valor).toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL",
    });
  }

  return (
    <>
      <div className="flex">
        <div className="flex-auto items-end space-x-4 mr-4"></div>
      </div>

      <div className="px-4 py-4 overflow-x-auto">
        <div className="inline-block min-w-full shadow overflow-hidden rounded-lg">
          {/* TABELA */}
          {produtos && (
            <table className="min-w-full leading-normal w-full bg-gray-800">
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
                    title="O produto é da ST?"
                    className="px-5 py-3  border-b border-gray-200 text-white  text-center text-sm uppercase font-normal"
                  >
                    ST?
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
                {produtos.map((prod, index) => (
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
                      <p
                        className={`${
                          prod.nbmST && prod.nbmST.length > 0
                            ? "text-red-100 text-center whitespace-no-wrap bg-green-600 rounded-lg text-[0.75em] px-1"
                            : "text-red-100 text-center whitespace-no-wrap bg-red-600 rounded-lg text-[0.75em] px-1"
                        }`}
                      >
                        {prod.nbmST && prod.nbmST.length > 0 ? "SIM" : "NÃO"}
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
          )}
        </div>
      </div>
    </>
  );
}
