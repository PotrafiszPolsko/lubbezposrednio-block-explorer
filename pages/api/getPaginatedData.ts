import type { NextApiRequest, NextApiResponse } from "next";
import { fetchBc } from "@/utils";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    res.status(405).send({ message: "Only POST requests allowed" });
    return;
  }

  const { method, offset, key, keyValue } = JSON.parse(req.body);

  if (!method || !offset) throw Error("method or offset provided");

  const response = await fetchBc(method, {
    params: {
      offset: parseInt(offset),
      [key]: keyValue,
    },
  });

  res.status(200).json(response);
}
