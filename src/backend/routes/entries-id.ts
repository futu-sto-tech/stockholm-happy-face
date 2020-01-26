import { entryCollection, userCollection } from '../database';

import { ApiEntry } from '../../types';
import { ObjectID } from 'mongodb';
import { mapDbEntryToApi } from '../utils';

export async function getEntry(entryId: string): Promise<ApiEntry | undefined> {
  const collection = await entryCollection();
  const dbDoc = await collection.findOne({ _id: new ObjectID(entryId) });

  if (dbDoc) {
    const userDoc = await (await userCollection()).findOne({ _id: dbDoc.user_id });
    return userDoc ? mapDbEntryToApi({ ...dbDoc, user: userDoc }) : undefined;
  }
}

export async function deleteEntry(entryId: string): Promise<ApiEntry> {
  const collection = await entryCollection();
  const dbDoc = await collection.findOne({ _id: new ObjectID(entryId) });

  if (dbDoc === null) {
    throw new Error('Entry not found');
  }

  const userDoc = await (await userCollection()).findOne({ _id: dbDoc.user_id });
  if (userDoc === null) {
    throw new Error('Something went wrong deleting entry');
  }

  const result = await collection.deleteOne({ _id: new ObjectID(entryId) });

  if (result.deletedCount === 1) {
    return mapDbEntryToApi({ ...dbDoc, user: userDoc });
  }

  throw new Error('Something went wrong deleting entry');
}
