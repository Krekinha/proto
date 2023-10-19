import { formatDecimal } from "@/utils/format";

interface Props {
  valorItem: number;
  alqInterestadual: number;
  valorDespesas: number;
  baseIcmsInter: number;
  valorIcmsInter: number;
  alqInternaItem: number;
  valorItemDesconto: number;
  valorItemIPI: number;
  valorItemMVA: number;
  baseIcmsSt: number;
  valorIcmsSt: number;
}

export default function ItemFormulaAICMS({
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
}: Props) {
  return (
    <>
      <div className="flex flex-col text-[0.75rem] mt-2">
        <div>
          <span className="font-semibold text-amber-600">
            1 - Calcular a Base de cálculo do ICMS interestadual
          </span>
        </div>
        <div>
          <span className="font-semibold text-blue-600">
            B.C ICMS interestadual
          </span>
          <span>
            {" "}
            = (Valor do produto + Despesas (Frete + Seguro + Outras Despesas
            Acessórias) - Desconto)
          </span>
        </div>
        <div>
          <span className="font-semibold text-blue-600">
            B.C ICMS interestadual
          </span>
          <span>
            {" "}
            = ({formatDecimal(valorItem.toString())} +{" "}
            {formatDecimal(valorDespesas.toString())} -{" "}
            {formatDecimal(valorItemDesconto.toString())}) ={" "}
            {formatDecimal(baseIcmsInter.toString())}
          </span>
        </div>

        <div className="mt-2">
          <span className="font-semibold text-amber-600">
            2 - Calcular o valor do ICMS interestadual
          </span>
        </div>
        <div>
          <span className="font-semibold text-blue-600">
            V. ICMS interestadual
          </span>
          <span>
            {" "}
            = B.C ICMS interestadual x (Alq. ICMS Interestadual / 100)
          </span>
        </div>
        <div>
          <span className="font-semibold text-blue-600">
            V. ICMS interestadual
          </span>
          <span>
            {" "}
            = {formatDecimal(baseIcmsInter.toString())} x ({alqInterestadual} /
            100) = {formatDecimal(valorIcmsInter.toString())}
          </span>
        </div>

        <div className="mt-2">
          <span className="font-semibold text-amber-600">
            3 - Calcular a Base de cálculo do ICMS-ST
          </span>
        </div>
        <div>
          <span className="font-semibold text-blue-600">B.C ICMS-ST</span>
          <span>
            {" "}
            = (Valor do produto + Valor do IPI + Despesas (Frete + Seguro +
            Outras Despesas Acessórias) - Descontos) x (1+(%MVA / 100))
          </span>
        </div>
        <div>
          <span className="font-semibold text-blue-600">B.C ICMS-ST</span>
          <span>
            {" "}
            = {formatDecimal(valorItem.toString())} +{" "}
            {formatDecimal(valorItemIPI.toString())} +{" "}
            {formatDecimal(valorDespesas.toString())} -{" "}
            {formatDecimal(valorItemDesconto.toString())} x (1 + (
            {formatDecimal(valorItemMVA.toString())} / 100)) ={" "}
            {formatDecimal(baseIcmsSt.toString())}
          </span>
        </div>

        <div className="mt-2">
          <span className="font-semibold text-amber-600">
            4 - Calcular o valor do ICMS-ST
          </span>
        </div>
        <div>
          <span className="font-semibold text-blue-600">Valor ICMS-ST</span>
          <span>
            {" "}
            = (B.C ICMS-ST x (Alíquota interna do produto / 100)) - Valor do
            ICMS interestadual
          </span>
        </div>
        <div>
          <span className="font-semibold text-blue-600">Valor ICMS-ST</span>
          <span>
            {" "}
            = ({formatDecimal(baseIcmsSt.toString())} x (
            {formatDecimal(alqInternaItem.toString())} / 100)) -{" "}
            {formatDecimal(valorIcmsInter.toString())} ={" "}
          </span>
          <span className="font-bold text-amber-600">
            {formatDecimal(valorIcmsSt.toString())}
          </span>
        </div>
      </div>
    </>
  );
}
