import { createContext } from 'react';

const initialState = {
  gifQuery: '',
  setGifQuery: (_: string): void => undefined,
  offset: 0,
  setOffset: (_: number): void => undefined,
};

const context = createContext(initialState);

export type GlobalInterface = typeof initialState;
export const globalContext = context;
export const GlobalProvider = context.Provider;
export const globalInitialState = initialState;
