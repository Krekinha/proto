import Image from "next/image";
import Link from "next/link";

export default function AntecipacaoCard() {
  return (
    <>
      <div className="max-w-[15rem] ">
        <Link
          href={"/sntools/antecipacao"}
          className="text-gray-400 mb-4"
        >
          <div className="flex-col min-h-[10rem]  p-6 mr-3 rounded-lg shadow-lg shadow-black bg-slate-900">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <Image
                  src="/images/nfcalc.png"
                  width={25}
                  height={25}
                  alt="makit"
                  className="w-[25px] h-[25px]"
                />
              </div>

              <div className="flex ml-2">
                <span className="text-amber-600 text-sm font-medium pt-1">
                  Antecipação & DIFAL
                </span>
              </div>
            </div>

            <hr className="mb-2 mt-1 border-slate-800" />

            <span className="text-[0.75rem]">
              Cálculo do imposto devido nas compras em operações interestaduais
            </span>
          </div>
        </Link>
      </div>
    </>
  );
}
