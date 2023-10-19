import { ReactNode } from "react";

export type User = {
  id?: string;
  name: string;
  sobrenome?: string;
  email: string;
  telefone?: string;
  pix?: string;
  criadoEm?: Date;
  VerifyEm?: Date;
  image?: string;
  senha: string;
  token: string;

};

export type ILogin = {
  email: string;
  senha: string;
};
