import { Result, UseSubscriptionOperation, useSubscription } from 'graphql-hooks';
import { useEffect, useState } from 'react';

import memCache from 'graphql-hooks-memcache';

const CACHE = memCache();

export function useDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => setDebouncedValue(value), delay);
    return (): void => clearTimeout(handler);
  }, [value, delay]);

  return debouncedValue;
}

export function useSubscriptionWithCache<T extends object>(
  operation: UseSubscriptionOperation,
): T | undefined {
  const [data, setData] = useState<T>(CACHE.get(operation) as T);

  useSubscription(operation, ({ error, data }: Result<T>) => {
    if (error) {
      return;
    }

    if (data !== undefined) {
      CACHE.set(operation, data);
      setData(data);
    }
  });

  return data;
}
