import type { NextApiRequest, NextApiResponse } from "next";
import { NextResponse } from "next/server";
import { prisma } from "../../../../utils/prisma";

export async function GET(request: Request) {
  try {
    const nbms = await prisma.nbmST.findMany({
      include: {
        capitulo: true,
        aplicacao: true,
        mva: true,
      },
    });

    return NextResponse.json({ nbms });
    //res.status(200).json({ nbms });
  } catch (err) {
    console.log(err);
    //res.status(500).json(err);
  }
}
