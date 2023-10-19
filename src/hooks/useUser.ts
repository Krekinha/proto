import { axiosInstance, baseUrl } from "@/utils/constants";
import useSWR from "swr";

const fetcher = async (url: string) => await axiosInstance.get(url).then((res) => res.data);

export default async function useUser(email: string) {
  //const {data: session}= useSession();

  const url = `${baseUrl()}/api/users/${email}`;
  const { data, mutate, error } = useSWR(url, fetcher);

  /*   const { data, mutate, error } = useSWR(url, fetcher);
  

  const loading = !data && !error;
  const loggedOut = error && error.status === 403; */

  return {
    //loading,
    //loggedOut,
    data,
    //mutate
  };
}






/*export default function useUser2() {
  const {data: session}= useSession();
  

  const url = `http://localhost:3000/api/usuario/${session?.userId}`;

  const { data, mutate, error } = useSWR(url, fetcher);
  

  const loading = !data && !error;
  const loggedOut = error && error.status === 403;

  return {
    loading,
    loggedOut,
    user: data,
    mutate
  };
}*/
