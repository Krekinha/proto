import { formatDecimal } from "@/utils/format";

interface Props {
  valorItem: number;
  alqInterestadual: number;
  valorDespesas: number;
  icmsInter: number;
  alqInternaItem: number;
  valorItemDesconto: number;
  icmsBase: number;
  baseCalculo: number;
  valImposto: number;
}

export default function ItemFormulaAADIFAL({
  valorItem,
  alqInterestadual,
  valorDespesas,
  icmsInter,
  alqInternaItem,
  valorItemDesconto,
  icmsBase,
  baseCalculo,
  valImposto,
}: Props) {
  return (
    <>
      <div className="flex flex-col text-[0.75rem] mt-2">
        <div>
          <span className="font-semibold text-amber-600">
            1 - Calcular o valor do ICMS interestadual
          </span>
        </div>
        <div>
          <span className="font-semibold text-blue-600">
            ICMS interestadual
          </span>
          <span> = Valor do produto x (Aliq. ICMS Interestadual / 100)</span>
        </div>
        <div>
          <span className="font-semibold text-blue-600">
            ICMS interestadual
          </span>
          <span>
            {" "}
            = {formatDecimal(valorItem.toString())} x ({alqInterestadual} / 100)
            = {formatDecimal(icmsInter.toString())}
          </span>
        </div>

        <div className="mt-2">
          <span className="font-semibold text-amber-600">
            2 - Excluir o ICMS interestadual da operação
          </span>
        </div>
        <div>
          <span className="font-semibold text-blue-600">Base do ICMS</span>
          <span>
            {" "}
            = (Valor do produto + Despesas - Desconto) - ICMS interestadual
          </span>
        </div>
        <div>
          <span className="font-semibold text-blue-600">Base do ICMS</span>
          <span>
            {" "}
            = ({formatDecimal(valorItem.toString())} +{" "}
            {formatDecimal(valorDespesas.toString())} -{" "}
            {formatDecimal(valorItemDesconto.toString())}) -{" "}
            {formatDecimal(icmsInter.toString())} ={" "}
            {formatDecimal(icmsBase.toString())}
          </span>
        </div>

        <div className="mt-2">
          <span className="font-semibold text-amber-600">
            3 - Calcular a Base de cálculo da Antecipação
          </span>
        </div>
        <div>
          <span className="font-semibold text-blue-600">B.C Antecipação</span>
          <span> = Base do ICMS / (1 - Aliq. Interna / 100)</span>
        </div>
        <div>
          <span className="font-semibold text-blue-600">
            B.C da Antecipação
          </span>
          <span>
            {" "}
            = {formatDecimal(icmsBase.toString())} / (1 -{" "}
            {formatDecimal(alqInternaItem.toString())} / 100) ={" "}
            {formatDecimal(baseCalculo.toString())}
          </span>
        </div>

        <div className="mt-2">
          <span className="font-semibold text-amber-600">
            4 - Calcular a diferença entre o valor do ICMS interno e o ICMS interestadual
          </span>
        </div>
        <div>
          <span className="font-semibold text-blue-600">
            Valor imposto
          </span>
          <span>
            {" "}
            = (B.C Antecipação x (Aliq. Interna / 100)) - (ICMS interestadual)
          </span>
        </div>
        <div>
          <span className="font-semibold text-blue-600">
            Valor da Antecipação
          </span>
          <span>
            {" "}
            = ({formatDecimal(baseCalculo.toString())} x{" "}
            {formatDecimal(alqInternaItem.toString())} / 100) -{" "}
            {formatDecimal(icmsInter.toString())} ={" "}
          </span>
          <span className="font-bold text-amber-600">
            {formatDecimal(valImposto.toString())}
          </span>
        </div>
      </div>
    </>
  );
}
