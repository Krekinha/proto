import type { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../../utils/prisma";
import jwt, { Secret } from "jsonwebtoken";
import { Account, User } from "@/utils/types";

const account: Account = { access_token: "" };
const userR: User = {
  name: "vanessa",
  email: "email",
  senha: "senha",
  token: "token",
  accounts: [
    {
      ...account,
    },
  ],
};

export default async function addUser(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const data = req.body;
    const KEY = process.env.NEXTAUTH_SECRET as Secret;
    const token = jwt.sign(
      {
        email: data.email,
        senha: data.senha,
      },
      KEY
    );

    const newUser = await prisma.user.create({
      data: {
        ...data,
        token: token,
      },
    });

    const newUser2 = {
      ...data,
      token: token,
    };

    //console.log();

    res.status(200).json({ newUser });
  } catch (err) {
    res.status(500).json(err);
  }
}
