import type { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../../utils/prisma";

export default async function listCapitulos(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const capitulos = await prisma.capituloST.findMany();

    res.status(200).json({ capitulos });
  } catch (err) {
    res.status(500).json(err);
  }
}
