import { MongoClient } from 'mongodb';

const uri = process.env.MONGODB_URI || '';

let clientPromise: Promise<MongoClient>;

if (!process.env.MONGODB_URI) {
  throw new Error('Please add your MongoDB URI to .env.local');
}

// Create client with minimal options
const client = new MongoClient(uri);

clientPromise = client.connect();

export default clientPromise;
