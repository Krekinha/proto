"use client";
import { FaUserPlus } from "react-icons/fa";
import Backbar from "../layout/Backbar";

export default function ClientesList() {
  let clientes: any[] = [];

  function formatCurrency(valor: string) {
    return parseFloat(valor).toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL",
    });
  }

  function chekIfClientesEmpty() {
    return clientes.length <= 0 ? true : false;
  }

  return (
    <>
      <div className="flex flex-row justify-end">
        <div className="flex">
          <Backbar />
        </div>

        <div className="flex">
          <button
            type="button"
            onClick={() => {}}
            className="text-green-600 active:text-green-800 hover:text-green-700 
                      shadow-md hover:shadow-lg focus:shadow-lg ease-linear transition-all 
                      duration-150"
          >
            <FaUserPlus className=" w-7 h-full" />
          </button>
        </div>
      </div>

      <div className="px-4 py-4 overflow-x-auto">
        <div className="inline-block mt-1  min-w-full shadow overflow-hidden rounded-lg">
          <table
            hidden={chekIfClientesEmpty()}
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
              {clientes &&
                clientes.map((cli, index) => (
                  <tr key={index}>
                    <td className="pl-5 py-2 border-b border-gray-400 bg-gray-300">
                      <p className="text-gray-900 whitespace-no-wrap text-[0.75rem]">
                        {}
                      </p>
                    </td>
                    <td className="pl-5 py-2 border-b border-gray-400 bg-gray-300">
                      <p className="text-gray-900 whitespace-no-wrap text-[0.75rem]">
                        {}
                      </p>
                    </td>
                    <td className="pl-2 py-2 border-b border-gray-400 bg-gray-300 text-left">
                      <p className="text-gray-900 whitespace-no-wrap text-[0.75rem]">
                        {}
                      </p>
                    </td>
                    <td className="pl-2 py-2 border-b border-gray-400 bg-gray-300 text-center">
                      <p className="text-gray-900 whitespace-no-wrap text-[0.75rem]">
                        {}
                      </p>
                    </td>
                    <td className="pl-2 py-2 border-b border-gray-400 bg-gray-300 text-center">
                      <p className="text-gray-900 whitespace-no-wrap text-[0.75rem]">
                        {}
                      </p>
                    </td>
                    <td className="pl-2 py-2 border-b border-gray-400 bg-gray-300 text-center">
                      <p className="text-gray-900 whitespace-no-wrap text-[0.75rem]">
                        {}
                      </p>
                    </td>
                    <td className="pl-2 py-2 border-b border-gray-400 bg-gray-300 text-center">
                      <p className="text-gray-900 whitespace-no-wrap text-[0.75rem]">
                        {}
                      </p>
                    </td>
                    <td className="pl-2 py-2 border-b border-gray-400 bg-gray-300 text-center">
                      <p className="text-gray-900 whitespace-no-wrap text-sm">
                        {}
                      </p>
                    </td>
                    <td className="pl-2 py-2 border-b border-gray-400 bg-gray-300 text-center">
                      <p className="text-gray-900 whitespace-no-wrap text-sm">
                        {}
                      </p>
                    </td>
                    <td className="pl-2 py-2 border-b border-gray-400 bg-gray-300 text-center">
                      <p className="text-gray-900 whitespace-no-wrap text-sm">
                        {}
                      </p>
                    </td>
                    <td className="pl-2 py-2 border-b border-gray-400 bg-gray-300 text-center">
                      <p className="text-gray-900 whitespace-no-wrap text-sm">
                        {}
                      </p>
                    </td>
                    <td className="pl-2 py-2 border-b border-gray-400 bg-gray-300 text-center">
                      <p className="text-gray-900 whitespace-no-wrap text-sm">
                        {}
                      </p>
                    </td>
                    <td className="pl-2 py-2 border-b border-gray-400 bg-gray-300 text-center">
                      <p className="text-gray-900 whitespace-no-wrap text-sm">
                        {}
                      </p>
                    </td>
                    <td className="pl-2 pr-5 py-2 border-b border-gray-400 bg-gray-300 text-center">
                      <p className="text-gray-900 whitespace-no-wrap text-sm">
                        {}
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
