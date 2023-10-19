import {
  aplicacaoST,
  paramsCalcAntecipacao,
  capituloST,
  det,
  nbmST,
  NF,
  NFResume,
} from "@/utils/types";
import { TbMath } from "react-icons/tb";
import { Badge } from "../../../layout/Badge";
import {
  formatarData,
  formatarDataByMY,
  formatDecimal,
  formatPercent,
} from "@/utils/format";
import moment from "moment";
import { Copy } from "@/app/(withMenu)/layout/Copy";
import { Accordion } from "@/app/(withMenu)/layout/Accordion";
import { ModalButton } from "@/app/(withMenu)/layout/ModalButton";
import { ReactNode } from "react";

interface ItemAntecipacaoCalculateProps {
  nf: NFResume;
  onClick?: (id: string) => void;
}

export default function ItemAntecipacaoCalculate({
  nf,
}: ItemAntecipacaoCalculateProps) {
  function formatCurrency(valor: string) {
    return parseFloat(valor).toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL",
    });
  }

  function getReceita(param: string) {
    if (param === "aliquota")
      return {
        nome: "0326-9 - ICMS REC.ANTECIPADO-COMERCIO",
        apelido: "(ANTECIPAÇÃO DE ALÍQUOTA/IMPOSTO)",
      };
    if (param === "difal")
      return {
        nome: "0317-8 - ICMS DIFERENCA DE ALIQUOTA",
        apelido: "(DIFAL)",
      };
    if (param === "st")
      return {
        nome: "0313-7 ICMS ST RECOLHIMENTO ANTECIPADO",
        apelido: "(ANTECIPAÇÃO DO ICMS-ST)",
      };
    if (param === "") return { nome: "?", apelido: "" };
  }

  function getItemDespesas(item: det) {
    const valorItemFrete = parseFloat(item.prod?.vFrete || "0");
    const valorItemSeguro = parseFloat(item.prod?.vSeg || "0");
    const valorItemOutros = parseFloat(item.prod?.vOutro || "0");

    const valorItemDespesas =
      valorItemFrete + valorItemSeguro + valorItemOutros;
    const stringItemDespesas = `Frete: ${valorItemFrete} \nSeguro: ${valorItemSeguro} \nOutros: ${valorItemOutros}`;
    return { valorItemDespesas, stringItemDespesas };
  }

  function getValImposto() {
    const soma = nf.det?.reduce((acumulador, item) => {
      return acumulador + (item.valImposto || 0);
    }, 0);

    return soma;
  }

  function sumDespesas() {
    let sum = 0;
    nf.det?.forEach((item) => {
      const { valorItemDespesas } = getItemDespesas(item);
      sum += valorItemDespesas;
    });

    return sum.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
  }

  function getDataVencimento(data: any) {
    const diaVencimento = 20;
    const mesVencimento = moment(data).month() + 2; // no javascript, o més começa a contar com 0
    const anoVencimento = moment(data).year();
    const dataVencimento = new Date(
      anoVencimento,
      mesVencimento,
      diaVencimento
    );

    const diaDaSemana = moment(dataVencimento).isoWeekday();

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

    return {
      data: formatarData(dataVencimento),
      diaDaSemana: moment(dataVencimento).format("dddd"),
    };
  }

  function sumValItems() {
    let sum = 0;
    nf.det?.forEach((item) => {
      sum += parseFloat(item.prod?.vProd || "0");
    });

    return sum.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
  }

  function sumItemsDesconto() {
    let sum = 0;
    nf.det?.forEach((item) => {
      sum += parseFloat(item.prod?.vDesc || "0");
    });

    return sum.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
  }

  function sumItemsIPI() {
    let sum = 0;
    nf.det?.forEach((item) => {
      sum += parseFloat(item.imposto?.IPI?.IPITrib?.vIPI || "0");
    });

    return sum.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
  }

  function getFormula(item: det): ReactNode {
    return item.formula;
  }

  return (
    <>
      <div>
        <div className="flex-col p-4 rounded-lg shadow-md shadow-black bg-gray-300">
          <div className="flex flex-wrap gap-1 items-center">
            <div>
              <Badge
                bgColor="bg-slate-700"
                nameColor="text-gray-300"
                valorColor="text-amber-400"
                divideColor="text-gray-500"
                name="NFe"
                valor={nf.ide?.nNF}
              />
            </div>

            <div>
              <Badge
                bgColor="bg-slate-700"
                nameColor="text-gray-300"
                valorColor="text-amber-400"
                divideColor="text-gray-500"
                name="Empresa"
                valor={nf.dest?.xNome}
              />
            </div>

            <div>
              <Badge
                bgColor="bg-slate-700"
                nameColor="text-gray-300"
                valorColor="text-amber-400"
                divideColor="text-gray-500"
                name="CNPJ"
                valor={nf.dest?.CNPJ}
              />
            </div>

            <div>
              <Badge
                bgColor="bg-slate-700"
                nameColor="text-gray-300"
                valorColor="text-amber-400"
                divideColor="text-gray-500"
                name="Emitente"
                valor={nf.emit?.xNome}
              />
            </div>

            <div>
              <Badge
                bgColor="bg-slate-700"
                nameColor="text-gray-300"
                valorColor="text-amber-400"
                divideColor="text-gray-500"
                name="Origem"
                valor={nf.emit?.enderEmit?.UF}
              />
            </div>

            <div>
              <Badge
                bgColor="bg-slate-700"
                nameColor="text-gray-300"
                valorColor="text-amber-400"
                divideColor="text-gray-500"
                name="Emissão"
                valor={formatarData(nf.ide?.dhEmi)}
              />
            </div>

            <div>
              <Badge
                bgColor="bg-slate-700"
                nameColor="text-gray-300"
                valorColor="text-amber-400"
                divideColor="text-gray-500"
                name="Val. NFe"
                valor={formatCurrency(nf.total?.ICMSTot?.vNF || "0")}
              />
            </div>
          </div>

          {/* ACCORDION */}
          <div className="mt-2">
            <Accordion header="+ Detalhes do cálculo">
              <div className="flex min-w-full overflow-hidden px-3 py-2">
                {/* TABLE ST */}
                {nf.det && (
                  <table className="w-full ">
                    <thead className="border-b bg-zinc-700 w-full">
                      <tr>
                        <th
                          scope="col"
                          className="text-zinc-400 text-left px-3 text-[0.70rem] uppercase font-medium"
                        >
                          item
                        </th>
                        <th
                          scope="col"
                          className="text-zinc-400 text-center px-3 text-[0.70rem] uppercase font-medium"
                        >
                          qtd
                        </th>
                        <th
                          scope="col"
                          className="text-zinc-400 text-center px-3 text-[0.70rem] uppercase font-medium"
                        >
                          valor
                        </th>
                        <th
                          scope="col"
                          className="text-zinc-400 text-center px-3 text-[0.70rem] uppercase font-medium"
                        >
                          despesas
                        </th>
                        <th
                          scope="col"
                          className="text-zinc-400 text-center px-3 text-[0.70rem] uppercase font-medium"
                        >
                          desconto
                        </th>

                        <th
                          scope="col"
                          className="text-zinc-400 text-center px-3 text-[0.60rem] uppercase font-medium"
                        >
                          alq (in/ex)
                        </th>

                        <th
                          scope="col"
                          className="text-zinc-400 px-3 text-[0.70rem] uppercase font-medium text-center"
                        >
                          ipi
                        </th>

                        <th
                          scope="col"
                          className="text-zinc-400 text-center px-3 text-[0.70rem] uppercase font-medium"
                        >
                          mva
                        </th>
                        <th
                          scope="col"
                          className="text-zinc-400 text-center px-3 text-[0.70rem] min-w-max uppercase font-medium"
                        >
                          <span>val. imposto</span>
                        </th>
                        <th
                          scope="col"
                          className="text-zinc-400 text-center px-3 text-[0.70rem] min-w-max uppercase font-medium"
                        >
                          <span>formula</span>
                        </th>
                      </tr>
                    </thead>

                    <tbody>
                      {nf.det.map((item, i) => (
                        <tr key={i}>
                          <td className="px-3 border-gray-400 border-b text-[0.70rem]">
                            <p className="text-gray-900 font-semibold">
                              {item.prod?.xProd}
                            </p>
                          </td>

                          <td className="px-3 border-b border-gray-400 text-[0.70rem]">
                            <p className="text-gray-900 font-semibold text-center">
                              {item.prod?.qCom?.toString().padStart(2, "0")}
                            </p>
                          </td>

                          <td className="px-3 border-b border-gray-400 text-[0.70rem]">
                            <p className="text-gray-900 font-semibold text-center">
                              {formatCurrency(item.prod?.vProd || "0")}
                            </p>
                          </td>

                          <td
                            title={getItemDespesas(item).stringItemDespesas}
                            className="text-gray-900 px-3 border-b border-gray-400 text-[0.70rem] cursor-help text-center"
                          >
                            {formatCurrency(
                              getItemDespesas(item).valorItemDespesas.toString()
                            )}
                          </td>

                          <td className="text-gray-900 px-3 border-b border-gray-400 text-[0.70rem] text-center">
                            {formatCurrency(item.prod?.vDesc || "0")}
                          </td>

                          <td className="text-gray-900 px-3 border-b border-gray-400 text-[0.70rem] text-center">
                          {formatPercent(item.aliqInterna?.toString() || "0")}
                            {" "}
                            {formatPercent(item.aliqInterestadual?.toString() || "0")}
                          </td>

                          <td
                            title={
                              "Alíq: " +
                              formatPercent(
                                item.imposto?.IPI?.IPITrib?.pIPI || "0"
                              )
                            }
                            className="cursor-help text-gray-900 px-3 border-b border-gray-400 text-[0.70rem] text-center"
                          >
                            {formatCurrency(
                              item.imposto?.IPI?.IPITrib?.vIPI || "0"
                            )}
                          </td>

                          <td className="text-gray-900 px-3 border-b border-gray-400 text-[0.70rem] text-center">
                            {formatPercent(item.calcAntecipacao?.mva || "0")}
                          </td>

                          <td className="text-gray-900 px-3 border-b border-gray-400 text-[0.70rem] text-center">
                            {formatCurrency(item.valImposto?.toString() || "0")}
                          </td>

                          <td className="text-gray-900 px-3 border-b border-gray-400 text-[0.70rem] text-center">
                            <ModalButton
                              title="Formula do cálculo"
                              content={getFormula(item)}
                            >
                              <button
                                type="button"
                                title="Itens da nota"
                                onClick={() => {}}
                                className="bg-slate-700 text-amber-500 active:bg-slate-900 hover:bg-slate-800 
                                         px-[0.50em] pt-[0.33em] pb-[0.30em] rounded 
                                         shadow-md shadow-gray-500 ease-linear transition-all duration-150"
                              >
                                <TbMath className="w-[15px] h-[15px]" />
                              </button>
                            </ModalButton>
                          </td>
                        </tr>
                      ))}
                      <tr className="bg-zinc-700 text-green-500">
                        <td className="text-zinc-400 text-left px-3 text-[0.70rem] uppercase font-medium">
                          Totais
                        </td>
                        <td></td>
                        <td className="text-center px-3 text-[0.70rem] uppercase font-medium">
                          {sumValItems()}
                        </td>
                        <td className="text-center px-3 text-[0.70rem] uppercase font-medium">
                          {sumDespesas()}
                        </td>
                        <td className="text-center px-3 text-[0.70rem] uppercase font-medium">
                          {sumItemsDesconto()}
                        </td>
                        <td></td>
                        <td className="text-center px-3 text-[0.70rem] uppercase font-medium">
                          {sumItemsIPI()}
                        </td>
                        <td></td>
                        <td className="text-center px-3 text-[0.70rem] uppercase font-semibold text-amber-400">
                          {formatCurrency(getValImposto()?.toString() || "0")}
                        </td>
                        <td></td>
                      </tr>
                    </tbody>
                  </table>
                )}
              </div>
            </Accordion>
          </div>

          <div className="border border-gray-400 rounded-lg px-3 py-2 mt-2">
            <div className="flex w-full">
              {/* TABELA */}
              <div className="flex justify-center">
                <table className="table-auto">
                  <tbody>
                    {/* RECEITA */}
                    <tr>
                      {/* DESCRICAO */}
                      <td>
                        <p
                          title="CÓDIGO DA RECEITA PARA EMISSÃO DO DAE"
                          className="text-gray-900 text-[0.75em] font-bold uppercase"
                        >
                          Receita:
                        </p>
                      </td>
                      {/* VALOR */}
                      <td>
                        <p className="text-blue-800 text-[0.75em] font-bold ml-1">
                          {getReceita(nf.paramsNFe?.tipoCalculo || "")?.nome}
                          <span className="text-red-800 ml-1">
                            {
                              getReceita(nf.paramsNFe?.tipoCalculo || "")
                                ?.apelido
                            }
                          </span>
                        </p>
                      </td>
                    </tr>

                    {/* PA */}
                    <tr>
                      {/* DESCRICAO */}
                      <td>
                        <p
                          title="PERÍODO DE APURAÇÃO DA RECEITA"
                          className="text-gray-900 text-[0.75em] font-bold uppercase"
                        >
                          PA:
                        </p>
                      </td>
                      {/* VALOR */}
                      <td>
                        <p className="text-blue-800 text-[0.75em] font-bold ml-1">
                          {formatarDataByMY(nf.ide?.dhEmi)}
                        </p>
                      </td>
                    </tr>

                    {/* VENCIMENTO */}
                    <tr>
                      {/* DESCRICAO */}
                      <td>
                        <p
                          title="DATA DE VENCIMENTO DA RECEITA"
                          className="text-gray-900 text-[0.75em] font-bold uppercase"
                        >
                          Vencimento:
                        </p>
                      </td>
                      {/* VALOR */}
                      <td>
                        <p className="text-blue-800 text-[0.75em] font-bold ml-1">
                          <span className="flex items-center">
                            {getDataVencimento(nf.ide?.dhEmi).data}
                            <span className="text-red-800 ml-1">
                              ({getDataVencimento(nf.ide?.dhEmi).diaDaSemana})
                            </span>
                            <span className="ml-1">
                              <Copy
                                textColor="text-green-800"
                                textToCopy={
                                  getDataVencimento(nf.ide?.dhEmi).data || ""
                                }
                              />
                            </span>
                          </span>
                        </p>
                      </td>
                    </tr>

                    {/* INFORMAÇÕES COMPLEMENTARES */}
                    <tr>
                      {/* DESCRICAO */}
                      <td>
                        <p
                          title="INFORMAÇÕES COMPLEMENTARES"
                          className="text-gray-900 text-[0.75em] font-bold uppercase"
                        >
                          Inf. Complem.:
                        </p>
                      </td>
                      {/* VALOR */}
                      <td>
                        <p className="text-blue-800 text-[0.75em] font-bold ml-1">
                          <span className="flex items-center">
                            REF. NFe
                            <span className="text-red-800 ml-1 mr-1">
                              {nf.ide?.nNF}
                            </span>
                            CHAVE:
                            <span className="text-red-800 ml-1">
                              {nf.chNFe}
                            </span>
                            <span className="ml-1">
                              <Copy
                                textColor="text-green-800"
                                textToCopy={
                                  "REF. NFe " +
                                  nf.ide?.nNF +
                                  " CHAVE:" +
                                  nf.chNFe
                                }
                              />
                            </span>
                          </span>
                        </p>
                      </td>
                    </tr>

                    {/* VALOR IMPOSTO*/}
                    <tr>
                      {/* DESCRICAO */}
                      <td>
                        <p
                          title="VALOR DO IMPOSTO A RECOLHER"
                          className="text-gray-900 text-[0.75em] font-bold uppercase"
                        >
                          Val. Imposto:
                        </p>
                      </td>
                      {/* VALOR */}
                      <td>
                        <p className="text-blue-800 text-[0.75em] font-bold ml-1">
                          <span className="flex items-center">
                            <span
                              className="inline-block rounded-full border border-gray-500 px-[0.30rem]
                                         text-center align-middle text-[0.70rem] font-bold text-red-800"
                            >
                              {formatCurrency(
                                getValImposto()?.toString() || "0"
                              )}
                            </span>
                            <span className="ml-1">
                              <Copy
                                textColor="text-green-800"
                                textToCopy={formatCurrency(
                                  getValImposto()?.toString() || "0"
                                )
                                  .replace("R$", "")
                                  .trim()}
                              />
                            </span>
                          </span>
                        </p>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
//getReceita(nf.paramsNFe?.tipoCalculo)
