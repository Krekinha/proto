import type { NextApiRequest, NextApiResponse } from "next";

export default async function login(req: NextApiRequest, res: NextApiResponse) {
  try {
    const { email, senha } = req.body;

    const fakeUser = {}
    /*const user = await prisma.user.findFirst({
      where: {
        email: email,
        senha: senha,
      },
    });*/

    res.status(200).json(fakeUser);
  } catch (err) {
    res.status(500).json("erro: " + err);
    console.log(res.status(500).json("erro: " + err));
  }
}
