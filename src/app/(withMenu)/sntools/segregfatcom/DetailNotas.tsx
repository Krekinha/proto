"use client";
import { INfeGroup, NF } from "@/utils/types";
import { FaSearch } from "react-icons/fa";
import { RiDeleteBin2Fill } from "react-icons/ri";
import { formatarData } from "@/utils/format";
import Backbar from "../../layout/Backbar";
import { BtnStandard } from "../../layout/BtnStandard";
import { useSNToolsContext } from "@/context/SNToolsContext";

export default function DetailNotas() {
  const {
    setOpenTab,
    grpNfes,
    selectedNfes,
    setSelectedNfes,
    setSelectedNfe,
    setGrpNfes,
  } = useSNToolsContext();

  const calcular = () => {
    setOpenTab(4);
  };

  console.log(selectedNfes);

  const makeItensDetail = (nf: any) => {
    setSelectedNfe(nf);
    setOpenTab(3);
  };

  function formatCurrency(valor: string) {
    return parseFloat(valor).toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL",
    });
  }

  function checkModeloNF(modelo: string) {
    if (modelo == "55") {
      return "NFe";
    } else if (modelo == "65") {
      return "NFCe";
    } else {
      return "?";
    }
  }

  function checkTipoNF(nf: NF) {
    const tipo = nf.nfeProc?.NFe?.infNFe?.ide?.tpNF;

    if (tipo == "0") {
      return "E";
    } else if (tipo == "1") {
      return "S";
    } else {
      return "?";
    }
  }

  function titleByTipoNF(nf: NF) {
    const tipo = nf.nfeProc?.NFe?.infNFe?.ide?.tpNF;

    if (tipo == "0") {
      return "Nota de Entrada";
    } else if (tipo == "1") {
      return "Nota de Saída";
    } else {
      return "?";
    }
  }

  const unmakeDetail = () => {
    //setSelectedNfes(notas);
    setOpenTab(1);
  };

  const excluirNF = (nf: NF) => {
    const remove = selectedNfes.filter(
      (nota) =>
        nota.nfeProc?.NFe?.infNFe?.ide?.nNF !==
        nf.nfeProc?.NFe?.infNFe?.ide?.nNF
    );

    const remove2 = ungroupNfes(grpNfes).filter(
      (nota) =>
        nota.nfeProc?.NFe?.infNFe?.ide?.nNF !==
        nf.nfeProc?.NFe?.infNFe?.ide?.nNF
    );

    setSelectedNfes(remove);
    setGrpNfes(groupByCNPJ(remove2));
  };

  function ungroupNfes(group: INfeGroup[]) {
    let all: any[] = [];

    group.map((grp) => grp.nfs.forEach((nf) => all.push(nf)));

    return all;
  }

  function groupByCNPJ(notas: NF[]) {
    var groupBy = require("lodash.groupby");

    const result = groupBy(
      notas,
      (nf: NF) => nf.nfeProc?.NFe?.infNFe?.emit?.CNPJ
    );

    const group: INfeGroup[] = [];

    for (var i in result) {
      group.push({ key: i, nfs: Array.from(result[i]) });
    }

    return group;
  }

  function checkStatusNF(nf: NF) {
    const status = nf.nfeProc?.protNFe?.infProt?.cStat;

    if (status == "100") {
      return "Autorizada";
    } else if (status == "101") {
      return "Cancelada";
    } else {
      return status;
    }
  }

  function sumValNFs() {
    let sum = 0;
    selectedNfes.forEach(
      (nf) =>
        (sum +=
          (nf.nfeProc?.NFe?.infNFe?.total?.ICMSTot?.vNF &&
            parseFloat(nf.nfeProc?.NFe?.infNFe?.total?.ICMSTot?.vNF)) ||
          0)
    );
    return sum.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
  }

  return (
    <div>
      <div className="flex items-center justify-end gap-2 mr-4">
        <div>
          <Backbar handleBack={unmakeDetail} />
        </div>
        <div>
          <BtnStandard
            bgColor="green"
            title="Importar xmls das notas"
            handleClick={() => calcular()}
          >
            Calcular
          </BtnStandard>
        </div>
      </div>

      {/* TABELA */}

      <div className="px-4 py-4 overflow-x-auto">
        <div className="inline-block min-w-full shadow overflow-hidden rounded-lg">
          <table
            //hidden={selectedNfesIsEmpty}
            className="min-w-full leading-normal w-full bg-gray-800"
          >
            <thead className="border-b bg-zinc-900 w-full">
              <tr>
                <th
                  scope="col"
                  title="Número da nota fiscal"
                  className="px-5 py-3 border-b border-gray-200 text-white  text-left text-sm uppercase font-normal"
                >
                  NF
                </th>
                <th
                  scope="col"
                  title="Modelo da nota fiscal"
                  className="px-5 py-3  border-b border-gray-200 text-white  text-center text-sm uppercase font-normal"
                >
                  Mod.
                </th>
                <th
                  scope="col"
                  title="Tipo da nota fiscal: Entrada(E) ou Saída(S)"
                  className="px-5 py-3  border-b border-gray-200 text-white  text-center text-sm uppercase font-normal"
                >
                  E/S
                </th>
                <th
                  scope="col"
                  title="Emitente da nota fiscal"
                  className="px-5 py-3  border-b border-gray-200 text-white  text-center text-sm uppercase font-normal"
                >
                  Emitente
                </th>
                <th
                  scope="col"
                  title="CNPJ do emitente da nota fiscal"
                  className="px-5 py-3  border-b border-gray-200 text-white  text-center text-sm uppercase font-normal"
                >
                  CNPJ
                </th>
                <th
                  scope="col"
                  title="Data de emissão da nota fiscal"
                  className="px-5 py-3  border-b border-gray-200 text-white  text-center text-sm uppercase font-normal"
                >
                  Emissão
                </th>
                <th
                  scope="col"
                  title="Valor da nota fiscal"
                  className="px-5 py-3  border-b border-gray-200 text-white  text-center text-sm uppercase font-normal"
                >
                  Valor
                </th>
                <th
                  scope="col"
                  title="Detalhes dos itens da nota fiscal"
                  className="pr-5 py-3 border-b border-gray-200 text-white text-right text-sm uppercase font-normal h-full"
                >
                  Itens
                </th>
              </tr>
            </thead>

            <tbody>
              {selectedNfes &&
                selectedNfes.map((nf, index) => (
                  <tr key={index}>
                    <td className="pl-5 py-2 border-b border-gray-400 bg-gray-300 text-sm">
                      <p className="text-gray-900 whitespace-no-wrap">
                        {nf.nfeProc?.NFe?.infNFe?.ide?.nNF}
                      </p>
                    </td>
                    <td className="pl-2 py-2 border-b border-gray-400 bg-gray-300 text-sm text-center">
                      <p className="text-gray-800 whitespace-no-wrap">
                        {nf.nfeProc?.NFe?.infNFe?.ide?.mod} (
                        {checkModeloNF(nf.nfeProc?.NFe?.infNFe?.ide?.mod || "")}
                        )
                      </p>
                    </td>
                    <td className="pl-2 py-2 border-b border-gray-400 bg-gray-300 text-sm">
                      <div className="flex flex-row justify-center">
                        <p
                          title={titleByTipoNF(nf)}
                          className={`${
                            checkTipoNF(nf) == "E"
                              ? "text-red-100 text-center  bg-red-500 w-5 h-5 rounded-full"
                              : "text-green-100 text-center bg-green-600 w-5 h-5 rounded-full"
                          }`}
                        >
                          {checkTipoNF(nf)}
                        </p>
                      </div>
                    </td>

                    <td className="pl-2 py-2 border-b border-gray-400 bg-gray-300 text-sm text-center">
                      <p className="text-gray-900 whitespace-no-wrap">
                        {nf.nfeProc?.NFe?.infNFe?.emit?.xNome}
                      </p>
                    </td>
                    <td className="pl-2 py-2 border-b border-gray-400 bg-gray-300 text-sm text-center">
                      <p className="text-gray-900 whitespace-no-wrap">
                        {nf.nfeProc?.NFe?.infNFe?.emit?.CNPJ}
                      </p>
                    </td>
                    <td className="pl-2 py-2 border-b border-gray-400 bg-gray-300 text-sm text-center">
                      <p className="text-gray-900 whitespace-no-wrap">
                        {nf.nfeProc?.NFe?.infNFe?.ide?.dhEmi &&
                          formatarData(nf.nfeProc?.NFe?.infNFe?.ide?.dhEmi)}
                      </p>
                    </td>
                    <td className="pl-2 py-2 border-b border-gray-400 bg-gray-300 text-sm text-center">
                      <p className="text-gray-900 whitespace-no-wrap">
                        {formatCurrency(
                          nf.nfeProc?.NFe?.infNFe?.total?.ICMSTot?.vNF || "0"
                        )}
                      </p>
                    </td>
                    <td className="py-2 border-b border-gray-400 bg-gray-300 text-sm">
                      <div className="flex flex-row justify-end">
                        <div className="flex mr-2">
                          <button
                            type="button"
                            title="Itens da nota"
                            onClick={() => {
                              makeItensDetail(nf);
                            }}
                            className="bg-violet-600 text-white active:bg-violet-800 hover:bg-violet-700 font-bold uppercase text-lg px-2 py-2 rounded shadow-md hover:shadow-lg outline-none focus:shadow-lg focus:bg-violet-700 mr-1 mb-1 ease-linear transition-all duration-150"
                          >
                            <FaSearch />
                          </button>
                          <button
                            type="button"
                            title="Excluir nota"
                            onClick={() => {
                              excluirNF(nf);
                            }}
                            className="bg-red-600 text-white active:bg-red-800 hover:bg-red-700 font-bold uppercase text-lg px-2 py-2 rounded shadow-md hover:shadow-lg outline-none focus:shadow-lg focus:bg-red-700 mr-1 mb-1 ease-linear transition-all duration-150"
                          >
                            <RiDeleteBin2Fill />
                          </button>
                        </div>
                      </div>
                    </td>
                  </tr>
                ))}
              <tr className="bg-zinc-900">
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td className="px-5 py-2 text-white  text-center text-sm uppercase font-normal">
                  Total
                </td>
                <td className="px-5 py-2 text-sky-600  text-center text-sm uppercase font-semibold">
                  {sumValNFs()}
                </td>
                <td className="py-2 pr-3 text-gray-300 justify-end text-end text-sm font-normal">
                  ({selectedNfes.length.toString().padStart(2, "0")} Notas)
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
