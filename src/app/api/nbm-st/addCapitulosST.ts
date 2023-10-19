import type { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../../utils/prisma";

export default async function addCapitulosST(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const data = req.body;

    const newCapitulos = await prisma.capituloST.createMany({
      data: data,
    });

    res.status(200).json({ newNbmST: newCapitulos });
  } catch (err) {
    res.status(500).json("erro: " + err);
    console.log(res.status(500).json("erro: " + err));
  }
}
