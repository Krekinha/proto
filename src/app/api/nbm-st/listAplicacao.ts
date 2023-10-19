import type { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../../utils/prisma";

export default async function listAplicacao(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const aplicacao = await prisma.aplicacaoST.findMany();

    res.status(200).json({ capitulos: aplicacao });
  } catch (err) {
    res.status(500).json(err);
  }
}
