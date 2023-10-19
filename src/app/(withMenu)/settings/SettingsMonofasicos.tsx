"use client";
import { ChangeEvent } from "react";
import { ncmMonofasico } from "@/utils/types";
import { parse } from "csv-parse/sync";
import { ncmMonofasicoService } from "@/services/ncmMonofasicoService";
import { useSettingsContext } from "@/context/SettingsContext";
import {
  renderToFile,
  usePDF,
  Document,
  Page,
  Text,
  View,
  StyleSheet,
} from "@react-pdf/renderer";
import { MyDocument } from "./MyDocument";
import Link from "next/link";

const styles = StyleSheet.create({
  page: {
    flexDirection: "row",
    backgroundColor: "#E4E4E4",
  },
  section: {
    margin: 10,
    padding: 10,
    flexGrow: 1,
  },
});

export default function SettingsMonofasicos() {
  const { ncmsMonofasicos } = useSettingsContext();

  const MyDoc = (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.section}>
          <Text>{ncmsMonofasicos.length}</Text>
        </View>
        <View style={styles.section}>
          <Text>Section #2</Text>
        </View>
      </Page>
    </Document>
  );

  const [instance, updateInstance] = usePDF({
    document: MyDoc,
  });

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      handleUploadClick(e.target.files[0]);
    }
  };

  const handleUploadClick = (file: any) => {
    if (!file) {
      return;
    }

    // 👇 Uploading the file using the fetch API to the server
    fetch("https://httpbin.org/post", {
      method: "POST",
      body: file,
      // 👇 Set headers manually for single file upload
      headers: {
        "content-type": file.type,
        "content-length": `${file.size}`, // 👈 Headers need to be a string
      },
    })
      .then((res) => res.json())
      .then((data) => parseCSV(data.data))
      .catch((err) => console.error(err));
  };

  const parseCSV = async (fileCSV: any) => {
    const lines: ncmMonofasico[] = parse(fileCSV as string, {
      columns: [
        "ncm",
        "grupo",
        "codGrupo",
        "subGrupo",
        "codSubgrupo",
        "excecao",
      ],
      delimiter: ";",
      trim: true,
      skip_empty_lines: true,
    });

    lines.forEach(function (item) {
      item.ncm = removeFormat(item.ncm);
    });

    await addNcmsMonofasicos(lines);
  };

  async function addNcmsMonofasicos(values: ncmMonofasico[]) {
    await ncmMonofasicoService.addAll(values);
  }

  function removeFormat(value: string) {
    return value?.replace(/[^\d]+/g, "");
  }

  function makepdf() {
    renderToFile(<MyDocument />, `${__dirname}/example.pdf`);
  }

  return (
    <>
      <div className="flex justify-end">
        <div>
          <Link
            href={instance.url || "#"}
            className="font-medium text-blue-500 mr-4"
            download="test.pdf"
          >
            Download
          </Link>
        </div>
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
            accept=".csv"
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
                  ncm
                </th>
                <th
                  scope="col"
                  className="pl-2 py-3  border-b border-gray-200 text-white  text-center text-sm uppercase font-normal"
                >
                  grupo
                </th>
                <th
                  scope="col"
                  className="pl-2 py-3  border-b border-gray-200 text-white  text-center text-sm uppercase font-normal"
                >
                  cod. grupo
                </th>
                <th
                  scope="col"
                  className="pl-2 py-3  border-b border-gray-200 text-white  text-center text-sm uppercase font-normal"
                >
                  subgrupo
                </th>
                <th
                  scope="col"
                  className="pl-2 py-3  border-b border-gray-200 text-white  text-center text-sm uppercase font-normal"
                >
                  cod. subgrupo
                </th>
                <th
                  scope="col"
                  className="pr-5 py-3 border-b border-gray-200 text-white text-right text-sm uppercase font-normal h-full"
                >
                  exceção
                </th>
              </tr>
            </thead>

            <tbody>
              {ncmsMonofasicos &&
                ncmsMonofasicos.map((item, index) => (
                  <tr key={index}>
                    <td className="px-5 py-2 border-b border-gray-400 bg-gray-300 text-sm">
                      <p className="text-gray-900 whitespace-no-wrap">
                        {item.ncm}
                      </p>
                    </td>
                    <td className="px-5 py-2 border-b border-gray-400 bg-gray-300 text-sm text-center">
                      <p className="text-gray-900 whitespace-no-wrap">
                        {item.grupo}
                      </p>
                    </td>
                    <td className="px-5 py-2 border-b border-gray-400 bg-gray-300 text-sm text-center">
                      <p className="text-gray-900 whitespace-no-wrap">
                        {item.codGrupo}
                      </p>
                    </td>
                    <td className=" pr-3 py-2 border-b border-gray-400 bg-gray-300 text-sm">
                      <p className="text-gray-900 whitespace-no-wrap">
                        {item.subGrupo}
                      </p>
                    </td>
                    <td className=" pr-3 py-2 border-b border-gray-400 bg-gray-300 text-sm">
                      <p className="text-gray-900 whitespace-no-wrap">
                        {item.codSubgrupo}
                      </p>
                    </td>
                    <td className=" pr-3 py-2 border-b border-gray-400 bg-gray-300 text-sm">
                      <p className="text-gray-900 whitespace-no-wrap">
                        {item.excecao}
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
