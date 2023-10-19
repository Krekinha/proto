"use client";
import { ChangeEvent } from "react";
import { capituloST, nbmST } from "@/utils/types";
import { parse } from "csv-parse/sync";
import { nbmSTService } from "@/services/nbmSTService";
import useSWR from "swr";
import { baseUrl } from "@/utils/constants";

const fetcher = async (url: string) => await fetch(url).then((res) => res.json());

export default function SettingsCapitulosST() {
  const { data, error, isLoading } = useSWR(`${baseUrl()}/api/nbm-st/listCapitulos`, fetcher);
  const capitulos: capituloST[]  = data?.capitulos;

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      handleUploadClick(e.target.files[0]);
    }
  };

  const handleUploadClick = (file: any) => {
    if (!file) {
      return;
    }

    fetch("https://httpbin.org/post", {
      method: "POST",
      body: file,
      headers: {
        "content-type": file.type,
        "content-length": `${file.size}`,
      },
    })
      .then((res) => res.json())
      .then((data) => parseCSV(data.data))
      .catch((err) => console.error(err));
  };

  const parseCSV = async (fileCSV: any) => {
    const lines: capituloST[] = parse(fileCSV as string, {
      columns: [
        "numero",
        "descricao",
      ],
      delimiter: "|",
      trim: true,
      skip_empty_lines: true,
    });

    console.log(lines);

    await addCapitulos(lines);
  };

  async function addCapitulos(values: capituloST[]) {
    await nbmSTService.addCapitulos(values);
  }

  return (
    <>
      <div className="flex justify-end">
        <label
          className="bg-green-600 disabled:bg-gray-600 text-white disabled:text-gray-400 active:bg-green-800 hover:bg-green-700 
                         font-semibold rounded-lg shadow-md hover:shadow-lg focus:shadow-lg focus:bg-green-700 ease-linear transition-all 
                         cursor-pointer duration-150 px-4 py-1 mb-2"
        >
          <span className="text-base font-semibold text-white select-none">
            Upload
          </span>
          <input
            type="file"
            multiple
            className="hidden"
            onChange={handleFileChange}
          />
        </label>
      </div>

      {/* TABELA */}

      <div className="overflow-x-auto">
        <div className="inline-block min-w-full shadow overflow-hidden rounded-lg">
          <table className="min-w-full leading-normal w-full bg-gray-800">
            <thead className="border-b bg-zinc-900 w-full">
              <tr>
                <th
                  scope="col"
                  className="pl-5 py-2 border-b border-gray-200 text-white  text-left text-sm uppercase font-normal"
                >
                  numero
                </th>
                <th
                  scope="col"
                  className="pl-2 py-3  border-b border-gray-200 text-white  text-center text-sm uppercase font-normal"
                >
                  descrição
                </th>
              </tr>
            </thead>

            <tbody>
              {capitulos &&
                capitulos.map((item, index) => (
                  <tr key={index}>
                    <td className="px-5 py-2 border-b border-gray-400 bg-gray-300 text-sm">
                      <p className="text-gray-900 whitespace-no-wrap">
                        {item.numero}
                      </p>
                    </td>
                    <td className="px-5 py-2 border-b border-gray-400 bg-gray-300 text-sm text-center">
                      <p className="text-gray-900 whitespace-no-wrap">
                        {item.descricao}
                      </p>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
