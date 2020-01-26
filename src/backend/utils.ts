import * as t from 'io-ts';

import { ApiEntry, ApiUser } from '../types';
import { DbAggregateEntry, DbUser } from './types';

import dayjs from 'dayjs';
import { either } from 'fp-ts/lib/Either';
import relativeTime from 'dayjs/plugin/relativeTime';
import weekOfYear from 'dayjs/plugin/weekOfYear';

dayjs.extend(weekOfYear);
dayjs.extend(relativeTime);

export function getGiphyId(url: string): string | undefined {
  const giphyIdMatchList = url.match(/\/media\/(.*?)\/giphy\.gif/);
  return giphyIdMatchList ? giphyIdMatchList[1] : undefined;
}

export function mapDbEntryToApi(item: DbAggregateEntry): ApiEntry {
  const createdDate = dayjs(item.created_at);

  return {
    id: String(item._id),
    createdAt: createdDate.toDate().toString(),
    updatedAt: createdDate.toDate().toString(),
    gif: {
      id: String(item._id),
      giphyId: item.images.giphyId,
      url: item.images.original.url,
    },
    images: {
      giphyId: item.images.giphyId,
      original: { url: item.images.original.url },
      preview: item.images.preview && { url: item.images.preview.url },
    },
    user: {
      id: String(item.user._id),
      name: String(item.user.name),
    },
    fromNow: createdDate.fromNow(),
    week: createdDate.week(),
    year: createdDate.year(),
  };
}

export function mapDbUserToApi(item: DbUser): ApiUser {
  const { _id, ...rest } = item;
  return {
    id: String(_id),
    createdAt: _id.getTimestamp(),
    ...rest,
  };
}

// represents a Date from an ISO string
export const DateFromString = new t.Type<Date, string, unknown>(
  'DateFromString',
  (u): u is Date => u instanceof Date,
  (u, c) =>
    either.chain(t.string.validate(u, c), s => {
      const d = new Date(s);
      return isNaN(d.getTime()) ? t.failure(u, c) : t.success(d);
    }),
  a => a.toISOString(),
);
