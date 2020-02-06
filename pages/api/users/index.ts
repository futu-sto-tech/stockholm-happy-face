import { NextApiRequest, NextApiResponse } from 'next';
import { getUsers, postUsers } from '../../../src/backend/routes/users';

async function get(req: NextApiRequest, res: NextApiResponse): Promise<void> {
  const query = typeof req.query.query === 'string' ? req.query.query : undefined;
  const result = await getUsers(query);
  res.status(200).json(result);
}

async function post(req: NextApiRequest, res: NextApiResponse): Promise<void> {
  if (typeof req.body.name !== 'string') {
    res.status(400).json({ error: 'Request body missing name field' });
  }

  try {
    const result = await postUsers(req.body.name);
    res.status(201).json(result);
  } catch (error) {
    res.status(500).json({ error });
  }
}

export default async (req: NextApiRequest, res: NextApiResponse): Promise<void> => {
  switch (req.method) {
    case 'GET':
      await get(req, res);
      break;
    case 'POST':
      await post(req, res);
      break;
    default:
      res.status(400).json({ error: 'method not defined' });
  }
};
