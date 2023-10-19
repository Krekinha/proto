import { baseUrl } from "@/utils/constants";
import axios from "axios";
import { getSession } from "next-auth/react";

export const http = axios.create({
  baseURL: baseUrl(),
  withCredentials: false
});

http.interceptors.request.use(async function (config) {
  const session: any = await getSession();
  config.headers!.Authorization = session!.accessToken
    ? `Bearer ${session!.accessToken}`
    : "";
  return config;
});
