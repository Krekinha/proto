import { baseUrl } from "@/utils/constants";
import axios from "axios";

export const parseFileService = {
  upload,
  getAll,
};

async function upload(files: File[]) {
  if (files.length <= 0) {
    return;
  }
  const data = new FormData();

  files.forEach((file, i) => {
    data.append(`f-${i}`, file, file.name);
  });

  const res = await axios
      .post(`${baseUrl()}/api/files/upload`, data)
      .then((res) => res);
      
  return res;
}

function getAll() {
  //return fetchWrapper.get(baseUrl);
}
