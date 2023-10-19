"use client";
import { useSNToolsContext } from "@/context/SNToolsContext";
import { CFOPGroup, det } from "@/utils/types";
import { FaSearch } from "react-icons/fa";

export default function CardCFOP() {
  const { selectedNfes, setOpenTab, setItemsCFOP } = useSNToolsContext();

  function getAllProds() {
    let prods: det[] = [];

    selectedNfes.forEach((nf) => {
      nf.nfeProc?.NFe?.infNFe?.det?.forEach((prod) => {
        prod.nNF = nf.nfeProc?.NFe?.infNFe?.ide?.nNF;
        prods.push(prod);
      });
    });

    return prods;
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

  function groupByCFOP() {
    const prods = getAllProds();
    var groupBy = require("lodash.groupby");

    const result = groupBy(prods, (prod: det) => prod.prod?.CFOP);

    const group: CFOPGroup[] = [];

    for (var i in result) {
      group.push({ key: i, prods: Array.from(result[i]) });
    }

    return group;
  }

  const makeItensCFOPDetail = (items: det[]) => {
    setItemsCFOP(items);
    setOpenTab(7);
  };

  return (
    <>
      <div>
        <div className="block p-6 rounded-lg shadow-lg shadow-black bg-violet-400">
          <div className="flex">
            <div className=" grid items-center">
              <span className="text-gray-900 text-sm uppercase leading-tight font-semibold">
                Totais por CFOP
              </span>
            </div>
          </div>

          <hr className="mb-2 mt-1 border-violet-500" />

          {/* TABELA */}
          <div className="flex justify-center">
            <table className="table-auto">
              <thead>
                <tr>
                  <th
                    scope="col"
                    className="border-b border-blue-600 text-gray-900  text-center text-[0.86rem] uppercase font-bold"
                  >
                    CFOP
                  </th>
                  <th
                    scope="col"
                    className="border-b pl-2 border-blue-600 text-gray-900  text-center text-[0.86rem] uppercase font-bold"
                  >
                    Valor
                  </th>
                  <th
                    scope="col"
                    className="border-b pl-2 border-blue-600 text-gray-900  text-center text-[0.86rem] uppercase font-bold"
                  >
                    Det.
                  </th>
                </tr>
              </thead>

              <tbody>
                {groupByCFOP() &&
                  groupByCFOP().map((grp, i) => (
                    <tr key={i}>
                      <td className="px-3 border-b border-gray-500 text-[0.75em]">
                        <p className="text-gray-900 font-semibold">{grp.key}</p>
                      </td>

                      <td className="px-3 border-b border-gray-500 text-sm">
                        <a className="text-gray-900 text-[0.75em] font-semibold">
                          {" "}
                          {sumPrds(grp.prods).toLocaleString("pt-BR", {
                            style: "currency",
                            currency: "BRL",
                          }) || "0,00"}
                        </a>
                      </td>

                      <td className="px-3 border-b border-gray-500 text-sm">
                        <button
                          type="button"
                          title="Itens da nota"
                          onClick={() => {
                            makeItensCFOPDetail(grp.prods);
                          }}
                          className="bg-red-700 text-red-100 active:bg-red-900 hover:bg-red-800 
                        text-[0.66em] px-[0.65em] pt-[0.33em] pb-[0.30em] rounded 
                        shadow-md shadow-gray-500 ease-linear transition-all duration-150"
                        >
                          <FaSearch />
                        </button>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
}
