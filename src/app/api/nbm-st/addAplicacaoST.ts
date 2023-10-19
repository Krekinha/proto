import type { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../../utils/prisma";

export default async function addAplicacaoST(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const data = req.body;

    const newAplicacao = await prisma.aplicacaoST.createMany({
      data: data,
    });

    res.status(200).json({ newAplicacao });
  } catch (err) {
    res.status(500).json("erro: " + err);
    console.log(res.status(500).json("erro: " + err));
  }
}
