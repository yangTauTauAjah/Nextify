import { NextApiRequest, NextApiResponse } from "next";

export default function handler(req: NextApiRequest, res: NextApiResponse<void>) {

  req.query['code']

  res.redirect('/')
}