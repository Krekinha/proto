import type { NextApiRequest, NextApiResponse } from "next";

export async function POST(req: Request) {
  try {
    const { email, senha } = await req.json();
    const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImNsbnYxbGh2OTAwMDlwdTBrdDY4YmFqaG0iLCJpYXQiOjE2OTc2OTkxMDIsImV4cCI6MTY5Nzc4NTUwMn0.WV_TK2ySmb-Psfg2NaHisYYDOZHHwHxrQWsF5HjtIgk"
    console.log(email);
    console.log(senha);

    const fakeUser = {
      id: "clnv1lhv90009pu0kt68bajhm",
      nome: "Krekinha",
      email: "krekmg@gmail.com",
      role: "DEV",
      };
    /*const user = await prisma.user.findFirst({
      where: {
        email: email,
        senha: senha,
      },
    });*/

    return Response.json({
      user: fakeUser,
      token: token
    });
  } catch (err: any) {
    return new Response(err, { status: 401 });
  }
}
