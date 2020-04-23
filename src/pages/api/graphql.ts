import { ApiGifObject, getGiphyGif, searchGiphy, trendingGiphy } from '../../lib/giphy';
import { NextApiRequest, NextApiResponse } from 'next';
import { buildSchema, graphql } from 'graphql';

const schema = buildSchema(`
  type GifImage {
    width: String!
    height: String!
    url: String!
  }

  type GifResult {
    id: String!
    title: String!
    preview: GifImage!
    original: GifImage!
    fixed_width: GifImage!
  }

  type Query {
    search_gif(query: String!, limit: Int, offset: Int): [GifResult!]!
    trending_gif(limit: Int, offset: Int): [GifResult!]!
    gif(id: String!): GifResult
  }
`);

const root = {
  // eslint-disable-next-line @typescript-eslint/camelcase
  search_gif: ({
    query,
    ...options
  }: {
    query: string;
    limit: number;
    offset: number;
  }): Promise<ApiGifObject[]> => searchGiphy(query, options),
  // eslint-disable-next-line @typescript-eslint/camelcase
  trending_gif: (options: { limit: number; offset: number }): Promise<ApiGifObject[]> =>
    trendingGiphy(options),
  gif: getGiphyGif,
};

export default async (req: NextApiRequest, res: NextApiResponse): Promise<void> => {
  const query = req.body.query || req.query.query;

  let variables = {};
  if (req.body.variables) {
    variables = req.body.variables;
  } else if (typeof req.query.variables === 'string') {
    variables = JSON.parse(req.query.variables as string);
  }

  const response = await graphql(schema, query, root, undefined, variables);
  return res.end(JSON.stringify(response));
};
