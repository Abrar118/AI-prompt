import User from "@models/users";
import { Collection, Db, MongoClient } from "mongodb";

const URI = process.env.ATLAS_URI as string;
const database = process.env.DATABASE as string;
let db: Db;

const createConnection = async () => {
  if (db) {
    console.log("Already connected");
    return db;
  }

  const client = await MongoClient.connect(URI).catch((err) => {
    throw err;
  });
  db = client.db(database);
  console.log("Connected to database");
  return db;
};

export { createConnection };
