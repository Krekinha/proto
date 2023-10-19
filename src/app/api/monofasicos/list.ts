import type { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../../utils/prisma";

export default async function listNbmST(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const ncm = await prisma.monofasico.findMany();

    res.status(200).json({ ncm });
  } catch (err) {
    res.status(500).json(err);
  }
}
