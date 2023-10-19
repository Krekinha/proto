"use client";
import React from "react";

export default function Consultas(file: any) {
  const test = async () => {
    //const teste = dfeService.consultaDFe();
    const res = await fetch("/api/dfe/list");
    const teste = await Promise.resolve(res).then((res) => {
      return res.json();
    });

    console.log(teste);
  };
  return (
    <div>
      <div className="flex justify-end">
        <div className="flex items-center">
          <div className="mr-1">
            <button
              title="Importar xmls das notas"
              onClick={() => {
                test();
              }}
              className="bg-green-600 disabled:bg-gray-600 text-white disabled:text-gray-400 active:bg-green-800 hover:bg-green-700 
                         font-semibold rounded shadow-md hover:shadow-lg focus:shadow-lg focus:bg-green-700 ease-linear transition-all 
                         cursor-pointer duration-150 px-4 py-1"
            >
              <span className="text-base font-semibold text-white select-none">
                Upload
              </span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

{
  /* TABELA */
}
{
  /*
        <div className="py-4 overflow-x-auto">
          <div className="inline-block min-w-full shadow overflow-hidden rounded-lg">
            <table
              hidden={chekIsGroupNfesEmpty(grpNfes)}
              className="min-w-full leading-normal w-full bg-gray-800"
            >
              <thead className="border-b bg-zinc-900 w-full">
                <tr>
                  <th
                    scope="col"
                    className="pl-5 py-2 border-b border-gray-200 text-white  text-left text-sm uppercase font-normal"
                  >
                    Destinatário
                  </th>
                  <th
                    scope="col"
                    className="pl-2 py-3  border-b border-gray-200 text-white  text-center text-sm uppercase font-normal"
                  >
                    Qtd. Notas
                  </th>
                  <th
                    scope="col"
                    className="pl-2 py-3  border-b border-gray-200 text-white  text-center text-sm uppercase font-normal"
                  >
                    Val. Total
                  </th>
                  <th
                    scope="col"
                    className="pl-2 py-3  border-b border-gray-200 text-white text-center text-sm uppercase font-normal"
                  >
                    Mês/Ano
                  </th>
                  <th
                    scope="col"
                    className="pr-5 py-3 border-b border-gray-200 text-white text-right text-sm uppercase font-normal h-full"
                  >
                    Detalhe
                  </th>
                </tr>
              </thead>

              <tbody>
                {grpNfes &&
                  grpNfes.map((nf, i) => (
                    <tr key={i}>
                      <td className="px-5 py-2 border-b border-gray-400 bg-gray-300 text-sm">
                        <p className="text-gray-900 whitespace-no-wrap">
                          {nf.nfs[0].nfeProc?.NFe?.infNFe?.dest?.xNome}
                        </p>
                      </td>
                      <td className="px-5 py-2 border-b border-gray-400 bg-gray-300 text-sm text-center">
                        <p className="text-gray-900 whitespace-no-wrap">
                          {nf.nfs.length}
                        </p>
                      </td>
                      <td className="px-5 py-2 border-b border-gray-400 bg-gray-300 text-sm text-center">
                        <p className="text-gray-900 whitespace-no-wrap">
                          {sumValNFs(nf.nfs)}
                        </p>
                      </td>
                      <td className="px-5 py-2 border-b border-gray-400 bg-gray-300 text-sm">
                        <p
                          className={`${
                            distincDataEmissao(nf.nfs) == "VÁRIOS"
                              ? "text-red-100 text-center whitespace-no-wrap bg-red-500 rounded-lg text-[0.75em] px-1"
                              : "text-gray-900 whitespace-no-wrap text-center"
                          }`}
                        >
                          {distincDataEmissao(nf.nfs)}
                        </p>
                      </td>
                      <td className="px-5 py-2 border-b border-gray-400 bg-gray-300 text-sm">
                        <div className="flex flex-row justify-end">
                          <div className="flex">
                            <button
                              type="button"
                              onClick={() => {
                                makeDetail(nf.nfs);
                              }}
                              className="bg-green-600 text-white active:bg-red-600 font-bold uppercase px-3 py-2 rounded shadow hover:shadow-md hover:bg-green-700 outline-none focus:outline-none focus:bg-green-800 mr-1 mb-1 ease-linear transition-all duration-150"
                            >
                              <FaSearch />
                            </button>
                          </div>
                        </div>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </div>*/
}
