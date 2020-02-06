import { Collection, Db, MongoClient } from 'mongodb';
import { DbEntry, DbUser } from './types';

const mongoUrl = process.env.MONGO_URL as string;

let cachedDb: Db | undefined = undefined;

export const dbName = process.env.MONGO_DB_NAME as string;

async function connectToDatabase(): Promise<Db> {
  if (cachedDb) {
    return cachedDb;
  }

  // If no connection is cached, create a new one
  const client = new MongoClient(mongoUrl, { useNewUrlParser: true, useUnifiedTopology: true });
  const db = (await client.connect()).db(dbName);

  // Cache the database connection and return the connection
  cachedDb = db;
  return db;
}

export const userCollection = async (): Promise<Collection<DbUser>> => {
  const db = await connectToDatabase();
  return db.collection<DbUser>('users');
};

export const entryCollection = async (): Promise<Collection<DbEntry>> => {
  const db = await connectToDatabase();
  return db.collection<DbEntry>('entries');
};
