import { NextApiRequest, NextApiResponse } from 'next';

import axios from 'axios';

interface RequestBody {
  event: {
    data: {
      new: {
        id: string;
        email: string;
      };
    };
  };
}

const HASURA_GRAPHQL_ENDPOINT = process.env.HASURA_GRAPHQL_ENDPOINT as string;
const HASURA_GRAPHQL_ADMIN_SECRET = process.env.HASURA_GRAPHQL_ADMIN_SECRET as string;

const oldApiClient = axios.create({
  baseURL: 'https://smileys.futurice.com/api',
  headers: { Accept: 'application/json' },
});

const newApiClient = axios.create({
  baseURL: `https://${HASURA_GRAPHQL_ENDPOINT}`,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
    'X-Hasura-Admin-Secret': HASURA_GRAPHQL_ADMIN_SECRET,
  },
});

const INSERT_OLD_ENTRIES_MUTATION = /* GraphQL */ `
  mutation InsertOldEntries($objects: [old_entry_insert_input!]!) {
    insert_old_entry(objects: $objects) {
      returning {
        id
      }
    }
  }
`;

async function processUser(userId: string, oldUserId: string): Promise<any> {
  const entries = await oldApiClient.get('/entries', { params: { user: oldUserId } });

  const objects = entries.data.map((item: any) => ({
    // eslint-disable-next-line
    user_id: userId,
    // eslint-disable-next-line
    created_at: new Date(item.createdAt).toISOString(),
    url: item.images.original.url,
  }));

  const response = await newApiClient.post('', {
    query: INSERT_OLD_ENTRIES_MUTATION,
    variables: { objects },
  });

  if (response.data.errors) {
    console.warn(JSON.stringify(response.data.errors));
  } else {
    console.info(`Added new entries: ${JSON.stringify(response.data)}`);
  }
}

export default async (req: NextApiRequest, res: NextApiResponse): Promise<void> => {
  const body = req.body as RequestBody;
  const newUser = body.event.data.new;
  console.info(`Processing user: ${newUser.id} with email: ${newUser.email}`);

  const users = await import('../../../../data/users.json');
  const oldUsers = users.default.filter((oldUser) => oldUser.email === newUser.email);

  try {
    await Promise.all(
      oldUsers.map((oldUser) => {
        console.info(`Found old user: ${oldUser.name}`);
        return processUser(newUser.id, oldUser.id);
      }),
    );
    return res.end(JSON.stringify({ success: true }));
  } catch (error) {
    console.warn(error);
    return res.end(JSON.stringify({ success: false }));
  }
};
