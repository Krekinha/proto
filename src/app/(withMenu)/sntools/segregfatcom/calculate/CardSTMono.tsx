"use client";
import { HiSwitchVertical } from "react-icons/hi";
import { MdOutlineLooksOne } from "react-icons/md";
import { useNFCalcSaidaContext } from "@/context/NFCalcSaidaContext";
import { baseUrl } from "@/utils/constants";
import useSWR from "swr";
import { useEffect } from "react";
import { nbmST, ncmMonofasico } from "@/utils/types";
import { nbmSTService } from "@/services/nbmSTService";

const fetcher = async (url: string) =>
  await fetch(url).then((res) => res.json());

export default function CardSTMono() {
  const { data } = useSWR(`${baseUrl()}/api/nbm-st/list`, fetcher);
  const nbmsst: nbmST[] = data?.nbms;

  const monoData = useSWR(`${baseUrl()}/api/monofasicos/list`, fetcher);
  const monos: ncmMonofasico[] = monoData.data?.ncm;

  const { selectedNfes, totals, setOpenTab, setTotals } =
    useNFCalcSaidaContext();

  useEffect(() => {
    const newTotals = totals;

    function sumPrdSTConfirm() {
      let sum = 0;

      selectedNfes.forEach((nf) => {
        nf.nfeProc?.NFe?.infNFe?.det?.forEach((prod) => {
          const ncm = prod.prod?.NCM || "";
          const calcST = prod.calcAntecipacao;
          const vprod = parseFloat(prod.prod?.vProd || "") || 0;
          const vdesc = parseFloat(prod.prod?.vDesc || "") || 0;
          const nbms = nbmSTService.checkST(ncm || "", nbmsst);
          if (
            nbms !== false &&
            nbms.length > 0 &&
            calcST?.tipoCalculo !== "nenhum"
          ) {
            sum += vprod - vdesc;
          }
        });
      });

      return sum;
    }

    function sumPrdSTParam() {
      let sum = 0;

      selectedNfes.forEach((nf) => {
        nf.nfeProc?.NFe?.infNFe?.det?.forEach((prod) => {
          const cfop = prod.prod?.CFOP || "";
          const vprod = parseFloat(prod.prod?.vProd || "") || 0;
          const vdesc = parseFloat(prod.prod?.vDesc || "") || 0;
          if (cfop.toString().startsWith("54")) {
            sum += vprod - vdesc;
          }
        });
      });

      return sum;
    }

    function sumProdMonoConfirm() {
      let sum = 0;

      selectedNfes.forEach((nf) => {
        nf.nfeProc?.NFe?.infNFe?.det?.forEach((prod) => {
          const ncm = prod.prod?.NCM || "";
          const vprod = parseFloat(prod.prod?.vProd || "") || 0;
          const vdesc = parseFloat(prod.prod?.vDesc || "") || 0;
          if (checkMono(ncm)) {
            sum += vprod - vdesc;
          }
        });
      });

      return sum;
    }

    function sumProdMonoParam() {
      let sum = 0;

      selectedNfes.forEach((nf) => {
        nf.nfeProc?.NFe?.infNFe?.det?.forEach((prod) => {
          const cst = prod.imposto?.PIS?.PISNT?.CST || "";
          const vprod = parseFloat(prod.prod?.vProd || "") || 0;
          const vdesc = parseFloat(prod.prod?.vDesc || "") || 0;
          if (cst.toString().startsWith("4")) {
            sum += vprod - vdesc;
          }
        });
      });

      return sum;
    }

    function checkMono(ncmx: string) {
      const ncm = ncmx.toString();
      if (ncm.length <= 0) return false;

      const res = monos.find(
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

    newTotals.valSTConfirm = sumPrdSTConfirm();
    newTotals.valSTParam = sumPrdSTParam();
    newTotals.valMonoConfirm = sumProdMonoConfirm();
    newTotals.valMonoParam = sumProdMonoParam();
    setTotals(newTotals);
  }, [nbmsst, monos, selectedNfes, setTotals, totals]);

  function makeSTDetails() {
    setOpenTab(5);
  }

  function makeMonoDetails() {
    setOpenTab(6);
  }

  return (
    <>
      <div>
        <div className="block p-6 rounded-lg shadow-lg shadow-black bg-violet-400">
          <div className="flex">
            <div className=" grid items-center">
              <span className="text-gray-900 text-md uppercase leading-tight font-semibold">
                Produtos ST/Monofásicos
              </span>
            </div>
          </div>

          <hr className="mb-2 mt-2 border-violet-500" />

          <div className="flex">
            <div className="grid items-center">
              <HiSwitchVertical className="text-blue-800 w-5 h-5" />
            </div>
            <div className="items-end ml-2">
              <a
                title="Itens confirmados como ST conforme tabela Anexo XV"
                className="text-gray-900 text-[0.75em] font-bold mb-4"
              >
                ST Confirmados:
              </a>
              <a className="text-blue-900 text-[0.75em] font-bold">
                {" "}
                {totals?.valSTConfirm?.toLocaleString("pt-BR", {
                  style: "currency",
                  currency: "BRL",
                }) || "0,00"}
              </a>
            </div>
          </div>

          <div className="flex">
            <div className="grid items-center">
              <HiSwitchVertical className="text-blue-800 w-5 h-5" />
            </div>
            <div className="items-end ml-2">
              <a
                title="Itens parametrizados como ST (CFOP 54XX)"
                className="text-gray-900 text-[0.75em] font-bold mb-4"
              >
                ST Param. (CFOP 54XX):
              </a>
              <a className="text-blue-900 text-[0.75em] font-bold">
                {" "}
                {totals?.valSTParam?.toLocaleString("pt-BR", {
                  style: "currency",
                  currency: "BRL",
                }) || "0,00"}
              </a>
            </div>
          </div>

          <div className="flex justify-start mt-2 mb-3">
            <button
              type="button"
              onClick={() => {
                makeSTDetails();
              }}
              className="bg-blue-600 text-blue-100 active:bg-blue-800 hover:bg-blue-700 
                         text-[0.66em] px-[0.65em] pt-[0.33em] pb-[0.30em] rounded-full 
                         shadow-md shadow-gray-800 ease-linear transition-all duration-150"
            >
              Detalhes
            </button>
          </div>

          <hr className="mb-2 mt-2 border-violet-500" />

          <div className="flex mt-2">
            <div className="grid items-center">
              <MdOutlineLooksOne className="text-red-800 w-5 h-5" />
            </div>
            <div className="items-end ml-2">
              <a
                title="Itens confirmados como Monofásicos conforme tabela vigente"
                className="text-gray-900 text-[0.75em] font-bold mb-4"
              >
                Monofásicos Confirm.:
              </a>
              <a className="text-red-800 text-[0.75em] font-bold">
                {}{" "}
                {totals?.valMonoConfirm?.toLocaleString("pt-BR", {
                  style: "currency",
                  currency: "BRL",
                }) || "0,00"}
              </a>
            </div>
          </div>
          <div className="flex mt-2">
            <div className="grid items-center">
              <MdOutlineLooksOne className="text-red-800 w-5 h-5" />
            </div>
            <div className="items-end ml-2">
              <a
                title="Itens parametrizados como Monofásicos (CST 04)"
                className="text-gray-900 text-[0.75em] font-bold mb-4"
              >
                Monofásicos Param.:
              </a>
              <a className="text-red-800 text-[0.75em] font-bold">
                {}{" "}
                {totals?.valMonoParam?.toLocaleString("pt-BR", {
                  style: "currency",
                  currency: "BRL",
                }) || "0,00"}
              </a>
            </div>
          </div>
          <div className="flex justify-start mt-2">
            <button
              type="button"
              onClick={() => {
                makeMonoDetails();
              }}
              className="bg-red-700 text-red-100 active:bg-red-900 hover:bg-red-800 
                         text-[0.66em] px-[0.65em] pt-[0.33em] pb-[0.30em] rounded-full 
                         shadow-md shadow-gray-800 ease-linear transition-all duration-150"
            >
              Detalhes
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
