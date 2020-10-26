import { AppMachine, AppMachineContext } from './machines/app-context';
import { Result, UseSubscriptionOperation, useSubscription } from 'graphql-hooks';
import { useContext, useEffect, useState } from 'react';

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

export function useAppMachine(): AppMachine {
  const context = useContext(AppMachineContext);
  if (context === undefined) {
    throw new Error('useAppMachine must be used within an AppProvider');
  }
  return context;
}

export function useUserId(): string {
  const [state] = useAppMachine();
  if (state.context.auth === null) {
    throw new Error('useUserId must be used in logged in state');
  }
  return state.context.auth.userId;
}

export function useClickOutside(ref: any, callback: () => void) {
  useEffect(() => {
    const listener = (event: globalThis.MouseEvent | TouchEvent) => {
      if (!ref.current || ref.current.contains(event.target)) {
        return;
      }
      callback();
    };

    document.addEventListener('mousedown', listener);
    document.addEventListener('touchstart', listener);

    return () => {
      document.removeEventListener('mousedown', listener);
      document.removeEventListener('touchstart', listener);
    };
  }, [ref, callback]);
}
