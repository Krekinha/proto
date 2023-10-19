import { baseUrl } from "@/utils/constants";

export const fetchApi = async (url: string) =>
  await fetch(`${baseUrl()}${url}`).then((res) => res.json());
