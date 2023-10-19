"use client";
import { useSNToolsContext } from "@/context/SNToolsContext";
import { det } from "@/utils/types";
import { IoMdArrowRoundBack } from "react-icons/io";

export default function DetailCFOP() {
  const { setOpenTab, itemsCFOP } = useSNToolsContext();

  function formatCurrency(valor: string) {
    return parseFloat(valor).toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL",
    });
  }

  function chekIfSelectedNfeEmpty() {
    if (itemsCFOP.length <= 0) return true;
    else return false;
  }

  function sumPrds(prods: det[]) {
    let sum = 0;

    prods.forEach((prod) => {
      const vprod = parseFloat(prod.prod?.vProd || "") || 0;
      const vdesc = parseFloat(prod.prod?.vDesc || "") || 0;
      sum += vprod - vdesc;
    });

    return sum;
  }

  const unmakeItemsCFOPDetail = () => {
    setOpenTab(4);
  };

  return (
    <>
      <div className="flex">
        <div className="flex-auto items-end space-x-4 mr-4">
          <div className="flex justify-end">
            <button
              type="button"
              disabled={chekIfSelectedNfeEmpty()}
              onClick={() => {
                unmakeItemsCFOPDetail();
              }}
              className="bg-violet-600 disabled:bg-gray-600 text-white disabled:text-gray-400 active:bg-violet-800 hover:bg-violet-700 font-bold uppercase px-2 py-2 rounded-full shadow-md hover:shadow-lg  focus:shadow-lg focus:bg-violet-700 ease-linear transition-all duration-150"
            >
              <IoMdArrowRoundBack />
            </button>
          </div>
        </div>
      </div>

      {/* TABELA */}

      <div className="px-4 py-4 overflow-x-auto">
        <span className="text-green-100 text-sm uppercase leading-tight font-semibold">
          CFOP:{" "}
          <span className="text-red-100 bg-red-800 px-1 rounded-md shadow-sm shadow-black font-normal">
            {itemsCFOP[0]?.prod?.CFOP || ""}
          </span>
        </span>
        <span className="text-green-100 ml-12 text-sm leading-tight font-semibold">
          Qnd Itens:{"  "}
          <span className="text-red-100 bg-violet-900 px-1 rounded-md shadow-sm shadow-black font-normal">
            {itemsCFOP.length}
          </span>
        </span>
        <span className="text-green-100 ml-12 text-sm leading-tight font-semibold">
          Val. Itens:{" "}
          <span className="text-red-100 bg-violet-900 px-1 rounded-md shadow-sm shadow-black font-normal">
            {formatCurrency(sumPrds(itemsCFOP).toString())}
          </span>
        </span>

        <div className="inline-block mt-1  min-w-full shadow overflow-hidden rounded-lg">
          <table
            hidden={chekIfSelectedNfeEmpty()}
            className="min-w-full leading-normal w-full bg-gray-800"
          >
            <thead className="border-b bg-zinc-900 w-full">
              <tr>
                <th
                  scope="col"
                  title="Número da nota"
                  className="px-2 py-3 border-b border-gray-200 text-white  text-center text-[0.75rem] uppercase font-normal"
                >
                  NF.
                </th>
                <th
                  scope="col"
                  title="Código do produto"
                  className="px-2 py-3 border-b border-gray-200 text-white  text-left text-[0.75rem] uppercase font-normal"
                >
                  Cod.
                </th>
                <th
                  scope="col"
                  title="Descrição do produto"
                  className="px-2 py-3  border-b border-gray-200 text-white  text-center text-[0.75rem] uppercase font-normal"
                >
                  Descrição
                </th>
                <th
                  scope="col"
                  title="NCM do produto"
                  className="px-5 py-3  border-b border-gray-200 text-white  text-center text-[0.75rem] uppercase font-normal"
                >
                  NCM/SH
                </th>
                <th
                  scope="col"
                  title="CSOSN do produto"
                  className="px-2 py-3  border-b border-gray-200 text-white  text-center text-[0.75rem] uppercase font-normal"
                >
                  CSOSN
                </th>
                <th
                  scope="col"
                  title="CFOP do produto"
                  className="px-2 py-3  border-b border-gray-200 text-white  text-center text-[0.75rem] uppercase font-normal"
                >
                  CFOP
                </th>
                <th
                  scope="col"
                  title="CST do produto"
                  className="px-2 py-3  border-b border-gray-200 text-white  text-center text-[0.75rem] uppercase font-normal"
                >
                  CST
                </th>
                <th
                  scope="col"
                  title="Unidade comercial"
                  className="px-2 py-3  border-b border-gray-200 text-white  text-center text-[0.75rem] uppercase font-normal"
                >
                  Unid
                </th>
                <th
                  scope="col"
                  title="Quantidade comercial"
                  className="px-2 py-3  border-b border-gray-200 text-white  text-center text-[0.75rem] uppercase font-normal"
                >
                  Quant.
                </th>
                <th
                  scope="col"
                  title="Valor unitário de comercialização"
                  className="px-2 py-3  border-b border-gray-200 text-white  text-center text-[0.75rem] uppercase font-normal"
                >
                  Val. Unit
                </th>
                <th
                  scope="col"
                  title="Valor total bruto dos produtos"
                  className="px-2 py-3 border-b border-gray-200 text-white text-center text-[0.75rem] uppercase font-normal"
                >
                  Val. Total
                </th>
                <th
                  scope="col"
                  title="Base de cálculo do ICMS"
                  className="px-2 py-3  border-b border-gray-200 text-white  text-center text-[0.75rem] whitespace-no-wrap uppercase font-normal"
                >
                  B.C. ICMS
                </th>
                <th
                  scope="col"
                  title="Valor do ICMS"
                  className="px-2 py-3  border-b border-gray-200 text-white  text-center text-[0.75rem] uppercase font-normal"
                >
                  Val. ICMS
                </th>
                <th
                  scope="col"
                  title="Alíquota do ICMS"
                  className="px-2 py-3  border-b border-gray-200 text-white  text-center text-[0.75rem] uppercase font-normal"
                >
                  Alíq. ICMS
                </th>
              </tr>
            </thead>

            <tbody>
              {itemsCFOP &&
                itemsCFOP.map((item, index) => (
                  <tr key={index}>
                    <td className="pl-5 py-2 border-b border-gray-400 bg-gray-300">
                      <p className="text-gray-900 whitespace-no-wrap text-[0.75rem]">
                        {item.nNF}
                      </p>
                    </td>
                    <td className="pl-5 py-2 border-b border-gray-400 bg-gray-300">
                      <p className="text-gray-900 whitespace-no-wrap text-[0.75rem]">
                        {item.prod?.cProd}
                      </p>
                    </td>
                    <td className="pl-2 py-2 border-b border-gray-400 bg-gray-300 text-left">
                      <p className="text-gray-900 whitespace-no-wrap text-[0.75rem]">
                        {item.prod?.xProd}
                      </p>
                    </td>
                    <td className="pl-2 py-2 border-b border-gray-400 bg-gray-300 text-center">
                      <p className="text-gray-900 whitespace-no-wrap text-[0.75rem]">
                        {item.prod?.NCM}
                      </p>
                    </td>
                    <td className="pl-2 py-2 border-b border-gray-400 bg-gray-300 text-center">
                      <p className="text-gray-900 whitespace-no-wrap text-[0.75rem]">
                        {item.imposto?.ICMS?.ICMSSN102?.orig}
                        {item.imposto?.ICMS?.ICMSSN102?.CSOSN}
                      </p>
                    </td>
                    <td className="pl-2 py-2 border-b border-gray-400 bg-gray-300 text-center">
                      <p className="text-gray-900 whitespace-no-wrap text-[0.75rem]">
                        {item.prod?.CFOP}
                      </p>
                    </td>
                    <td className="pl-2 py-2 border-b border-gray-400 bg-gray-300 text-center">
                      <p className="text-gray-900 whitespace-no-wrap text-[0.75rem]">
                        {item.imposto?.PIS?.PISNT?.CST?.toString().padStart(
                          2,
                          "0"
                        )}
                      </p>
                    </td>
                    <td className="pl-2 py-2 border-b border-gray-400 bg-gray-300 text-center">
                      <p className="text-gray-900 whitespace-no-wrap text-sm">
                        {item.prod?.uCom}
                      </p>
                    </td>
                    <td className="pl-2 py-2 border-b border-gray-400 bg-gray-300 text-center">
                      <p className="text-gray-900 whitespace-no-wrap text-sm">
                        {item.prod?.qCom?.toString().padStart(2, "0")}
                      </p>
                    </td>
                    <td className="pl-2 py-2 border-b border-gray-400 bg-gray-300 text-center">
                      <p className="text-gray-900 whitespace-no-wrap text-sm">
                        {formatCurrency(item.prod?.vUnCom || "0")}
                      </p>
                    </td>
                    <td className="pl-2 py-2 border-b border-gray-400 bg-gray-300 text-center">
                      <p className="text-gray-900 whitespace-no-wrap text-sm">
                        {formatCurrency(item.prod?.vProd || "0")}
                      </p>
                    </td>
                    <td className="pl-2 py-2 border-b border-gray-400 bg-gray-300 text-center">
                      <p className="text-gray-900 whitespace-no-wrap text-sm">
                        {formatCurrency(item.imposto?.ICMS?.ICMS10?.vBC || "0")}
                      </p>
                    </td>
                    <td className="pl-2 py-2 border-b border-gray-400 bg-gray-300 text-center">
                      <p className="text-gray-900 whitespace-no-wrap text-sm">
                        {formatCurrency(
                          item.imposto?.ICMS?.ICMS10?.vICMS || "0"
                        )}
                      </p>
                    </td>
                    <td className="pl-2 pr-5 py-2 border-b border-gray-400 bg-gray-300 text-center">
                      <p className="text-gray-900 whitespace-no-wrap text-sm">
                        {formatCurrency(
                          item.imposto?.ICMS?.ICMS10?.pICMS || "0"
                        )}
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
