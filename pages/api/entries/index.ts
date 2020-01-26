import { NextApiRequest, NextApiResponse } from 'next';
import { getEntries, postEntries } from '../../../src/backend/routes/entries';

async function get(req: NextApiRequest, res: NextApiResponse): Promise<void> {
  const userId = typeof req.query.user === 'string' ? req.query.user : undefined;
  const currentWeek = req.query.week === 'current';
  const result = await getEntries({ userId, currentWeek });
  res.status(200).json(result);
}

async function post(req: NextApiRequest, res: NextApiResponse): Promise<void> {
  try {
    const result = await postEntries(req.body);
    res.status(201).json(result);
  } catch (error) {
    res.status(500).json({ error });
  }
}

export default (req: NextApiRequest, res: NextApiResponse): Promise<void> | undefined => {
  switch (req.method) {
    case 'GET':
      return get(req, res);
    case 'POST':
      return post(req, res);
    default:
      res.status(500).end();
  }
};
