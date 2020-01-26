import { ObjectID } from 'mongodb';

export type DbUser = {
  _id: ObjectID;
  name: string;
};

export type DbEntry = {
  _id: ObjectID;
  created_at: Date;
  user_id: ObjectID;
  images: {
    giphyId?: string;
    original: {
      url: string;
    };
    preview?: {
      url: string;
    };
  };
};

export type DbAggregateEntry = DbEntry & { user: DbUser };
