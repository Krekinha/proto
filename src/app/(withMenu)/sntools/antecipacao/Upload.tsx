"use client";
import { ChangeEvent, useEffect, useState } from "react";
import { useSNToolsContext } from "@/context/SNToolsContext";
import { BtnUpload } from "../../layout/BtnUpload";
import { INfeGroup, nbmST, NF } from "@/utils/types";
import { formatarData, formatarDataByMY } from "@/utils/format";
import { FaSearch } from "react-icons/fa";
import LoadingSkeleton from "../../layout/LoadingSkeleton";
import axios from "axios";
import Backbar from "../../layout/Backbar";
import { nbmSTService } from "@/services/nbmSTService";
import moment from "moment";

interface props {
  nbmsst: nbmST[];
  isLoadingNbms: boolean;
}

export default function Upload({ nbmsst, isLoadingNbms}: props) {
  const { grpNfes, setGrpNfes, setSelectedNfes, setOpenTab } =
    useSNToolsContext();
  const [isUploadingXmls, setIsUploadingXmls] = useState(false);

  const handleFileChange = async (e: ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    handleUploadClick(files);
  };

  const handleFileAddChange = (e: ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);

    handleUploadClick(files, true);
  };

  const handleUploadClick = async (files: File[], add?: boolean) => {
    if (files.length <= 0) {
      return;
    }
    setIsUploadingXmls(true);

    //Cria um novo objeto FormData e anexa arquivos
    const data = new FormData();

    files.forEach((file, i) => {
      data.append(`f-${i}`, file, file.name);
    });

    const res = await axios
      .post("https://httpbin.org/post", data)
      .then((res) => res);

    const xmls: string[] = [];
    const nfes: NF[] = [];

    for (var i in res.data.files) {
      xmls.push(res.data.files[i]);
    }

    xmls.forEach((xml, i) => {
      const { XMLParser } = require("fast-xml-parser");

      const alwaysArray = ["nfeProc.NFe.infNFe.det"];

      const options = {
        ignoreDeclaration: true,
        numberParseOptions: {
          eNotation: false, //Não converte valores longos (ex: chave da nfe) em notação exponential, deixando como string
        },
        isArray: (
          name: string,
          path: string, //path é o caminho completo até o atributo, neste caso: nfeProc.NFe.infNFe.det
          isLeafNode: boolean,
          isAttribute: boolean
        ) => {
          if (alwaysArray.indexOf(path) !== -1) return true;
        },
      };

      const parser = new XMLParser(options);
      let nfe: NF = parser.parse(xml);

      if (nfe.nfeProc?.NFe?.infNFe) {
        nfe.nfeProc.NFe.infNFe.paramsNFe = {
          countItens: nfe.nfeProc?.NFe?.infNFe?.det?.length,
        };
      }

      if (nbmsst && nbmsst.length > 0) {
        nfe.nfeProc?.NFe?.infNFe?.det?.forEach((item) => {
          const nbms = nbmSTService.checkST(item?.prod?.NCM || "", nbmsst);
          if (nbms !== false && nbms.length > 0) {
            item!.nbmST = nbms;
          }
        });
      }

      nfes.push(nfe);
    });

    if (add) {
      grpNfes.map((nf, i) => {
        nf.nfs.map((n) => {
          nfes.push(n);
        });
      });
    }

    const groupedNfes = groupByCNPJDestino(nfes);

    setGrpNfes(groupedNfes);
    setIsUploadingXmls(false);
  };

  function groupByCNPJDestino(notas: NF[]) {
    var groupBy = require("lodash.groupby");

    const result = groupBy(
      notas,
      (nf: NF) => nf.nfeProc?.NFe?.infNFe?.dest?.CNPJ
    );

    const group: INfeGroup[] = [];

    for (var i in result) {
      group.push({ key: i, nfs: Array.from(result[i]) });
    }

    return group;
  }

  function chekIsGroupNfesEmpty(notas: INfeGroup[]) {
    if (!notas || notas.length <= 0) return true;
    else return false;
  }

  function sumValNFs(notas: NF[]) {
    let sum = 0;
    notas.forEach(
      (nf) =>
        (sum +=
          (nf.nfeProc?.NFe?.infNFe?.total?.ICMSTot?.vNF &&
            parseFloat(nf.nfeProc?.NFe?.infNFe?.total?.ICMSTot?.vNF)) ||
          0)
    );

    return sum.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
  }

  function distincDataEmissao(notas: NF[]) {
    const unique = [
      ...new Set(
        notas.map(
          (item) =>
            item.nfeProc?.NFe?.infNFe?.ide?.dhEmi &&
            formatarDataByMY(item.nfeProc?.NFe?.infNFe?.ide?.dhEmi)
        )
      ),
    ];

    if (unique.length == 1) {
      return unique[0];
    } else if (unique.length > 1) {
      return "VÁRIOS";
    } else {
      return "";
    }
  }

  const makeDetail = (notas: NF[]) => {
    setSelectedNfes(notas);
    setOpenTab(2);
  };

  const teste = () => {
    /*const xml = `
    <protNFe versao="4.00">
      <chNFe>29230104484757000159550010000288641071645755</chNFe>
    </protNFe>`;

    const { XMLParser } = require("fast-xml-parser");

    const options = {
      ignoreDeclaration: true,
      numberParseOptions: {
        eNotation: false,
      },
    };

    const parser = new XMLParser(options);
    const nfe = parser.parse(xml);
    console.log(nfe);*/

    const data = "2023-03-15T09:42:20-03:00";

    const diaVencimento = 6;
    const mesVencimento = moment(data).month() + 2; // no javascript, o més começa a contar com 0
    const anoVencimento = moment(data).year();
    const dataVencimento = new Date(
      anoVencimento,
      mesVencimento,
      diaVencimento
    );

    const diaDaSemana = moment(dataVencimento).isoWeekday();

    //console.log(diaDaSemana);

    if (diaDaSemana === 6) {
      dataVencimento.setDate(dataVencimento.getDate() - 1); // é sábado, então subtrai 1 dia
    }

    if (diaDaSemana === 7) {
      dataVencimento.setDate(dataVencimento.getDate() - 2); // é domingo, então subtrai 2 dias
    }
    moment.updateLocale("pt-br", {
      weekdays: [
        "Domingo",
        "Segunda",
        "Terça",
        "Quarta",
        "Quinta",
        "Sexta",
        "Sábado",
      ],
    });
    console.log(
      formatarData(dataVencimento),

      moment(dataVencimento).format("dddd")
    );
  };

  return (
    <>
      <div>
        <div className="flex items-center justify-end gap-2">
          <div>
            <Backbar />
          </div>
          <div>
            <BtnUpload
              bgColor="green"
              fileExt=".xml"
              isMultiple={true}
              fileChange={handleFileChange}
              disabled={isLoadingNbms || isUploadingXmls}
              title="Importar xmls das notas"
            >
              Importar notas
            </BtnUpload>
          </div>
          <div>
            <BtnUpload
              bgColor="blue"
              fileExt=".xml"
              isMultiple={true}
              fileChange={handleFileAddChange}
              title="Adionar notas à lista"
              disabled={chekIsGroupNfesEmpty(grpNfes)}
            >
              <span className="text-lg select-none">+</span>
            </BtnUpload>
          </div>
        </div>

        {!isLoadingNbms && !isUploadingXmls ? (
          <div className="py-4 overflow-x-auto">
            <div className="inline-block min-w-full shadow overflow-hidden rounded-lg">
              <table
                hidden={chekIsGroupNfesEmpty(grpNfes)}
                className="min-w-full leading-normal w-full bg-gray-800"
              >
                <thead className="border-b bg-zinc-900 w-full">
                  <tr>
                    <th
                      scope="col"
                      className="pl-5 py-2 border-b border-gray-200 text-white  text-left text-sm uppercase font-normal"
                    >
                      Destinatário
                    </th>
                    <th
                      scope="col"
                      className="pl-2 py-3  border-b border-gray-200 text-white  text-center text-sm uppercase font-normal"
                    >
                      Qtd. Notas
                    </th>
                    <th
                      scope="col"
                      className="pl-2 py-3  border-b border-gray-200 text-white  text-center text-sm uppercase font-normal"
                    >
                      Val. Total
                    </th>
                    <th
                      scope="col"
                      className="pl-2 py-3  border-b border-gray-200 text-white text-center text-sm uppercase font-normal"
                    >
                      Mês/Ano
                    </th>
                    <th
                      scope="col"
                      className="pr-5 py-3 border-b border-gray-200 text-white text-right text-sm uppercase font-normal h-full"
                    >
                      Detalhe
                    </th>
                  </tr>
                </thead>

                <tbody>
                  {grpNfes &&
                    grpNfes.map((nf, i) => (
                      <tr key={i}>
                        <td className="px-5 py-2 border-b border-gray-400 bg-gray-300 text-sm">
                          <p className="text-gray-900 whitespace-no-wrap">
                            {nf.nfs[0].nfeProc?.NFe?.infNFe?.dest?.xNome}
                          </p>
                        </td>
                        <td className="px-5 py-2 border-b border-gray-400 bg-gray-300 text-sm text-center">
                          <p className="text-gray-900 whitespace-no-wrap">
                            {nf.nfs.length}
                          </p>
                        </td>
                        <td className="px-5 py-2 border-b border-gray-400 bg-gray-300 text-sm text-center">
                          <p className="text-gray-900 whitespace-no-wrap">
                            {sumValNFs(nf.nfs)}
                          </p>
                        </td>
                        <td className="px-5 py-2 border-b border-gray-400 bg-gray-300 text-sm">
                          <p
                            className={`${
                              distincDataEmissao(nf.nfs) == "VÁRIOS"
                                ? "text-red-100 text-center whitespace-no-wrap bg-red-500 rounded-lg text-[0.75em] px-1"
                                : "text-gray-900 whitespace-no-wrap text-center"
                            }`}
                          >
                            {distincDataEmissao(nf.nfs)}
                          </p>
                        </td>
                        <td className="px-5 py-2 border-b border-gray-400 bg-gray-300 text-sm">
                          <div className="flex flex-row justify-end">
                            <div className="flex">
                              <button
                                type="button"
                                onClick={() => {
                                  makeDetail(nf.nfs);
                                }}
                                className="bg-green-600 text-white active:bg-red-600 font-bold uppercase px-3 py-2 rounded shadow hover:shadow-md hover:bg-green-700 outline-none focus:outline-none focus:bg-green-800 mr-1 mb-1 ease-linear transition-all duration-150"
                              >
                                <FaSearch />
                              </button>
                            </div>
                          </div>
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          </div>
        ) : (
          <div>
            <div>
              <LoadingSkeleton model={1} />
            </div>
          </div>
        )}
      </div>
    </>
  );
}
