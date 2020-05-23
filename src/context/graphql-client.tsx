import React, { useRef } from 'react';

import { ClientContext } from 'graphql-hooks';
import { createApiClient } from '../graphql/client';

type GraphqlClientProviderProps = { children: React.ReactNode; token: string };

export default function GraphqlClientProvider({
  children,
  token,
}: GraphqlClientProviderProps): JSX.Element {
  const client = useRef(createApiClient(token));
  return <ClientContext.Provider value={client.current}>{children}</ClientContext.Provider>;
}
