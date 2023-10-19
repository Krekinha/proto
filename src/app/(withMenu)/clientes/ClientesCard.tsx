import Image from "next/image";
import Link from "next/link";

export default function ClientesCard() {
  return (
    <>
      <div className="max-w-[15rem] ">
        <Link href={"/clientes"} className="text-gray-400 mb-4">
          <div className="flex-col min-h-[10rem]  p-6 mr-3 rounded-lg shadow-lg shadow-black bg-slate-900">
            <div className="flex">
              <div className="">
                <Image
                  src="/images/clientes.png"
                  width={25}
                  height={25}
                  alt="makit"
                  className="w-[25px] h-[25px]"
                />
              </div>

              <div className="flex ml-1">
                <span className="text-amber-600 text-sm font-medium  pt-1">
                  Clientes
                </span>
              </div>
            </div>

            <hr className="mb-2 mt-1 border-slate-800" />
            <span className="text-[0.75rem]">
              Cadastro, alterações e listagem de clientes
            </span>
          </div>
        </Link>
      </div>
    </>
  );
}
