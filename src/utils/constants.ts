import axios from "axios";

export function baseUrl() {
  if (process.env.NODE_ENV === "production") return "https://makit.vercel.app";
  else return "http://localhost:3000";
}

export const axiosInstance = axios.create({
  baseURL: baseUrl(),
});

