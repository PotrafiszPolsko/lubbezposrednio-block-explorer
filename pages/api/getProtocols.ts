import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "GET") {
    res.status(405).send({ message: "Only GET requests allowed" });
    return;
  }
  const search = req.query.search;

  const response = await fetch(
    (process.env.PROTOCOLS_URL as string) + (search ? `?search=${search}` : ""),
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: process.env.PROTOCOLS_AUTH as string
      }
    }
  );
  const data = await response.json();

  res.status(200).json(data);
}
