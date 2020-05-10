import { GraphQLClient } from 'graphql-hooks';
import { SubscriptionClient } from 'subscriptions-transport-ws';
import axios from 'axios';
import { buildAxiosFetch } from '@lifeomic/axios-fetch';
import memCache from 'graphql-hooks-memcache';

export const gqlAxios = axios.create();

type HeadersFunction = () => Promise<{ headers: { Authorization: string } }>;

export function createGraphqlClient(headers: HeadersFunction): GraphQLClient {
  const graphqlClient = new GraphQLClient({
    url: `https://${process.env.HASURA_GRAPHQL_ENDPOINT}`,
    cache: memCache(),
    fetch: buildAxiosFetch(gqlAxios),
    subscriptionClient:
      typeof window === 'undefined'
        ? undefined
        : new SubscriptionClient(`wss://${process.env.HASURA_GRAPHQL_ENDPOINT}`, {
            reconnect: true,
            connectionParams: headers,
          }),
  });

  return graphqlClient;
}

export function createApiClient(token: string): GraphQLClient {
  return new GraphQLClient({
    url: `https://${process.env.HASURA_GRAPHQL_ENDPOINT}`,
    cache: memCache(),
    headers: { Authorization: `Bearer ${token}` },
    subscriptionClient: new SubscriptionClient(`wss://${process.env.HASURA_GRAPHQL_ENDPOINT}`, {
      reconnect: true,
      connectionParams: { headers: { Authorization: `Bearer ${token}` } },
    }),
  });
}
