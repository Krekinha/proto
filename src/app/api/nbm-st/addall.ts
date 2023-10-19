import type { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../../utils/prisma";

interface NbmProps {
  nbm: string;
  cest: string;
  capitulo?: any;
  aplicacao?: any;
  mva?: any;
  descricao?: string;
  mensagem?: string;
}
export default async function addNbmST(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const dataReq = req.body;
    let nbms: NbmProps[] = [];
    dataReq.map((el: any) => {
      let nbm: any = {};

      nbm.nbm = el.nbm;
      nbm.cest = el.cest;

      if (el.capitulo) {
        nbm.capitulo = { connect: { numero: el.capitulo } };
      } else {
        nbm.capitulo = undefined;
      }

      if (el.aplicacao) {
        const aplicacao = el.aplicacao.split("/");
        let arr: { numero: any }[] = [];

        aplicacao.map((ele: any) => {
          arr.push({ numero: ele.trim() });
        });
        nbm.aplicacao = { connect: arr };
      } else {
        //el.aplicacao = undefined;
        nbm.aplicacao = undefined;
      }

      if (el.mva) {
        const mva = el.mva.split("/");
        let arrMVA: { valor: any }[] = [];

        mva.map((ele: any) => {
          arrMVA.push({ valor: ele.trim() });
        });

        if (el.descricaoMva) {
          const descricaoMva = el.descricaoMva.split("/");
          let arrDescMVA: { descricao: any }[] = [];

          descricaoMva.map((ele: any) => {
            arrDescMVA.push({ descricao: ele.trim() });
          });

          const combinedArray = arrMVA.map((obj: any, index: any) => ({
            ...obj,
            ...arrDescMVA[index],
          }));
          nbm.mva = { create: combinedArray };
        } else {
          nbm.mva = { create: arrMVA };
        }
      } else {
        nbm.mva = undefined;
      }

      nbm.descricao = el.descricao;
      nbm.mensagem = el.mensagem;

      nbms.push(nbm);
    });

    //console.log(data2);

    //const newNbmST = await prisma.nbmST.createMany({ data: data }

    nbms.forEach(async (el: any) => {
      try {
        const newNbmST = await prisma.nbmST.create({
          data: {
            nbm: el.nbm,
            cest: el.cest,
            capitulo: el.capitulo,
            aplicacao: el.aplicacao,
            mva: el.mva,
            descricao: el.descricao,
            mensagem: el.mensagem,
          },
        });
      } catch (err) {
        res.status(500).json("erro: " + err + res.json(el));
        console.log(res.status(500).json("erro: " + err));
      }
    });

    /*const newNbmST = await prisma.nbmST.createMany({
      data: nbms.map((el: NbmProps) => {
        return {
          nbm: el.nbm,
          cest: el.cest,
          mva:{create:[{valor:"45"}]},
          descricao: el.descricao,
          mensagem: el.mensagem,
        };
      }),
    });*/

    //res.status(200).json({ nbms });
  } catch (err) {
    res.status(500).json("erro: " + err);
    console.log(res.status(500).json("erro: " + err));
  }
}
