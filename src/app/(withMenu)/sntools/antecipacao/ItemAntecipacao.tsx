import {
  aplicacaoST,
  paramsCalcAntecipacao,
  capituloST,
  det,
  nbmST,
} from "@/utils/types";
import { IoMdCart } from "react-icons/io";
import { Formik, Field, Form } from "formik";
import { Badge } from "../../layout/Badge";
import { useSNToolsContext } from "@/context/SNToolsContext";
import { formatPercent } from "@/utils/format";

interface ItemAntecipacaoProps {
  item: det;
  onClick?: (id: string) => void;
}

export default function ItemAntecipacao({ item }: ItemAntecipacaoProps) {
  const { selectedNfe, setSelectedNfe } = useSNToolsContext();

  function formatCurrency(valor: string) {
    return parseFloat(valor).toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL",
    });
  }

  function getItemDespesas() {
    const valorItemFrete = parseFloat(item.prod?.vFrete || "0");
    const valorItemSeguro = parseFloat(item.prod?.vSeg || "0");
    const valorItemOutros = parseFloat(item.prod?.vOutro || "0");

    const valorItemDespesas =
      valorItemFrete + valorItemSeguro + valorItemOutros;
    const stringItemDespesas = `Frete: ${valorItemFrete} \nSeguro: ${valorItemSeguro} \nOutros: ${valorItemOutros}`;
    return { valorItemDespesas, stringItemDespesas };
  }

  function convertNbmProt() {
    let conv: paramsCalcAntecipacao[] = [];
    item.nbmST?.map((nbm: nbmST) => {
      if (nbm.mva && nbm.mva?.length > 0) {
        nbm.mva.map((imva) => {
          conv.push({
            tipoCalculo: "st",
            nbm: nbm.nbm,
            cest: nbm.cest,
            capitulo: nbm.capitulo,
            aplicacao: nbm.aplicacao,
            mva: imva.valor,
            descricaoMva: imva.descricao,
            descricao: nbm.descricao,
          });
        });
      } else {
        conv.push({
          tipoCalculo: "st",
          nbm: nbm.nbm,
          cest: nbm.cest,
          capitulo: nbm.capitulo,
          aplicacao: nbm.aplicacao,
          descricao: nbm.descricao,
        });
      }
    });

    return conv;
  }

  //console.log(item);

  return (
    <>
      <div>
        <Formik
          initialValues={{
            valueST: JSON.stringify(item.calcAntecipacao),
          }}
          onSubmit={async (values) => {
            const nfe = selectedNfe;
            nfe.nfeProc?.NFe?.infNFe?.det?.map((it) => {
              if (it === item) {
                it.calcAntecipacao = JSON.parse(values.valueST);
              }
            });
            setSelectedNfe(nfe);
          }}
        >
          {(props) => (
            <Form>
              <div className="flex-col p-4 rounded-lg shadow-md shadow-black bg-gray-300">
                <div className="flex items-center">
                  <div className="">
                    <IoMdCart className="text-blue-900" />
                  </div>

                  <div className="flex ml-2">
                    <span
                      className="inline-block rounded-full border border-gray-500 px-[0.30rem]
                           text-center align-middle text-[0.70rem] font-bold text-red-800"
                    >
                      {item.prod?.xProd}
                    </span>
                  </div>
                </div>

                <hr className="mb-2 mt-1 border-slate-400" />

                {/* BADGEs */}
                <div className="flex flex-wrap gap-1">
                  <div>
                    <Badge
                      bgColor="bg-slate-700"
                      nameColor="text-gray-300"
                      valorColor="text-amber-400"
                      divideColor="text-gray-500"
                      name="NCM/SH"
                      valor={item.prod?.NCM}
                    />
                  </div>

                  <div>
                    <Badge
                      bgColor="bg-slate-700"
                      nameColor="text-gray-300"
                      valorColor="text-amber-400"
                      divideColor="text-gray-500"
                      name="CFOP"
                      valor={item.prod?.CFOP}
                    />
                  </div>

                  <div>
                    <Badge
                      bgColor="bg-slate-700"
                      nameColor="text-gray-300"
                      valorColor="text-amber-400"
                      divideColor="text-gray-500"
                      name="UND."
                      valor={item.prod?.uCom}
                    />
                  </div>

                  <div>
                    <Badge
                      bgColor="bg-slate-700"
                      nameColor="text-gray-300"
                      valorColor="text-amber-400"
                      divideColor="text-gray-500"
                      name="DESPESAS"
                      title={getItemDespesas().stringItemDespesas}
                      valor={formatCurrency(
                        getItemDespesas().valorItemDespesas.toString()
                      )}
                    />
                  </div>

                  <div>
                    <Badge
                      bgColor="bg-slate-700"
                      nameColor="text-gray-300"
                      valorColor="text-amber-400"
                      divideColor="text-gray-500"
                      name="VAL. UNIT."
                      valor={formatCurrency(item.prod?.vUnCom || "0")}
                    />
                  </div>

                  <div>
                    <Badge
                      bgColor="bg-slate-700"
                      nameColor="text-gray-300"
                      valorColor="text-amber-400"
                      divideColor="text-gray-500"
                      name="QNT."
                      valor={item.prod?.qCom?.toString().padStart(2, "0")}
                    />
                  </div>

                  <div>
                    <Badge
                      bgColor="bg-slate-700"
                      nameColor="text-gray-300"
                      valorColor="text-amber-400"
                      divideColor="text-gray-500"
                      name="DESCONTO"
                      valor={formatCurrency(item.prod?.vDesc || "0")}
                    />
                  </div>

                  <div>
                    <Badge
                      bgColor="bg-slate-700"
                      nameColor="text-gray-300"
                      valorColor="text-amber-400"
                      divideColor="text-gray-500"
                      name="VAL. TOTAL"
                      valor={formatCurrency(item.prod?.vProd || "0")}
                    />
                  </div>
                </div>

                <div className="flex flex-wrap gap-1 mt-1">
                  <div>
                    <Badge
                      bgColor="bg-sky-800"
                      nameColor="text-gray-300"
                      valorColor="text-amber-400"
                      divideColor="text-gray-500"
                      name="BC. ICMS"
                      valor={formatCurrency(
                        item.imposto?.ICMS?.ICMS00?.vBC || "0"
                      )}
                    />
                  </div>

                  <div>
                    <Badge
                      bgColor="bg-sky-800"
                      nameColor="text-gray-300"
                      valorColor="text-amber-400"
                      divideColor="text-gray-500"
                      name="ALIQ. ICMS"
                      valor={formatPercent(
                        item.imposto?.ICMS?.ICMS00?.pICMS || "0"
                      )}
                    />
                  </div>

                  <div>
                    <Badge
                      bgColor="bg-sky-800"
                      nameColor="text-gray-300"
                      valorColor="text-amber-400"
                      divideColor="text-gray-500"
                      name="VAL. ICMS"
                      valor={formatCurrency(
                        item.imposto?.ICMS?.ICMS00?.vICMS || "0"
                      )}
                    />
                  </div>

                  <div>
                    <Badge
                      bgColor="bg-sky-800"
                      nameColor="text-gray-300"
                      valorColor="text-amber-400"
                      divideColor="text-gray-500"
                      name="ALQ. IPI"
                      title="Alíquota do IPI"
                      valor={formatPercent(
                        item.imposto?.IPI?.IPITrib?.pIPI || "0"
                      )}
                    />
                  </div>

                  <div>
                    <Badge
                      bgColor="bg-sky-800"
                      nameColor="text-gray-300"
                      valorColor="text-amber-400"
                      divideColor="text-gray-500"
                      title="Valor do IPI"
                      name="IPI"
                      valor={formatCurrency(
                        item.imposto?.IPI?.IPITrib?.vIPI || "0"
                      )}
                    />
                  </div>
                </div>

                <hr className="mb-2 mt-2 border-slate-400" />

                {/* RADIO GROUP */}
                <div
                  role="groupST"
                  aria-labelledby="radio-groupST"
                  className="mt-2 overflow-x-auto"
                  onChange={() => {
                    props.submitForm();
                  }}
                >
                  <div className="flex min-w-full shadow overflow-hidden rounded-lg">
                    {/* TABLE ST */}
                    {item.nbmST && (
                      <table className="w-full bg-violet-300 ">
                        <thead className="border-b bg-zinc-800 w-full">
                          <tr>
                            <th
                              scope="col"
                              className="text-zinc-400 text-left px-3 text-[0.70rem] uppercase font-medium"
                            ></th>
                            <th
                              scope="col"
                              className="text-zinc-400 text-left px-3 text-[0.70rem] uppercase font-medium"
                            >
                              NBM
                            </th>
                            <th
                              scope="col"
                              className="text-zinc-400 text-left px-3 text-[0.70rem] uppercase font-medium"
                            >
                              CEST
                            </th>
                            <th
                              scope="col"
                              className="text-zinc-400 text-left px-3 text-[0.70rem] uppercase font-medium"
                            >
                              DESCRIÇÃO
                            </th>
                            <th
                              scope="col"
                              className="text-zinc-400 text-left px-3 text-[0.70rem] uppercase font-medium"
                            >
                              CAP.
                            </th>

                            <th
                              scope="col"
                              className="text-zinc-400 text-left px-3 text-[0.70rem] uppercase font-medium"
                            >
                              APLIC.
                            </th>

                            <th
                              scope="col"
                              className="text-zinc-400 text-left px-3 text-[0.70rem] uppercase font-medium"
                            >
                              mva
                            </th>
                            <th
                              scope="col"
                              className="text-zinc-400 text-left px-3 text-[0.70rem] min-w-max uppercase font-medium"
                            >
                              <span>desc</span>
                            </th>
                          </tr>
                        </thead>

                        <tbody>
                          {convertNbmProt().map((nbm, i) => (
                            <tr key={i}>
                              <td className="px-3 border-b border-gray-500">
                                <Field
                                  type="radio"
                                  name="valueST"
                                  value={JSON.stringify(nbm)}
                                  className="h-[15px] w-[15px]"
                                  checked={
                                    JSON.stringify(nbm) ===
                                    JSON.stringify(item.calcAntecipacao)
                                  }
                                />
                              </td>
                              <td className="px-3 border-b border-gray-500 text-[0.70rem]">
                                <p className="text-gray-900 font-semibold">
                                  {nbm.nbm}
                                </p>
                              </td>

                              <td className="px-3 border-b border-gray-500 text-[0.70rem]">
                                <p className="text-gray-900 font-semibold">
                                  {nbm.cest}
                                </p>
                              </td>

                              <td className="text-gray-900 px-3 border-b border-gray-500 text-[0.70rem]">
                                {nbm.descricao}
                              </td>

                              <td
                                title={nbm.capitulo?.descricao}
                                className="text-gray-900 px-3 border-b border-gray-500 text-[0.70rem] cursor-help"
                              >
                                {nbm.capitulo?.numero}
                              </td>

                              <td
                                title={nbm.aplicacao
                                  ?.map((objeto) => objeto.descricao)
                                  .join("/")}
                                className="cursor-help text-gray-900 px-3 border-b border-gray-500 text-[0.70rem]"
                              >
                                {nbm.aplicacao
                                  ?.map((objeto) => objeto.numero)
                                  .join("/")}
                              </td>

                              <td className="text-gray-900 px-3 border-b border-gray-500 text-[0.70rem]">
                                {nbm.mva}
                              </td>

                              <td className="text-gray-900 px-3 border-b border-gray-500 text-[0.70rem]">
                                {nbm.descricaoMva}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    )}
                  </div>

                  {/*RAD ANTECIPAÇÃO ALIQUOTA*/}
                  <div className="mt-1">
                    <label>
                      <div className="flex px-3 items-center">
                        <Field
                          type="radio"
                          name="valueST"
                          value={JSON.stringify({
                            tipoCalculo: "aliquota",
                          })}
                          checked={
                            item.calcAntecipacao?.tipoCalculo === "aliquota"
                          }
                          className="w-[15px] h-[15px]"
                        />
                        <div className="ml-1">
                          <div className="text-gray-900 text-[0.75em] font-medium">
                            Antecipação de Alíquota
                          </div>
                        </div>
                      </div>
                    </label>
                  </div>

                  {/* RAD DIFAL */}
                  <div className="mt-1">
                    <label>
                      <div className="flex px-3 items-center">
                        <Field
                          type="radio"
                          name="valueST"
                          value={JSON.stringify({
                            tipoCalculo: "difal",
                          })}
                          checked={
                            item.calcAntecipacao?.tipoCalculo === "difal"
                          }
                          className="w-[15px] h-[15px]"
                        />
                        <div className="ml-1">
                          <div className="text-gray-900 text-[0.75em] font-medium">
                            DIFAL
                          </div>
                        </div>
                      </div>
                    </label>
                  </div>

                  {/* RAD NENHUM */}
                  <div className="mt-1">
                    <label>
                      <div className="flex px-3 items-center">
                        <Field
                          type="radio"
                          name="valueST"
                          value={JSON.stringify({
                            tipoCalculo: "nenhum",
                          })}
                          checked={
                            item.calcAntecipacao?.tipoCalculo === "nenhum"
                          }
                          className="w-[15px] h-[15px]"
                        />
                        <div className="ml-1">
                          <div className="text-gray-900 text-[0.75em] font-medium">
                            Nenhum
                          </div>
                        </div>
                      </div>
                    </label>
                  </div>

                  {/*
                    <div className="mt-4 text-slate-900">
                      {JSON.stringify(item.calcAntecipacao)}
                    </div>
                        */}
                </div>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </>
  );
}
