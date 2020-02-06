import { NextApiRequest, NextApiResponse } from 'next';
import { deleteEntry, getEntry } from '../../../src/backend/routes/entries-id';

async function get(req: NextApiRequest, res: NextApiResponse): Promise<void> {
  const id = req.query.id as string;
  const result = await getEntry(id);
  if (result === undefined) {
    return res.status(404).json({ error: 'Entry not found' });
  }
  res.status(200).json(result);
}

async function deleteRequest(req: NextApiRequest, res: NextApiResponse): Promise<void> {
  const id = req.query.id as string;
  try {
    const result = await deleteEntry(id);
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ error });
  }
}

export default async (req: NextApiRequest, res: NextApiResponse): Promise<void> => {
  switch (req.method) {
    case 'GET':
      await get(req, res);
      break;
    case 'DELETE':
      await deleteRequest(req, res);
      break;
    default:
      res.status(400).json({ error: 'method not defined' });
  }
};
