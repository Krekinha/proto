import { MdNoteAdd } from "react-icons/md";
import { TbFiles } from "react-icons/tb";
import { useNFCalcSaidaContext } from "@/context/NFCalcSaidaContext";
import { useSNToolsContext } from "@/context/SNToolsContext";
import { useEffect } from "react";

export default function CardSomaNotas() {
  const {
    totals,
    selectedNfes,
    setTotals,
  } = useSNToolsContext();

  useEffect(() => {
    const newTotals = totals;

    function sumValNFs() {
      let sum = 0;
      selectedNfes.forEach(
        (nf) =>
          (sum +=
            (nf.nfeProc?.NFe?.infNFe?.total?.ICMSTot?.vNF &&
              parseFloat(nf.nfeProc?.NFe?.infNFe?.total?.ICMSTot?.vNF)) ||
            0)
      );
      return sum;
    }

    newTotals.valFaturamento = sumValNFs();
    setTotals(newTotals);
  }, [selectedNfes, setTotals, totals]);

  function sumValNFs() {
    let sum = 0;
    selectedNfes.forEach(
      (nf) =>
        (sum +=
          (nf.nfeProc?.NFe?.infNFe?.total?.ICMSTot?.vNF &&
            parseFloat(nf.nfeProc?.NFe?.infNFe?.total?.ICMSTot?.vNF)) ||
          0)
    );
    return sum;
  }

  function sumValNFCe() {
    let sum = 0;
    selectedNfes.forEach((nf) => {
      nf.nfeProc?.NFe?.infNFe?.det?.forEach((prod) => {
        if (nf.nfeProc?.NFe?.infNFe?.ide?.mod == "65") {
          sum +=
            ((prod.prod?.vProd && parseFloat(prod.prod?.vProd)) || 0) -
            ((prod.prod?.vDesc && parseFloat(prod.prod?.vDesc)) || 0);
        }
      });
    });
    return sum.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
  }

  function sumValNFe() {
    let sum = 0;
    selectedNfes.forEach((nf) => {
      nf.nfeProc?.NFe?.infNFe?.det?.forEach((prod) => {
        if (nf.nfeProc?.NFe?.infNFe?.ide?.mod == "55") {
          sum +=
            ((prod.prod?.vProd && parseFloat(prod.prod?.vProd)) || 0) -
            ((prod.prod?.vDesc && parseFloat(prod.prod?.vDesc)) || 0);
        }
      });
    });
    return sum.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
  }

  return (
    <>
      <div className="block p-6 rounded-lg shadow-lg shadow-black bg-slate-900">
        <div className="flex">
          <div className=" grid items-center">
            <span className="text-gray-400 text-md uppercase leading-tight font-semibold">
              Valor Total
            </span>
          </div>
        </div>

        <hr className="mb-2 mt-2 border-slate-800" />

        <div className="flex flex-shrink-0">
          <div className="grid items-center">
            <TbFiles className="text-blue-600 w-5 h-5" />
          </div>
          <div className="items-end ml-2 flex-shrink-0">
            <a className="text-gray-400 text-[0.75em] mb-4">
              Todas as notas:
            </a>
            <a className="text-blue-600 text-[0.75em] font-semibold">
              {" "}
              {totals?.valFaturamento?.toLocaleString("pt-BR", {
                style: "currency",
                currency: "BRL",
              }) || "0,00"}
            </a>
          </div>
        </div>

        <div className="flex mt-2">
          <div className="grid items-center">
            <MdNoteAdd className="text-green-600 w-5 h-5" />
          </div>
          <div className="items-end ml-2">
            <a className="text-gray-400 text-[0.75em] mb-4">NFCe:</a>
            <a className="text-green-600 text-[0.75em] font-semibold">
              {} {sumValNFCe()}
            </a>
          </div>
        </div>

        <div className="flex mt-2">
          <div className="grid items-center">
            <MdNoteAdd className="text-green-600 w-5 h-5" />
          </div>
          <div className="items-end ml-2">
            <a className="text-gray-400 text-[0.75em] mb-4">NFe:</a>
            <a className="text-green-600 text-[0.75em] font-semibold">
              {} {sumValNFe()}
            </a>
          </div>
        </div>
      </div>
    </>
  );
}
