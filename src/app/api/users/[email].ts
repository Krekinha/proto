import type { NextApiRequest, NextApiResponse } from "next";
import next from "next";

import { prisma } from "../../../utils/prisma";

export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { email } = req.query;

  try {
    if (req.method === "GET") {
      const getUserById = await prisma.user.findFirst({
        where: { email: email as string },
      });
      return res.status(200).json(getUserById);
    }
  } catch (error: any) {
    next(error);
  }
}
