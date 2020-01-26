import { ApiUser } from '../../types';
import { ObjectID } from 'mongodb';
import { mapDbUserToApi } from '../utils';
import { userCollection } from '../database';

export async function getUser(userId: string): Promise<ApiUser | undefined> {
  const collection = await userCollection();
  const dbUser = await collection.findOne({ _id: new ObjectID(userId) });
  if (dbUser) {
    return mapDbUserToApi(dbUser);
  }
}
