import { NextApiRequest, NextApiResponse } from 'next';

import { getUser } from '../../../src/backend/routes/users-id';

export default async (req: NextApiRequest, res: NextApiResponse): Promise<void> => {
  const id = req.query.id as string;
  const result = await getUser(id);

  if (result) {
    res.status(200).json(result);
  } else {
    res.status(404).json({ error: 'User not found' });
  }
};
