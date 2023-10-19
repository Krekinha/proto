"use client";
import { tabAnexo3SN } from "@/utils/constants";
import { Field, Form, Formik } from "formik";
import { ChangeEvent, useRef, useState } from "react";
import axios from "axios";
import { ToastContainer } from "react-toastify";
import { notifyService } from "@/services/notifyService";
import * as Yup from "yup";
import { useSNToolsContext } from "@/context/SNToolsContext";
import { HelpButton } from "../../layout/HelpButton";

interface ProtoExtrato {
  empresa?: string;
  cnpj?: string;
  pa?: string;
  rbt12?: number;
}

const issSchema = Yup.object()
  .shape({
    rbt12: Yup.string().matches(
      /^[0-9]*[.,]?[0-9]*[,]?[0-9]{1,2}$/,
      "Somente números"
    ),
    // [0-9]* => digitos em qualquer quantidade
    // [.,]? => seguido ou não de (dot) ou (comma)
    // [0-9]* => seguido de digitos em qualquer quantidade
    // [,]? => seguido ou não de (comma)
    // [0-9]{1,2} => seguido obrigatoriamente de 1 ou 2 dígitos
    // ex: 1,2 ou 10.5 ou 45.004,37
  })
  .required();

export default function ISSRetencao() {
  const tabAnexo3 = tabAnexo3SN();
  const [itemExtrato, setItemExtrato] = useState<ProtoExtrato>({});
  const [issRetencao, setIssRetencao] = useState<number>(0);

  const handleFileChange = async (e: ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    const pdfBuff = await streamPDF(files[0]);

    if (pdfBuff != "err") {
      const itemsText: string[] | string = await parsePDF(pdfBuff);

      if (itemsText != "err") {
        const mappedItems: ProtoExtrato | string = mapItemsPdf(
          itemsText as string[]
        );
        if (mappedItems != "err") {
          const mapped = mappedItems as ProtoExtrato;
          setItemExtrato(mapped);
          setIssRetencao(calcRetencaoISS(mapped.rbt12?.toString() || "0"));
        } else {
          notifyService.error("Erro ao importar arquivo");
        }
      } else {
        notifyService.error("Erro ao importar arquivo");
      }
    } else {
      notifyService.error("Erro ao importar arquivo");
    }
  };

  async function streamPDF(file: any) {
    if (file.size > 30000) return "err";

    const data = new FormData();

    data.append(`f-${file}`, file, file.name);

    const res = await axios
      .post("https://httpbin.org/post", data)
      .then((res) => res);

    let pdf = {};

    for (var i in res.data.files) {
      pdf = res.data.files[i];
    }

    return pdf;
  }

  function faixaSN(rbt12: number) {
    const faixa = tabAnexo3.find(
      (fax) => fax.rbt12Min <= rbt12 && fax.rbt12Max >= rbt12
    );
    return faixa;
  }

  function strToFloat(str: string) {
    const arr = Array.from(str);

    if (arr[arr.length - 2] == "," || arr[arr.length - 2] == ".") {
      arr[arr.length - 2] = "*";
    }

    if (arr[arr.length - 3] == "," || arr[arr.length - 3] == ".") {
      arr[arr.length - 3] = "*";
    }
    const trat = arr
      .join("")
      .replace(/,/g, "") //todas as ',' por ''
      .replace(/\./g, "") //todos as '.' por ''
      .replace("*", ".");

    return parseFloat(trat);
  }

  function calcRetencaoISS(rbt12: string) {
    if (rbt12 == "") return 0;
    //const valRBT12 = parseFloat(rbt12);
    console.log("str:", rbt12);
    const valRBT12 = strToFloat(rbt12);
    const maxISS = 0.05;
    console.log("valRBT12:", valRBT12);

    if (isNaN(valRBT12)) return -1;

    const faixa = faixaSN(valRBT12);
    console.log("faixa:", faixa);
    if (faixa?.faixa == "6" || valRBT12 > (faixa?.rbt12Max || 0)) return maxISS;

    const percISS = (faixa?.aliqNominalISS || 0) / 100;
    const aliqNomSN = (faixa?.aliqNominalSN || 0) / 100;
    const valDeduzir = faixa?.valDeduzir || 0;

    const aliqSN = (valRBT12 * aliqNomSN - valDeduzir) / valRBT12;
    const aliqISS = (aliqSN / 100) * percISS * 100;

    if (aliqISS * 100 > 5) return maxISS;

    return aliqISS;
  }

  async function parsePDF(pdf: any) {
    const pdfjs = window.pdfjsLib;
    const _ = require("lodash");

    const loadingTask = pdfjs.getDocument(pdf);

    let items: string[] = [];

    const parsed = await loadingTask.promise;

    if (parsed.numPages > 3) return "err";
    const pageList = await Promise.all(
      Array.from({ length: parsed.numPages }, (_, i) => parsed.getPage(i + 1))
    );
    const pdfItems = await Promise.all(
      pageList.map((p) =>
        p.getTextContent().then((content: any) => {
          content.items.map((item: any) => {
            items.push(item.str);
            return {
              str: item.str,
              transform: item.transform,
            } as ProtoExtrato;
          });
        })
      )
    );

    return items;
  }

  function searchStringInArray(strArray: string[], str: string) {
    for (var j = 0; j < strArray.length; j++) {
      if (strArray[j].match(str)) return j;
    }
    return -1;
  }

  function mapItemsPdf(items: string[]) {
    const mapExtrato = {
      _empresa: "Nome Empresarial: ",
      _cnpj: "CNPJ Estabelecimento: ",
      _pa: "Período de Apuração ",
      _rbt12: "(RBT12)",
    };

    try {
      //empresa
      const _empresaIndex = searchStringInArray(items, mapExtrato._empresa);
      if (_empresaIndex < 0) return "err";
      const empresa = items[_empresaIndex].replace(mapExtrato._empresa, "");

      //cnpj
      const _cnpjIndex = searchStringInArray(items, mapExtrato._cnpj);
      const cnpj = items[_cnpjIndex].replace(mapExtrato._cnpj, "");

      //pa
      const _paIndex = searchStringInArray(items, mapExtrato._pa);
      const pa = items[_paIndex].replace("Período de Apuração (PA): ", "");

      //rbt12
      const _rbt12Index = searchStringInArray(items, mapExtrato._rbt12);
      const rbt12 = parseFloat(items[_rbt12Index + 3]);

      return {
        empresa: empresa,
        cnpj: cnpj,
        pa: pa,
        rbt12: rbt12,
      } as ProtoExtrato;
    } catch (e) {
      return "err";
    }
  }

  return (
    <>
      <div className="flex mx-3 mb-3">
        <ToastContainer />
        <div className="flex justify-end">
          <Formik
            initialValues={{
              radImpInf: "inform",
              rbt12: "0,00",
            }}
            validateOnChange
            validationSchema={issSchema}
            onSubmit={async (values) => {
              if (values.radImpInf == "import") {
                setIssRetencao(
                  calcRetencaoISS(itemExtrato.rbt12?.toString() || "0")
                );
              } else {
                setIssRetencao(calcRetencaoISS(values.rbt12.toString()));
              }
            }}
          >
            {(props) => (
              <Form>
                <div className="grid grid-cols-2 space-y-3">
                  {/*IMPORT GROUP*/}
                  <div className="col-span-1 max-sm:col-span-2 space-y-2">
                    {/*RADIOS*/}
                    <div
                      onChange={() => {
                        setIssRetencao(0);
                        setItemExtrato({});
                        if (props.values.radImpInf == "inform") {
                          props.setFieldValue("rbt12", "");
                        }
                      }}
                      role="groupImportOrInform"
                      aria-labelledby="radio-groupImpInf"
                      className="flex items-center gap-4"
                    >
                      {/*RAD RBT12*/}
                      <label>
                        <div className="flex">
                          <Field
                            type="radio"
                            name="radImpInf"
                            value="inform"
                            className="radio checked:bg-blue-600 w-[15px] h-[15px]"
                          />
                          <div className="ml-1">
                            <div className="text-gray-400 text-[0.75em]">
                              Informar RBT12
                            </div>
                          </div>
                        </div>
                      </label>

                      {/*RAD IMPORTAR EXTRATO*/}
                      <label>
                        <div className="flex">
                          <Field
                            type="radio"
                            name="radImpInf"
                            value="import"
                            className="radio checked:bg-blue-600 w-[15px] h-[15px]"
                          />
                          <div className="ml-1">
                            <div className="text-gray-400 text-[0.75em]">
                              Importar extrato
                            </div>
                          </div>
                        </div>
                      </label>
                    </div>

                    {/*BUTTON IMPORTAR*/}
                    <div className="flex">
                      <label
                        title="Importar extrato do Simples Nacional"
                        hidden={
                          props.values.radImpInf == "import" ? false : true
                        }
                        className="bg-green-600 text-white active:bg-green-800 hover:bg-green-700 
                         font-semibold rounded shadow-md hover:shadow-lg focus:shadow-lg focus:bg-green-700 ease-linear transition-all 
                         cursor-pointer duration-150 px-3"
                      >
                        <span className="text-sm font-semibold text-white">
                          Importar
                        </span>
                        <input
                          type="file"
                          accept=".pdf"
                          className="hidden"
                          onChange={handleFileChange}
                        />
                      </label>
                    </div>
                  </div>

                  {/*DADOS IMPORT*/}
                  <div
                    hidden={
                      itemExtrato.rbt12 == null ||
                      itemExtrato.rbt12 == undefined ||
                      isNaN(itemExtrato.rbt12)
                        ? true
                        : false
                    }
                    className="col-span-1 col-start-1 max-sm:col-span-2"
                  >
                    <div className="sm:flex">
                      <div className="px-4 py-3 rounded-lg shadow-lg shadow-black bg-slate-900">
                        <div className="flex-col">
                          <div className="flex items-center align-middle">
                            <span className="text-amber-600 text-[0.70rem] font-medium">
                              EMPRESA:
                            </span>
                            <span className="text-amber-300 text-[0.70rem] font-medium ml-3">
                              {itemExtrato.empresa}
                            </span>
                          </div>

                          <div className="flex items-center align-middle">
                            <span className="text-amber-600 text-[0.70rem] font-medium">
                              CNPJ:
                            </span>
                            <span className="text-amber-300 text-[0.70rem] font-medium ml-3">
                              {itemExtrato.cnpj}
                            </span>
                            <span className="text-amber-600 text-[0.70rem] font-medium ml-3">
                              PA:
                            </span>
                            <span className="text-amber-300 text-[0.70rem] font-medium ml-2">
                              {itemExtrato.pa}
                            </span>
                          </div>

                          <div className="flex items-center align-middle mt-2">
                            <span className="text-amber-600 text-[0.70rem] font-medium">
                              RBT12:
                            </span>
                            <span className="text-green-500 text-[0.70rem] font-bold ml-3">
                              {itemExtrato.rbt12}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* RBT12 */}
                  <div className="col-span-1 col-start-1">
                    <div className="flex flex-col">
                      <div className="flex items-center space-x-1">
                        <label
                          htmlFor="rbt12"
                          className="text-gray-400 text-[0.75rem] ml-[0.35rem] mb-[0.15rem]"
                          title="Receita bruta acumulada nos doze meses anteriores ao PA"
                        >
                          RBT12
                          <span className="text-red-500 required-dot">*</span>
                        </label>
                        <div>
                          <HelpButton />
                        </div>
                      </div>

                      <Field
                        type="text"
                        id="rbt12"
                        name="rbt12"
                        disabled={
                          props.values.radImpInf == "import" ? true : false
                        }
                        autoComplete="off"
                        placeholder="Receita bruta acumulada"
                        className="rounded-lg border-transparent flex-1 w-max appearance-none 
                                   border border-gray-300 py-1 px-3 bg-white text-gray-700
                                   placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 
                                   focus:ring-purple-600 focus:border-transparent
                                   disabled:bg-gray-500"
                      />
                      <span className="text-red-500 text-[0.75rem] ml-[0.35rem] mb-[0.15rem]">
                        {props.errors.rbt12}
                      </span>
                    </div>
                  </div>

                  {/* TABELA FAIXAS SN*/}
                  <div
                    hidden={
                      issRetencao <= 0 ||
                      issRetencao == null ||
                      issRetencao == undefined ||
                      isNaN(issRetencao)
                        ? true
                        : false
                    }
                    className="col-span-2 mr-2"
                  >
                    <table className="table-auto">
                      <thead className="text-blue-700 bg-gray-900">
                        <tr>
                          <th
                            scope="col"
                            className="border-b border-blue-600 text-center text-[0.86rem] uppercase font-bold"
                          >
                            Faixa
                          </th>
                          <th
                            scope="col"
                            className="border-b pl-2 border-blue-600 text-center text-[0.86rem] uppercase font-bold"
                          >
                            Alíq SN
                          </th>
                          <th
                            scope="col"
                            className="border-b pl-2 border-blue-600 text-center text-[0.86rem] uppercase font-bold"
                          >
                            Dedução
                          </th>
                          <th
                            scope="col"
                            className="border-b pl-2 border-blue-600 text-center text-[0.86rem] uppercase font-bold"
                          >
                            RBT12 (Min/Max)
                          </th>
                          <th
                            scope="col"
                            className="border-b pl-2 border-blue-600 text-center text-[0.86rem] uppercase font-bold"
                          >
                            Perc. ISS
                          </th>
                        </tr>
                      </thead>

                      <tbody>
                        {tabAnexo3 &&
                          tabAnexo3.map((itemAnex, i) => (
                            <tr key={i} className="text-gray-400 font-semibold">
                              <td
                                className={`${
                                  itemAnex.faixa ===
                                  faixaSN(
                                    props.values.radImpInf == "import"
                                      ? strToFloat(
                                          itemExtrato?.rbt12?.toString() || "0"
                                        )
                                      : strToFloat(props.values.rbt12)
                                  )?.faixa
                                    ? "px-3 text-center border-b border-gray-500 text-[0.75em] bg-green-400 rounded-l-full text-slate-900 font-bold"
                                    : "px-3 text-center border-b border-gray-500 text-[0.75em]"
                                }`}
                              >
                                <p>{itemAnex.faixa}</p>
                              </td>

                              <td
                                className={`${
                                  itemAnex.faixa ===
                                  faixaSN(
                                    props.values.radImpInf == "import"
                                      ? strToFloat(
                                          itemExtrato?.rbt12?.toString() || "0"
                                        )
                                      : strToFloat(props.values.rbt12)
                                  )?.faixa
                                    ? "px-3 text-center border-b border-gray-500 text-[0.75em] bg-green-400 text-slate-900 font-bold"
                                    : "px-3 text-center border-b border-gray-500 text-[0.75em]"
                                }`}
                              >
                                <p className="">{itemAnex.aliqNominalSN}</p>
                              </td>

                              <td
                                className={`${
                                  itemAnex.faixa ===
                                  faixaSN(
                                    props.values.radImpInf == "import"
                                      ? strToFloat(
                                          itemExtrato?.rbt12?.toString() || "0"
                                        )
                                      : strToFloat(props.values.rbt12)
                                  )?.faixa
                                    ? "px-3 text-center border-b border-gray-500 text-[0.75em] bg-green-400 text-slate-900 font-bold"
                                    : "px-3 text-center border-b border-gray-500 text-[0.75em]"
                                }`}
                              >
                                <a className="">
                                  {" "}
                                  {itemAnex.valDeduzir.toLocaleString("pt-BR", {
                                    style: "currency",
                                    currency: "BRL",
                                  }) || "0,00"}
                                </a>
                              </td>

                              <td
                                className={`${
                                  itemAnex.faixa ===
                                  faixaSN(
                                    props.values.radImpInf == "import"
                                      ? strToFloat(
                                          itemExtrato?.rbt12?.toString() || "0"
                                        )
                                      : strToFloat(props.values.rbt12)
                                  )?.faixa
                                    ? "px-3 text-center border-b border-gray-500 text-[0.75em] bg-green-400 text-slate-900 font-bold"
                                    : "px-3 text-center border-b border-gray-500 text-[0.75em]"
                                }`}
                              >
                                <a className="">
                                  {" "}
                                  {itemAnex.rbt12Min.toLocaleString("pt-BR", {
                                    style: "currency",
                                    currency: "BRL",
                                  }) || "0,00"}
                                  {" a "}
                                  {itemAnex.rbt12Max.toLocaleString("pt-BR", {
                                    style: "currency",
                                    currency: "BRL",
                                  }) || "0,00"}
                                </a>
                              </td>

                              <td
                                className={`${
                                  itemAnex.faixa ===
                                  faixaSN(
                                    props.values.radImpInf == "import"
                                      ? strToFloat(
                                          itemExtrato?.rbt12?.toString() || "0"
                                        )
                                      : strToFloat(props.values.rbt12)
                                  )?.faixa
                                    ? "px-3 text-center border-b border-gray-500 text-[0.75em] rounded-r-full bg-green-400 text-slate-900 font-bold"
                                    : "px-3 text-center border-b border-gray-500 text-[0.75em]"
                                }`}
                              >
                                <p className="">{itemAnex.aliqNominalISS}</p>
                              </td>
                            </tr>
                          ))}
                      </tbody>
                    </table>
                  </div>

                  {/* CARD ALIQ ISS */}
                  <div className="col-span-1 col-start-1 max-sm:col-span-2">
                    <div className="flex">
                      <div>
                        <button
                          type="submit"
                          disabled={
                            props.values.radImpInf == "import" ? true : false
                          }
                          className="bg-green-600  text-white  active:bg-green-800 hover:bg-green-700 font-semibold rounded
                          shadow-black shadow-md hover:shadow-lg focus:shadow-lg focus:bg-green-700 ease-linear transition-all 
                         cursor-pointer duration-150 px-4 py-1 disabled:bg-gray-600 disabled:text-gray-400 disabled:shadow-none 
                         disabled:cursor-default"
                        >
                          Calcular
                        </button>
                      </div>

                      <div className="flex ml-3">
                        <div className="flex-col px-4 py-1 mr-3 rounded shadow-md shadow-black bg-slate-900">
                          <div className="flex">
                            <div className="flex items-center align-middle">
                              <span className="text-amber-600 text-sm font-medium">
                                ALÍQ. ISS:
                              </span>
                              <span
                                id="iss"
                                itemID="iss"
                                className="text-amber-300 text-md font-medium ml-3"
                              >
                                {issRetencao.toLocaleString("pt-BR", {
                                  style: "percent",
                                  minimumFractionDigits: 2,
                                })}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </>
  );
}
