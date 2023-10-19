import ItemFormulaAADIFAL from "@/app/(withMenu)/layout/ItemFormulaAADIFAL";
import ItemFormulaAICMS from "@/app/(withMenu)/layout/ItemFormulaAICMS";
import { det, NF, NFResume } from "@/utils/types";

interface ICalculoParams {
  item: det;
  countItems: number;
  freteTotal: number;
  seguroTotal: number;
  descontoTotal: number;
  outrosTotal: number;
}

export default function useAntecipacaoCalculate(nfes: NF[]) {
  let nfesCalculadas: NFResume[] = [];
  nfes.forEach((nf) => {
    const nfeAlq: NFResume = makeNFeResume(nf, "aliquota");
    const nfeST: NFResume = makeNFeResume(nf, "st");
    const nfeDifal: NFResume = makeNFeResume(nf, "difal");

    const countItems = nf.nfeProc?.NFe?.infNFe?.det?.length || 0;
    const freteTotal = parseFloat(
      nf.nfeProc?.NFe?.infNFe?.total?.ICMSTot?.vFrete || "0"
    );
    const seguroTotal = parseFloat(
      nf.nfeProc?.NFe?.infNFe?.total?.ICMSTot?.vSeg || "0"
    );
    const outrosTotal = parseFloat(
      nf.nfeProc?.NFe?.infNFe?.total?.ICMSTot?.vOutro || "0"
    );
    const descontoTotal = parseFloat(
      nf.nfeProc?.NFe?.infNFe?.total?.ICMSTot?.vDesc || "0"
    );

    nf.nfeProc?.NFe?.infNFe?.det?.forEach((item) => {
      if (item.calcAntecipacao?.tipoCalculo === "aliquota") {
        const itemCalculado = calculaAntecipacaoAliquotaEDifal({
          item,
          countItems,
          freteTotal,
          seguroTotal,
          descontoTotal,
          outrosTotal,
        });
        nfeAlq.det?.push(itemCalculado);
      }

      if (item.calcAntecipacao?.tipoCalculo === "difal") {
        const itemCalculado = calculaAntecipacaoAliquotaEDifal({
          item,
          countItems,
          freteTotal,
          seguroTotal,
          descontoTotal,
          outrosTotal,
        });
        nfeDifal.det?.push(itemCalculado);
      }

      if (item.calcAntecipacao?.tipoCalculo === "st") {
        const itemCalculado = calculaAntecipacaoICMS({
          item,
          countItems,
          freteTotal,
          seguroTotal,
          descontoTotal,
          outrosTotal,
        });
        nfeST.det?.push(itemCalculado);
      }
    });

    if (nfeAlq.det!.length > 0) nfesCalculadas.push(nfeAlq);
    if (nfeDifal.det!.length > 0) nfesCalculadas.push(nfeDifal);
    if (nfeST.det!.length > 0) nfesCalculadas.push(nfeST);
  });

  return nfesCalculadas;
}

function calculaAntecipacaoAliquotaEDifal({
  item,
  countItems,
  freteTotal,
  seguroTotal,
  descontoTotal,
  outrosTotal,
}: ICalculoParams) {
  const valorItem = parseFloat(item.prod?.vProd || "0");

  const valorItemDesconto = getItemDesconto(
    parseFloat(item.prod?.vDesc || "0"),
    descontoTotal,
    countItems
  );

  const valorItemFrete = getItemFrete(
    parseFloat(item.prod?.vFrete || "0"),
    freteTotal,
    countItems
  );
  const valorItemSeguro = getItemSeguro(
    parseFloat(item.prod?.vSeg || "0"),
    seguroTotal,
    countItems
  );
  const valorItemOutros = getItemOutros(
    parseFloat(item.prod?.vOutro || "0"),
    outrosTotal,
    countItems
  );

  const alqInterestadual = parseInt(item.imposto?.ICMS?.ICMS00?.pICMS || "12");
  const alqInternaItem = getAliquotaInternaItem();
  const valorDespesas = valorItemFrete + valorItemSeguro + valorItemOutros;

  // ICMS interestadual
  const icmsInter = valorItem * (alqInterestadual / 100);

  // Exclusão do ICMS interestadual da operação
  const icmsBase = valorItem + valorDespesas - valorItemDesconto - icmsInter;

  // Base de cálculo da Antecipação
  const baseCalculo = icmsBase / (1 - alqInternaItem / 100);

  // Valor da Antecipação
  // ICMS devido na operação interna) - (ICMS devido na operação interestadual)
  const valImposto = baseCalculo * (alqInternaItem / 100) - icmsInter;

  item.valImposto = valImposto;
  item.aliqInterna = alqInternaItem;
  item.aliqInterestadual = alqInterestadual;
  
  item.formula = makeItemFormulaAADIFALNode(
    valorItem,
    alqInterestadual,
    valorDespesas,
    icmsInter,
    alqInternaItem,
    valorItemDesconto,
    icmsBase,
    baseCalculo,
    valImposto
  );

  return item;
}

function calculaAntecipacaoICMS({
  item,
  countItems,
  freteTotal,
  seguroTotal,
  descontoTotal,
  outrosTotal,
}: ICalculoParams) {
  const valorItem = parseFloat(item.prod?.vProd || "0");
  const valorItemDesconto = getItemDesconto(
    parseFloat(item.prod?.vDesc || "0"),
    descontoTotal,
    countItems
  );

  const valorItemFrete = getItemFrete(
    parseFloat(item.prod?.vFrete || "0"),
    freteTotal,
    countItems
  );
  const valorItemSeguro = getItemSeguro(
    parseFloat(item.prod?.vSeg || "0"),
    seguroTotal,
    countItems
  );
  const valorItemOutros = getItemOutros(
    parseFloat(item.prod?.vOutro || "0"),
    outrosTotal,
    countItems
  );

  const alqInterestadual = parseInt(item.imposto?.ICMS?.ICMS00?.pICMS || "12");
  const valorItemIPI = parseFloat(item.imposto?.IPI?.IPITrib?.vIPI || "0");
  const valorItemMVA = parseFloat(
    item.calcAntecipacao?.mva?.replace(",", ".") || "0"
  );
  const alqInternaItem = getAliquotaInternaItem();
  const valorDespesas = valorItemFrete + valorItemSeguro + valorItemOutros;

  // Base do ICMS Inter = (Valor do produto + Despesas (Frete + Seguro + Outras Despesas Acessórias) - Desconto)
  const baseIcmsInter = valorItem + valorDespesas - valorItemDesconto;

  // Valor do ICMS Inter = Base ICMS Próprio * (Alíquota ICMS Inter/100)
  const valorIcmsInter = baseIcmsInter * (alqInterestadual / 100);

  // Base do ICMS-ST = (Valor do Produto + IPI + Frete + Seguro + Despesas Acessórias – Descontos) * (1 + (%MVA/100))
  const baseIcmsSt =
    (valorItem + valorItemIPI + valorDespesas - valorItemDesconto) *
    (1 + valorItemMVA / 100);

  // Valor do ICMS-ST = (Base do ICMS-ST * (Alíquota do ICMS intra/100)) – Valor do ICMS Inter
  const valorIcmsSt = baseIcmsSt * (alqInternaItem / 100) - valorIcmsInter;

  item.valImposto = valorIcmsSt;
  item.aliqInterna = alqInternaItem;
  item.aliqInterestadual = alqInterestadual;

  item.formula = makeItemFormulaAICMSNode(
    valorItem,
    alqInterestadual,
    valorDespesas,
    baseIcmsInter,
    valorIcmsInter,
    alqInternaItem,
    valorItemDesconto,
    valorItemIPI,
    valorItemMVA,
    baseIcmsSt,
    valorIcmsSt
  );

  return item;
}

function makeNFeResume(nf: NF, tipo: string): NFResume {
  let nfres: NFResume = {
    ide: nf.nfeProc?.NFe?.infNFe?.ide,
    chNFe: nf.nfeProc?.protNFe?.infProt?.chNFe,
    emit: nf.nfeProc?.NFe?.infNFe?.emit,
    dest: nf.nfeProc?.NFe?.infNFe?.dest,
    total: nf.nfeProc?.NFe?.infNFe?.total,
    paramsNFe: { tipoCalculo: tipo },
    det: [],
  };

  return nfres;
}

function getAliquotaInternaItem() {
  return 18;
}

function getItemFrete(
  valorItemFrete: number,
  freteTotal: number,
  countItems: number
) {
  if (valorItemFrete > 0) return valorItemFrete;
  if (valorItemFrete === 0 && freteTotal < 0) return 0;
  if (valorItemFrete === 0 && freteTotal > 0) return freteTotal / countItems;

  return 0;
}

function getItemDesconto(
  valorItemDesconto: number,
  descontoTotal: number,
  countItems: number
) {
  if (valorItemDesconto > 0) return valorItemDesconto;
  if (valorItemDesconto === 0 && descontoTotal < 0) return 0;
  if (valorItemDesconto === 0 && descontoTotal > 0)
    return descontoTotal / countItems;

  return 0;
}

function getItemSeguro(
  valorItemSeguro: number,
  seguroTotal: number,
  countItems: number
) {
  if (valorItemSeguro > 0) return valorItemSeguro;
  if (valorItemSeguro === 0 && seguroTotal < 0) return 0;
  if (valorItemSeguro === 0 && seguroTotal > 0) return seguroTotal / countItems;

  return 0;
}

function getItemOutros(
  valorItemOutro: number,
  outrosTotal: number,
  countItems: number
) {
  if (valorItemOutro > 0) return valorItemOutro;
  if (valorItemOutro === 0 && outrosTotal < 0) return 0;
  if (valorItemOutro === 0 && outrosTotal > 0) return outrosTotal / countItems;

  return 0;
}

const makeItemFormulaAADIFALNode = (
  valorItem: number,
  alqInterestadual: number,
  valorDespesas: number,
  icmsInter: number,
  alqInternaItem: number,
  valorItemDesconto: number,
  icmsBase: number,
  baseCalculo: number,
  valImposto: number
) => {
  return ItemFormulaAADIFAL({
    valorItem,
    alqInterestadual,
    valorDespesas,
    icmsInter,
    alqInternaItem,
    valorItemDesconto,
    icmsBase,
    baseCalculo,
    valImposto,
  });
};

const makeItemFormulaAICMSNode = (
  valorItem: number,
  alqInterestadual: number,
  valorDespesas: number,
  baseIcmsInter: number,
  valorIcmsInter: number,
  alqInternaItem: number,
  valorItemDesconto: number,
  valorItemIPI: number,
  valorItemMVA: number,
  baseIcmsSt: number,
  valorIcmsSt: number
) => {
  return ItemFormulaAICMS({
    valorItem,
    alqInterestadual,
    valorDespesas,
    baseIcmsInter,
    valorIcmsInter,
    alqInternaItem,
    valorItemDesconto,
    valorItemIPI,
    valorItemMVA,
    baseIcmsSt,
    valorIcmsSt,
  });
};
