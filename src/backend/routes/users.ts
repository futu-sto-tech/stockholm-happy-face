import { ApiUser } from '../../types';
import { DbUser } from '../types';
import { FilterQuery } from 'mongodb';
import { mapDbUserToApi } from '../utils';
import { userCollection } from '../database';

export async function getUsers(query?: string): Promise<ApiUser[]> {
  const collection = await userCollection();
  let dbQuery: FilterQuery<DbUser> = {};
  if (query) {
    dbQuery = { name: { $regex: `.*${query}.*`, $options: 'i' } };
  }
  const docs = collection.find(dbQuery);
  const users = await docs.map(mapDbUserToApi).toArray();
  return users;
}

export async function postUsers(name: string): Promise<ApiUser> {
  const collection = await userCollection();

  const existingUser = await collection.findOne({ name: name });
  if (existingUser) {
    throw new Error('A user with that name already exists');
  }

  const doc = await collection.insertOne({ name: name });
  const dbUser = await collection.findOne({ _id: doc.insertedId });

  if (dbUser === null) {
    throw new Error('Unable to save user');
  }

  return mapDbUserToApi(dbUser);
}
