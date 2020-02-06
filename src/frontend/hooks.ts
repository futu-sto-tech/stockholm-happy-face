import { GlobalInterface, globalContext } from './context/global';
import { useContext, useEffect, useState } from 'react';

export function useDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => setDebouncedValue(value), delay);
    return (): void => clearTimeout(handler);
  }, [value, delay]);

  return debouncedValue;
}

export function useGlobalContext(): GlobalInterface {
  return useContext(globalContext);
}

export function useGifQuery(): string {
  return useGlobalContext().gifQuery;
}

export function useChangeGifQuery(): (query: string) => void {
  return useGlobalContext().setGifQuery;
}

export function useOffset(): number {
  return useGlobalContext().offset;
}

export function useChangeOffset(): (offset: number) => void {
  return useGlobalContext().setOffset;
}
