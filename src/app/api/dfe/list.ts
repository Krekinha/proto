import type { NextApiRequest, NextApiResponse } from "next";
import * as fs from "fs";
import p12info from "p12-info";

export default async function listNbmST(
  req: NextApiRequest,
  res: NextApiResponse
) {
  /*try {
    const { DistribuicaoDFe } = require("node-mde");

    const distribuicao = new DistribuicaoDFe({
      pfx: fs.readFileSync("./support/certificado.pfx"),
      passphrase: "dasa,78",
      cnpj: "39255950000100",
      cUFAutor: "33",
      tpAmb: "1",
    });

    const consulta = await distribuicao.consultaUltNSU("000000000000000");

    res.status(200).json({ consulta });
  } catch (err) {
    res.status(500).json(err);
  }*/

  try {
    const pfx = fs.readFileSync("./support/certificado.pfx");
    const parsed = p12info(pfx, "dasa,78");

    res.status(200).json({ parsed });
  } catch (err) {
    res.status(500).json(err);
  }
}
