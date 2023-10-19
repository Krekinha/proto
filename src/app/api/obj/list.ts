import type { NextApiRequest, NextApiResponse } from "next";
import * as fs from "fs";
import PDFParser from "pdf2json";

export default async function list(
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> {
  try {
    const reader = new PDFParser();

    res.status(200).json({ reader });
  } catch (err) {
    res.status(500).json(err);
  }
}
