export type User = {
  id: string;
  name: string;
};

export type EntryGif = {
  id: string;
  url: string;
  giphyId?: string;
  height?: string;
  width?: string;
};

export type EntryUser = {
  id: string;
  name: string;
};

export type ApiEntry = {
  id: string;
  updatedAt: string;
  gif: EntryGif;
  createdAt: string;
  user: EntryUser;
  fromNow: string;
  week: number;
  year: number;
  images: {
    giphyId?: string;
    original: { url: string };
    preview?: { url: string };
  };
};

export type ApiUser = {
  id: string;
  name: string;
  createdAt: Date;
};

type SearchResultImage = {
  width: string;
  height: string;
  url: string;
};

export type SearchResult = {
  id: string;
  title: string;
  preview: SearchResultImage;
  original: SearchResultImage;
};
