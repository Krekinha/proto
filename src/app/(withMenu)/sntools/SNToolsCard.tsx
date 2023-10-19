import Image from "next/image";
import Link from "next/link";

export default function SNToolsCard() {
  return (
    <>
      <div className="max-w-[15rem] ">
        <Link href={"/sntools"} className="text-gray-400 mb-4">
          <div className="flex-col min-h-[10rem]  p-6 mr-3 rounded-lg shadow-lg shadow-black bg-slate-900">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <Image
                  src="/images/sn.png"
                  width={25}
                  height={25}
                  alt="makit"
                  className="w-[25px] h-[25px]"
                />
              </div>

              <div className="flex ml-1">
                <span className="text-amber-600 text-sm font-medium  pt-1">
                Ferramentas do Simples Nacional
                </span>
              </div>
            </div>

            <hr className="mb-2 mt-1 border-slate-800" />
            <span className="text-[0.75rem]">
              Ferramentas para uso em empresas do Simples Nacional
            </span>
          </div>
        </Link>
      </div>
    </>
  );
}
