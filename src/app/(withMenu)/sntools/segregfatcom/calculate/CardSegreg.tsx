"use client";
import { useSNToolsContext } from "@/context/SNToolsContext";
import { det, nbmST } from "@/utils/types";
import { Formik, Field, Form } from "formik";
import { nbmSTService } from "@/services/nbmSTService";

interface props {
  nbmsst: nbmST[];
  isLoadingNbms: boolean;
}

export default function CardSegreg({ nbmsst, isLoadingNbms }: props) {
  const { ncmsMonofasicos, selectedNfes, totals, setOpenTab } =
    useSNToolsContext();

  function checkMono(ncmx: string) {
    const ncm = ncmx.toString();
    if (ncm.length <= 0) return false;

    const res = ncmsMonofasicos.find(
      (e) =>
        (e.ncm.length == 2 && e.ncm == ncm.substring(0, 2)) ||
        (e.ncm.length == 3 && e.ncm == ncm.substring(0, 3)) ||
        (e.ncm.length == 4 && e.ncm == ncm.substring(0, 4)) ||
        (e.ncm.length == 5 && e.ncm == ncm.substring(0, 5)) ||
        (e.ncm.length == 6 && e.ncm == ncm.substring(0, 6)) ||
        (e.ncm.length == 7 && e.ncm == ncm.substring(0, 7)) ||
        (e.ncm.length == 8 && e.ncm == ncm)
    )
      ? true
      : false;
    return res;
  }

  function getPrdSTConfirm() {
    let prodsStC: det[] = [];
    let sum = 0;

    selectedNfes.forEach((nf) => {
      nf.nfeProc?.NFe?.infNFe?.det?.forEach((prod) => {
        const ncm = prod.prod?.NCM || "";
        const calcST = prod.calcAntecipacao;
        const vprod = parseFloat(prod.prod?.vProd || "") || 0;
        const vdesc = parseFloat(prod.prod?.vDesc || "") || 0;

        prod.nNF = nf.nfeProc?.NFe?.infNFe?.ide?.nNF;
        const nbms = nbmSTService.checkST(ncm || "", nbmsst);
        if (
          nbms !== false &&
          nbms.length > 0 &&
          calcST?.tipoCalculo !== "nenhum"
        ) {
          prodsStC.push(prod);
          sum += vprod - vdesc;
        }
      });
    });

    return { prodsStC, sum };
  }

  function getPrdSTParam() {
    let prodsStP: det[] = [];
    let sum = 0;

    selectedNfes.forEach((nf) => {
      nf.nfeProc?.NFe?.infNFe?.det?.forEach((prod) => {
        const cfop = prod.prod?.CFOP || "";
        const vprod = parseFloat(prod.prod?.vProd || "") || 0;
        const vdesc = parseFloat(prod.prod?.vDesc || "") || 0;

        if (cfop.toString().startsWith("54")) {
          prodsStP.push(prod);
          sum += vprod - vdesc;
        }
      });
    });

    return { prodsStP, sum };
  }

  function getPrdMonoConfirm() {
    let prods: det[] = [];
    let sum = 0;

    selectedNfes.forEach((nf) => {
      nf.nfeProc?.NFe?.infNFe?.det?.forEach((prod) => {
        const ncm = prod.prod?.NCM || "";
        const vprod = parseFloat(prod.prod?.vProd || "") || 0;
        const vdesc = parseFloat(prod.prod?.vDesc || "") || 0;
        prod.nNF = nf.nfeProc?.NFe?.infNFe?.ide?.nNF;
        if (checkMono(ncm)) {
          prods.push(prod);
          sum += vprod - vdesc;
        }
      });
    });

    return { prods, sum };
  }

  function getPrdMonoParam() {
    let prods: det[] = [];
    let sum = 0;

    selectedNfes.forEach((nf) => {
      nf.nfeProc?.NFe?.infNFe?.det?.forEach((prod) => {
        const cst = prod.imposto?.PIS?.PISNT?.CST || "";
        const ncm = prod.prod?.NCM || "";
        const vprod = parseFloat(prod.prod?.vProd || "") || 0;
        const vdesc = parseFloat(prod.prod?.vDesc || "") || 0;

        if (cst.toString().startsWith("4")) {
          prod.isMonofasico = checkMono(ncm);
          prods.push(prod);
          sum += vprod - vdesc;
        }
      });
    });

    return { prods, sum };
  }

  function getComSTComMono(paramST: string, paramMono: string) {
    let prods = [];

    if (paramST != "param") {
      prods = getPrdSTConfirm().prodsStC;
    } else {
      prods = getPrdSTParam().prodsStP;
    }

    let sum = 0;

    prods.forEach((prod) => {
      const cst = prod.imposto?.PIS?.PISNT?.CST || "";
      const ncm = prod.prod?.NCM || "";
      const vprod = parseFloat(prod.prod?.vProd || "") || 0;
      const vdesc = parseFloat(prod.prod?.vDesc || "") || 0;
      if (paramMono == "param" && cst.toString().startsWith("4")) {
        sum += vprod - vdesc;
      }
      if (paramMono == "confirm") {
        if (checkMono(ncm)) {
          sum += vprod - vdesc;
        }
      }
    });

    return sum;
  }

  function getComSTSemMono(paramST: string, paramMono: string) {
    let prods = [];

    if (paramST != "param") {
      prods = getPrdSTConfirm().prodsStC;
    } else {
      prods = getPrdSTParam().prodsStP;
    }

    let sum = 0;

    prods.forEach((prod) => {
      const cst = prod.imposto?.PIS?.PISNT?.CST || "";
      const ncm = prod.prod?.NCM || "";
      const vprod = parseFloat(prod.prod?.vProd || "") || 0;
      const vdesc = parseFloat(prod.prod?.vDesc || "") || 0;
      if (paramMono == "param" && !cst.toString().startsWith("4")) {
        sum += vprod - vdesc;
      }
      if (paramMono == "confirm" && !checkMono(ncm)) {
        sum += vprod - vdesc;
      }
    });

    return sum;
  }

  function getSemSTComMono(paramST: string, paramMono: string) {
    let prodsMono = [];
    let prodsMonoSemST: any = [];

    if (paramMono != "param") {
      prodsMono = getPrdMonoConfirm().prods;
    } else {
      prodsMono = getPrdMonoParam().prods;
    }

    let sum = 0;

    prodsMono.forEach((prod) => {
      const ncm = prod.prod?.NCM || "";
      const cfop = prod.prod?.CFOP || "";
      const vprod = parseFloat(prod.prod?.vProd || "") || 0;
      const vdesc = parseFloat(prod.prod?.vDesc || "") || 0;
      const nbms = nbmSTService.checkST(ncm, nbmsst);

      if (paramST == "param" && !cfop.toString().startsWith("54")) {
        sum += vprod - vdesc;
        prodsMonoSemST.push(prod);
      }
      if (paramST == "confirm" && (nbms == false || nbms.length <= 0)) {
        sum += vprod - vdesc;
        prodsMonoSemST.push(prod);
      }
    });

    return sum;
  }

  function getSemSTSemMono(paramST: string, paramMono: string) {
    const faturamento = totals?.valFaturamento || 0;

    return (
      faturamento -
      getComSTComMono(paramST, paramMono) -
      getComSTSemMono(paramST, paramMono) -
      getSemSTComMono(paramST, paramMono)
    );
  }

  function getRecSTeOuMono(paramST: string, paramMono: string) {
    const stOuMono =
      getComSTComMono(paramST, paramMono) +
      getComSTSemMono(paramST, paramMono) +
      getSemSTComMono(paramST, paramMono);
    return stOuMono;
  }

  const changeParamsSTMono = (values: {
    valueST: string;
    valueMono: string;
  }) => {
    getComSTComMono(values.valueST, values.valueMono);
    getComSTSemMono(values.valueST, values.valueMono);
    getSemSTComMono(values.valueST, values.valueMono);
    getSemSTSemMono(values.valueST, values.valueMono);
  };

  return (
    <>
      <div>
        <Formik
          initialValues={{
            valueST: "param",
            valueMono: "param",
          }}
          onSubmit={async (values) => {
            changeParamsSTMono(values);
          }}
        >
          {({ values }) => (
            <Form>
              <div className="flex flex-col p-6 rounded-lg shadow-lg shadow-black bg-indigo-400">
                <div className="flex">
                  <div className=" grid items-center">
                    <span className="text-gray-900 text-md uppercase leading-tight font-semibold">
                      Receitas Segregadas SN
                    </span>
                  </div>
                </div>

                <hr className="mb-2 mt-2 border-violet-500" />

                <div className="flex flex-col">
                  <div className="items-end ml-2">
                    <a
                      title="Itens confirmados como ST conforme tabela Anexo XV"
                      className="text-gray-900 text-[0.85em] font-bold mb-4"
                    >
                      Faturamento:
                    </a>
                    <a className="text-blue-900 text-[0.85em] font-bold">
                      {" "}
                      {totals.valFaturamento?.toLocaleString("pt-BR", {
                        style: "currency",
                        currency: "BRL",
                      }) || "0,00"}
                    </a>
                  </div>

                  <div className="items-end ml-2">
                    <a
                      title="Itens confirmados como ST conforme tabela Anexo XV"
                      className="text-gray-900 text-[0.85em] font-bold mb-4"
                    >
                      ST e/ou Mono:
                    </a>
                    <a className="text-blue-900 text-[0.85em] font-bold">
                      {" "}
                      {getRecSTeOuMono(
                        values.valueST,
                        values.valueMono
                      ).toLocaleString("pt-BR", {
                        style: "currency",
                        currency: "BRL",
                      }) || "0,00"}
                    </a>
                  </div>

                  <div className="items-end ml-2">
                    <a
                      title="Itens confirmados como ST conforme tabela Anexo XV"
                      className="text-gray-900 text-[0.85em] font-bold mb-4"
                    >
                      Receita Normal:
                    </a>
                    <a className="text-green-900 text-[0.85em] font-bold">
                      {" "}
                      {getSemSTSemMono(
                        values.valueST,
                        values.valueMono
                      ).toLocaleString("pt-BR", {
                        style: "currency",
                        currency: "BRL",
                      }) || "0,00"}
                    </a>
                  </div>
                </div>

                <hr className="mb-3 mt-2 border-violet-500" />

                {/*ST GROUP*/}
                <div
                  role="groupST"
                  aria-labelledby="radio-groupST"
                  className="flex gap-4 bg-indigo-500 rounded-lg p-2 shadow-sm shadow-gray-700"
                >
                  {/* TABELA */}
                  <div className="flex justify-center">
                    <table className="table-auto">
                      <tbody>
                        <tr>
                          {/* ST CONFIRMADO */}
                          <td>
                            <label>
                              <div className="flex ml-2 items-center">
                                <Field
                                  type="radio"
                                  name="valueST"
                                  value="confirm"
                                  className="h-[15px] w-[15px]"
                                />
                                <div className="ml-2">
                                  <div className="text-gray-900 text-[0.75em] font-bold ">
                                    ST Confirmado:
                                  </div>
                                  <div className="text-red-900 text-[0.75em] font-bold ">
                                    {getPrdSTConfirm().sum.toLocaleString(
                                      "pt-BR",
                                      {
                                        style: "currency",
                                        currency: "BRL",
                                      }
                                    ) || "0,00"}
                                  </div>
                                </div>
                              </div>
                            </label>
                          </td>

                          {/* ST PARAM */}
                          <td className="pl-3">
                            <label>
                              <div className="flex items-center">
                                <Field
                                  type="radio"
                                  name="valueST"
                                  value="param"
                                  className="h-[15px] w-[15px]"
                                />
                                <div className="ml-2">
                                  <div className="text-gray-900 text-[0.75em] font-bold ">
                                    ST Param:
                                  </div>
                                  <div className="text-red-900 text-[0.75em] font-bold ">
                                    {getPrdSTParam().sum.toLocaleString(
                                      "pt-BR",
                                      {
                                        style: "currency",
                                        currency: "BRL",
                                      }
                                    ) || "0,00"}
                                  </div>
                                </div>
                              </div>
                            </label>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>

                {/*MONO GROUP*/}
                <div
                  role="groupMono"
                  aria-labelledby="radio-groupMono"
                  className="flex mt-2 gap-3 bg-violet-500 rounded-lg p-2 shadow-sm shadow-gray-700"
                >
                  {/* TABELA */}
                  <div className="flex justify-center">
                    <table className="table-auto">
                      <tbody>
                        <tr>
                          {/* MONO CONFIRMADO */}
                          <td>
                            <label>
                              <div className="flex ml-2 items-center">
                                <Field
                                  type="radio"
                                  name="valueMono"
                                  value="confirm"
                                  className="h-[15px] w-[15px]"
                                />
                                <div className="ml-2">
                                  <div className="text-gray-900 text-[0.75em] font-bold ">
                                    Mono Confirm:
                                  </div>
                                  <div className="text-red-900 text-[0.75em] font-bold ">
                                    {getPrdMonoConfirm().sum.toLocaleString(
                                      "pt-BR",
                                      {
                                        style: "currency",
                                        currency: "BRL",
                                      }
                                    ) || "0,00"}
                                  </div>
                                </div>
                              </div>
                            </label>
                          </td>

                          {/* MONO PARAM */}
                          <td className="pl-3">
                            <label className="w-1/2">
                              <div className="flex items-center">
                                <Field
                                  type="radio"
                                  name="valueMono"
                                  value="param"
                                  className="h-[15px] w-[15px]"
                                />
                                <div className="ml-2">
                                  <div className="text-gray-900 text-[0.75em] font-bold ">
                                    Mono Param:
                                  </div>
                                  <div className="text-red-900 text-[0.75em] font-bold ">
                                    {getPrdMonoParam().sum.toLocaleString(
                                      "pt-BR",
                                      {
                                        style: "currency",
                                        currency: "BRL",
                                      }
                                    ) || "0,00"}
                                  </div>
                                </div>
                              </div>
                            </label>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>

                <hr className="mb-2 mt-3 border-violet-500" />

                <div>
                  <div className="flex w-full">
                    {/* TABELA */}
                    <div className="flex justify-center">
                      <table className="table-auto">
                        <tbody>
                          {/* COM ST E COM MONO */}
                          <tr>
                            {/* DESCRICAO */}
                            <td>
                              <div>
                                <a
                                  title="Itens parametrizados como ST (CFOP 54XX)"
                                  className="text-gray-900 text-[0.75em] font-bold"
                                >
                                  <span className="text-green-100 bg-green-800 px-1 rounded-md shadow-sm shadow-black font-normal">
                                    COM
                                  </span>{" "}
                                  ST e{" "}
                                  <span className="text-green-100 bg-green-800 px-1 rounded-md shadow-sm shadow-black font-normal">
                                    COM
                                  </span>{" "}
                                  Trib. Monofásica:
                                </a>
                              </div>
                            </td>
                            {/* VALOR */}
                            <td>
                              <div className="ml-2 w-max">
                                <a className="text-pink-900 text-[0.75em] font-bold">
                                  {getComSTComMono(
                                    values.valueST,
                                    values.valueMono
                                  ).toLocaleString("pt-BR", {
                                    style: "currency",
                                    currency: "BRL",
                                  }) || "0,00"}
                                </a>
                              </div>
                            </td>
                          </tr>

                          {/* COM ST E SEM MONO */}
                          <tr>
                            {/* DESCRICAO */}
                            <td>
                              <div>
                                <a
                                  title="Itens parametrizados como ST (CFOP 54XX)"
                                  className="text-gray-900 text-[0.75em] font-bold"
                                >
                                  <span className="text-green-100 bg-green-800 px-1 rounded-md shadow-sm shadow-black font-normal">
                                    COM
                                  </span>{" "}
                                  ST e{" "}
                                  <span className="text-red-100 bg-red-800 px-1 rounded-md shadow-sm shadow-black font-normal">
                                    SEM
                                  </span>{" "}
                                  Trib. Monofásica:
                                </a>
                              </div>
                            </td>
                            {/* VALOR */}
                            <td>
                              <div className="ml-2 w-max">
                                <a className="text-pink-900 text-[0.75em] font-bold">
                                  {getComSTSemMono(
                                    values.valueST,
                                    values.valueMono
                                  ).toLocaleString("pt-BR", {
                                    style: "currency",
                                    currency: "BRL",
                                  }) || "0,00"}
                                </a>
                              </div>
                            </td>
                          </tr>

                          {/* SEM ST E COM MONO */}
                          <tr>
                            {/* DESCRICAO */}
                            <td>
                              <div>
                                <a
                                  title="Itens parametrizados como ST (CFOP 54XX)"
                                  className="text-gray-900 text-[0.75em] font-bold"
                                >
                                  <span className="text-red-100 bg-red-800 px-1 rounded-md shadow-sm shadow-black font-normal">
                                    SEM
                                  </span>{" "}
                                  ST e{" "}
                                  <span className="text-green-100 bg-green-800 px-1 rounded-md shadow-sm shadow-black font-normal">
                                    COM
                                  </span>{" "}
                                  Trib. Monofásica:
                                </a>
                              </div>
                            </td>
                            {/* VALOR */}
                            <td>
                              <div className="flex ml-2 w-max">
                                <a className="text-pink-900 text-[0.75em] font-bold">
                                  {getSemSTComMono(
                                    values.valueST,
                                    values.valueMono
                                  ).toLocaleString("pt-BR", {
                                    style: "currency",
                                    currency: "BRL",
                                  }) || "0,00"}
                                </a>
                              </div>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>

                <div>
                  <div className="flex ml-2 w-full"></div>
                </div>

                <div>
                  <div className="flex ml-2 w-full"></div>
                </div>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </>
  );
}
