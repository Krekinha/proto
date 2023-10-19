import * as fs from "fs";
import Consultas from "./Consultas";

async function consultaDFe() {
  const { DistribuicaoDFe } = require("node-mde");

  const distribuicao = new DistribuicaoDFe({
    pfx: fs.readFileSync("./support/certificado.pfx"),
    cnpj: "39255950000100",
    cUFAutor: "33",
    tpAmb: "2",
  });

  const consulta = await distribuicao.consultaUltNSU("000000000000000");

  if (consulta.error) {
    throw new Error(consulta.error);
  }

  return consulta;
}

export default async function Page() {
  const data = "fake"; //await consultaDFe();
  return (
    <div>
      <div className="flex justify-start ml-3 mt-3">
        <Consultas file={data} />
      </div>
    </div>
  );
}

`<?xml version="1.0" encoding="utf-8"?>
<soap12:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:soap12="http://www.w3.org/2003/05/soap-envelope">
<soap12:Body><nfeDistDFeInteresse xmlns="http://www.portalfiscal.inf.br/nfe/wsdl/NFeDistribuicaoDFe">
<nfeDadosMsg><distDFeInt xmlns="http://www.portalfiscal.inf.br/nfe" versao="1.01">
  <tpAmb>2</tpAmb>
  <cUFAutor>33</cUFAutor>
  <CNPJ>39255950000100</CNPJ>
  <distNSU>
   <ultNSU>000000000000000</ultNSU>
  </distNSU>
  </distDFeInt>
</nfeDadosMsg>
</nfeDistDFeInteresse>
</soap12:Body>
</soap12:Envelope>`;
