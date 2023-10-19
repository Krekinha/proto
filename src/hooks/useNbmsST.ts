import { axiosInstance, baseUrl } from "@/utils/constants";
import { nbmST } from "@/utils/types";
import useSWR from "swr";

//const fetcher = async (url: string) => await axiosInstance.get(url).then((res) => res.data);
const fetcher = async (url: string) =>
  await fetch(url).then((res) => res.json());

export default async function useNbmsST() {
  const url = `${baseUrl()}/api/nbm-st/list`;
  const { data, error, isLoading } = useSWR<nbmST[]>(url, fetcher);

  return data;
}
