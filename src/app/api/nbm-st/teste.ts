import type { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../../utils/prisma";

export async function listNbmST(req: NextApiRequest, res: NextApiResponse) {
  try {
    const nbms = await prisma.nbmST.findMany({
      include: {
        capitulo: true,
        aplicacao: true,
        mva: true,
      },
    });

    res.status(200).json({ nbms });
  } catch (err) {
    res.status(500).json(err);
  }
}
