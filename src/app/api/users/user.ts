import type { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../../utils/prisma";

export default async function addUser(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const { email, senha } = req.body;

    const user = await prisma.user.findFirst({
      where: {
        email: email,
        senha: senha,
      },
    });

    res.status(200).json(user);
  } catch (err) {
    res.status(500).json("erro: " + err);
    console.log(res.status(500).json("erro: " + err));
  }
}
