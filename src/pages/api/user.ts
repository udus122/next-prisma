import { PrismaClient } from '@prisma/client';
import { NextApiRequest, NextApiResponse } from 'next';

const prisma = new PrismaClient();

// POST /api/user
// Required fields in body: name, email
export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  console.log(req);
  const result = await prisma.user.create({
    data: {
      ...req.body,
    },
  });
  console.log(result);
  res.status(200).json(result);
}
