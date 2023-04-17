// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";

type RequestBody = {
  username: string;
  password: string;
};
type SuccessResponse = {
  message: string;
};

type ErrorResponse = {
  error: string;
};

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<SuccessResponse | ErrorResponse>
) {
  if (req.method !== "POST") {
    res.status(405).json({ error: "Method not allowed" });
    return;
  }
  const { username, password } = req.body as RequestBody;
  if (username !== "username" || password !== "password") {
    res.status(401).json({ error: "authentication failed" });
    return;
  }
  try {
    const responseData = { message: "success" };
    res.status(200).json(responseData);
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
}
