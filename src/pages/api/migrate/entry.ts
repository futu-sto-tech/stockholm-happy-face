import { NextApiRequest, NextApiResponse } from 'next';

import axios from 'axios';

interface RequestBody {
  event: {
    data: {
      new: {
        id: number;
        user_id: string;
        url: string;
        created_at: string;
      };
    };
  };
}

const HASURA_GRAPHQL_ENDPOINT = process.env.HASURA_GRAPHQL_ENDPOINT as string;
const HASURA_GRAPHQL_ADMIN_SECRET = process.env.HASURA_GRAPHQL_ADMIN_SECRET as string;

const newApiClient = axios.create({
  baseURL: `https://${HASURA_GRAPHQL_ENDPOINT}`,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
    'X-Hasura-Admin-Secret': HASURA_GRAPHQL_ADMIN_SECRET,
  },
});

const INSERT_ENTRY_MUTATION = /* GraphQL */ `
  mutation InsertEntry($userId: String, $createdAt: timestamptz, $url: String) {
    insert_entry(
      objects: {
        user_id: $userId
        team_id: 1
        created_at: $createdAt
        image: { data: { original_url: $url } }
      }
    ) {
      returning {
        id
      }
    }
  }
`;

async function processEntry(userId: string, url: string, createdAt: string): Promise<void> {
  const response = await newApiClient.post('', {
    query: INSERT_ENTRY_MUTATION,
    variables: { userId, createdAt, url },
  });
  if (response.data.errors) {
    console.warn(JSON.stringify(response.data.errors));
  } else {
    console.info(`Added new entry: ${JSON.stringify(response.data)}`);
  }
}

export default async (req: NextApiRequest, res: NextApiResponse): Promise<void> => {
  const body = req.body as RequestBody;
  const oldEntry = body.event.data.new;
  console.info(`Processing entry: ${oldEntry.id} with URL: ${oldEntry.url}`);

  try {
    await processEntry(oldEntry.user_id, oldEntry.url, oldEntry.created_at);
    return res.end(JSON.stringify({ success: true }));
  } catch (error) {
    console.warn(error);
    return res.end(JSON.stringify({ success: false }));
  }
};
