import * as fs from "fs";

export const dfeService = {
  consultaDFe,
};

async function consultaDFe() {
  const { DistribuicaoDFe } = require("node-mde");

  const distribuicao = new DistribuicaoDFe({
    pfx: fs.readFileSync("./support/certificado.pfx"),
    passphrase: "dasa,78",
    cnpj: "39255950000100",
    cUFAutor: "33",
    tpAmb: "2",
  });

  const consulta = await distribuicao.consultaUltNSU("000000000000000");

  return consulta;
}
