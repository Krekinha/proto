"use client";
import Backbar from "@/app/(withMenu)/layout/Backbar";
import { BtnStandard } from "@/app/(withMenu)/layout/BtnStandard";
import { useSNToolsContext } from "@/context/SNToolsContext";
import { notifyService } from "@/services/notifyService";
import { formatarData } from "@/utils/format";
import { INfeGroup, nbmST, NF } from "@/utils/types";
import { FaSearch } from "react-icons/fa";
import { RiDeleteBin2Fill } from "react-icons/ri";

interface props {
  nbmsst: nbmST[];
}

interface validateProps {
  tipo?: string;
  nota?: string;
  codItem?: string;
  motivo?: string;
}

export default function DetailNotas({ nbmsst }: props) {
  const {
    setSelectedNfes,
    setSelectedNfe,
    selectedNfes,
    setOpenTab,
    grpNfes,
    setGrpNfes,
  } = useSNToolsContext();

  function formatCurrency(valor: string) {
    return parseFloat(valor).toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL",
    });
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

  function isUFEmitMG(nf: NF) {
    return nf.nfeProc?.NFe?.infNFe?.emit?.enderEmit?.UF === "MG";
  }

  function makeItensDetail(nf: NF) {
    setSelectedNfe(nf);
    setOpenTab(3);
  }
  const back = () => {
    setOpenTab(1);
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

  function validate() {
    let validateAll: validateProps[] = [];

    // Validate UF
    selectedNfes.forEach((nf) => {
      if (isUFEmitMG(nf)) {
        validateAll.push({
          tipo: "UF",
          nota: nf.nfeProc?.NFe?.infNFe?.ide?.nNF,
          motivo: "Operação iniciada em MG",
        });
      }
    });

    // Validate Selection
    if (validateAll.length <= 0) {
      selectedNfes.forEach((nf) => {
        nf.nfeProc?.NFe?.infNFe?.det?.forEach((item) => {
          if (item?.calcAntecipacao === undefined) {
            validateAll.push({
              tipo: "SELECTION",
              nota: nf.nfeProc?.NFe?.infNFe?.ide?.nNF,
              codItem: item?.prod?.cProd,
              motivo: "Selecione uma opção de cálculo",
            });
          }
        });
      });
    }

    return validateAll;
  }

  const validateAll = () => {
    const _validate = validate();

    if (_validate.length > 0) {
      notifyService.error(
        <div className="px-4 py-4 overflow-x-auto">
          <div className="inline-block min-w-full overflow-hidden ">
            <span className="text-red-100 text-[0.75rem]">
              Os seguintes erros estão impedindo o cálculo:
            </span>
            <table className="min-w-full leading-normal w-full mt-2">
              <thead>
                <tr>
                  <th
                    scope="col"
                    className="border-b border-gray-500 text-gray-900 text-center text-[0.75rem] uppercase"
                  >
                    NOTA
                  </th>
                  <th
                    scope="col"
                    className="border-b pl-2 border-gray-500 text-gray-900  text-center text-[0.75rem] uppercase"
                  >
                    ITEM
                  </th>
                  <th
                    scope="col"
                    className="border-b pl-2 border-gray-500 text-gray-900  text-center text-[0.75rem] uppercase"
                  >
                    MOTIVO
                  </th>
                </tr>
              </thead>

              <tbody>
                {_validate &&
                  _validate.map((val, i) => (
                    <tr key={i}>
                      <td className="px-3 border-b border-gray-500 text-[0.75em]">
                        <p className="text-gray-900 font-semibold">
                          {val.nota}
                        </p>
                      </td>

                      <td className="px-3 border-b border-gray-500 text-sm">
                        <p className="text-gray-900 text-[0.75em] font-semibold">
                          {val.codItem}
                        </p>
                      </td>

                      <td className="px-3 border-b border-gray-500 text-sm">
                        <p className="text-gray-900 text-[0.75em] font-semibold">
                          {val.motivo}
                        </p>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </div>,
        "ERRO"
      );
      return;
    }

    setOpenTab(4);
  };

  return (
    <div>
      <div className="flex">
        <div className="flex-auto mr-4">
          <div className="flex items-center justify-end">
            <div className="mr-3">
              <Backbar handleBack={back} />
            </div>
            <div>
              <BtnStandard
                type="button"
                bgColor="red"
                handleClick={() => {
                  validateAll();
                }}
              >
                Calcular
              </BtnStandard>
            </div>
          </div>
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
                  className="px-5 py-3 border-b border-gray-200 text-white text-left text-sm uppercase font-normal cursor-pointer"
                >
                  Nota
                </th>

                <th
                  scope="col"
                  title="Modelo da nota fiscal"
                  className="border-b border-gray-200 text-white text-center text-sm uppercase font-normal"
                >
                  Orig/Dest
                </th>

                <th
                  scope="col"
                  title="Emitente da nota fiscal"
                  className="border-b border-gray-200 text-white text-center text-sm uppercase font-normal"
                >
                  Emitente
                </th>
                <th
                  scope="col"
                  title="Tipo da nota fiscal: Entrada(E) ou Saída(S)"
                  className="px-5 py-3  border-b border-gray-200 text-white text-center text-sm uppercase font-normal"
                >
                  itENS
                </th>
                <th
                  scope="col"
                  title="Data de emissão da nota fiscal"
                  className="px-5 py-3  border-b border-gray-200 text-white text-center text-sm uppercase font-normal"
                >
                  Emissão
                </th>
                <th
                  scope="col"
                  title="Valor da nota fiscal"
                  className="px-5 py-3  border-b border-gray-200 text-white text-center text-sm uppercase font-normal"
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
                    <td className="py-2 border-b border-gray-400 bg-gray-300 text-sm items-center">
                      <p
                        className={`${
                          isUFEmitMG(nf)
                            ? "text-red-100 text-center bg-red-500 rounded-full w-20 px-3"
                            : "text-green-100 text-center bg-green-600 rounded-full w-20 px-3"
                        }`}
                      >
                        {nf.nfeProc?.NFe?.infNFe?.emit?.enderEmit?.UF}/
                        {nf.nfeProc?.NFe?.infNFe?.dest?.enderDest?.UF}
                      </p>
                    </td>

                    <td className="pl-2 py-2 border-b border-gray-400 bg-gray-300 text-sm ">
                      <p className="text-gray-900 whitespace-no-wrap">
                        {nf.nfeProc?.NFe?.infNFe?.emit?.xNome}
                      </p>
                    </td>

                    <td className="pl-2 py-2 border-b border-gray-400 bg-gray-300 text-sm">
                      <div className="flex flex-row justify-center">
                        <p className="text-gray-900 text-center">
                          {nf.nfeProc?.NFe?.infNFe?.det?.length}
                        </p>
                      </div>
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
