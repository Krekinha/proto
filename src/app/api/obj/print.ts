import type { NextApiRequest, NextApiResponse } from "next";
export default async function addNbmST(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const data = req.body;

    res.status(200).json({ data });
  } catch (err) {
    res.status(500).json("erro: " + err);
    console.log(res.status(500).json("erro: " + err));
  }
}
