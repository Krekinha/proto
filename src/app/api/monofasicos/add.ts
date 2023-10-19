import type { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../../utils/prisma";

export default async function addMonofasicos(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const data = req.body;

    const newMonofasico = await prisma.monofasico.createMany({
      data: data,
    });

    res.status(200).json({ newMonofasico });
  } catch (err) {
    res.status(500).json("erro: " + err);
    console.log(res.status(500).json("erro: " + err));
  }
}
