import { fetchBc } from "@/utils";
import type { NextApiRequest, NextApiResponse } from "next";
import { off } from "process";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    res.status(405).send({ message: "Only POST requests allowed" });
    return;
  }
  const { method, query, key, offset } = JSON.parse(req.body);

  if (!method || !query || !key)
    throw Error("method or query or key not provided");

  const response = await fetchBc(method, {
    params: {
      [key]: query,
      ...(offset ? { offset: parseInt(offset) } : {}),
    },
  });

  res.status(200).json(response);
}
