import { NextApiRequest, NextApiResponse } from 'next';

import { searchGif } from '../../../src/backend/routes/gif-search';

export default async (req: NextApiRequest, res: NextApiResponse): Promise<void> => {
  const query = req.query.query;

  if (typeof query !== 'string') {
    return res.status(400).json({ message: 'query parameter is required' });
  }

  const offset = typeof req.query.offset === 'string' ? parseInt(req.query.offset) : undefined;
  const result = await searchGif(query, offset);

  res.status(200).json(result);
};
