import axios from "axios";
import { SNAnexo3 } from "./types";

export function baseUrl() {
  if (process.env.NODE_ENV === "production") return "https://makit.vercel.app";
  else return "http://localhost:3000";
}

export const axiosInstance = axios.create({
  baseURL: baseUrl(),
});

export const tabAnexo3SN = () => {
  const dados: SNAnexo3[] = [
    {
      faixa: "1",
      aliqNominalSN: 6,
      valDeduzir: 0,
      rbt12Min: 0,
      rbt12Max: 180000,
      aliqNominalISS: 33.5,
    },
    {
      faixa: "2",
      aliqNominalSN: 11.2,
      valDeduzir: 9360,
      rbt12Min: 180000.01,
      rbt12Max: 360000,
      aliqNominalISS: 32,
    },
    {
      faixa: "3",
      aliqNominalSN: 13.5,
      valDeduzir: 17640,
      rbt12Min: 360000.01,
      rbt12Max: 720000,
      aliqNominalISS: 32.5,
    },
    {
      faixa: "4",
      aliqNominalSN: 16,
      valDeduzir: 35640,
      rbt12Min: 720000.01,
      rbt12Max: 1800000,
      aliqNominalISS: 32.5,
    },
    {
      faixa: "5",
      aliqNominalSN: 21,
      valDeduzir: 125640,
      rbt12Min: 1800000.01,
      rbt12Max: 3600000,
      aliqNominalISS: 33.5,
    },
    {
      faixa: "6",
      aliqNominalSN: 33,
      valDeduzir: 648000,
      rbt12Min: 3600000.01,
      rbt12Max: 4800000,
      aliqNominalISS: 0,
    },
  ];
  return dados;
};
