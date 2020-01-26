import * as t from 'io-ts';

import { DateFromString, getGiphyId, mapDbEntryToApi } from '../utils';
import { DbAggregateEntry, DbEntry } from '../types';
import { FilterQuery, ObjectID } from 'mongodb';
import { entryCollection, userCollection } from '../database';

import { ApiEntry } from '../../types';
import dayjs from 'dayjs';
import { getGiphyGif } from '../giphy';
import { isRight } from 'fp-ts/lib/Either';

export async function getEntries({
  userId,
  currentWeek,
}: {
  userId?: string;
  currentWeek?: boolean;
}): Promise<ApiEntry[]> {
  let dbQuery: FilterQuery<DbEntry> = {};
  if (userId) {
    // eslint-disable-next-line @typescript-eslint/camelcase
    dbQuery = { user_id: new ObjectID(userId) };
  }

  if (currentWeek) {
    const fromDate = dayjs().startOf('week');
    const toDate = dayjs().endOf('week');

    dbQuery['$and'] = [
      // eslint-disable-next-line @typescript-eslint/camelcase
      { created_at: { $gte: fromDate.toDate() } },
      // eslint-disable-next-line @typescript-eslint/camelcase
      { created_at: { $lte: toDate.toDate() } },
    ];
  }

  const collection = await entryCollection();

  const results = await collection
    .aggregate<DbAggregateEntry>([
      { $match: dbQuery },
      {
        $lookup: {
          from: 'users',
          localField: 'user_id',
          foreignField: '_id',
          as: 'user',
        },
      },
      { $unwind: '$user' },
    ])
    // eslint-disable-next-line @typescript-eslint/camelcase
    .sort({ created_at: -1 })
    .toArray();

  return results.map(mapDbEntryToApi);
}

const EntryDataModel = t.type({
  userId: t.string,
  url: t.string,
  createdAt: t.union([DateFromString, t.undefined]),
});

export async function postEntries(data: any): Promise<ApiEntry> {
  const collection = await entryCollection();
  const result = EntryDataModel.decode(data);

  if (!isRight(result)) {
    throw new Error('Error in body');
  }

  const inData = result.right;
  const userId = new ObjectID(inData.userId);

  const userDoc = await (await userCollection()).findOne({ _id: userId });
  if (userDoc === null) {
    throw new Error("User ID doesn't exist");
  }

  const newEntry: Omit<DbEntry, '_id'> = {
    // eslint-disable-next-line @typescript-eslint/camelcase
    user_id: userId,
    // eslint-disable-next-line @typescript-eslint/camelcase
    created_at: inData.createdAt || new Date(),
    images: {
      original: {
        url: inData.url,
      },
    },
  };

  const giphyId = getGiphyId(inData.url);
  if (giphyId) {
    try {
      const image = await getGiphyGif(giphyId);
      if (image) {
        newEntry.images.giphyId = giphyId;
        newEntry.images.preview = { url: image.preview.url };
      } else {
        console.warn(`Unable to fetch giphy image: ${giphyId}`);
      }
    } catch (error) {
      console.warn(`Error fetching giphy image: ${giphyId}`);
    }
  }

  const doc = await collection.insertOne(newEntry);

  const entryDoc = await collection.findOne({ _id: doc.insertedId });

  if (entryDoc === null) {
    throw new Error('Could not save entry');
  }

  return mapDbEntryToApi({ ...entryDoc, user: userDoc });
}
