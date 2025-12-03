import { MongoClient } from 'mongodb';

const uri = process.env.MONGODB_URI || '';

let clientPromise: Promise<MongoClient>;

if (!process.env.MONGODB_URI) {
  throw new Error('Please add your MongoDB URI to .env.local');
}

const mongoOptions = {
  retryWrites: true,
  w: 'majority' as const,
  tlsInsecure: true,
};

if (process.env.NODE_ENV === 'development') {
  let globalWithMongo = global as typeof globalThis & {
    _mongoClientPromise?: Promise<MongoClient>;
  };

  if (!globalWithMongo._mongoClientPromise) {
    const client = new MongoClient(uri, mongoOptions);
    globalWithMongo._mongoClientPromise = client.connect();
  }
  clientPromise = globalWithMongo._mongoClientPromise;
} else {
  const client = new MongoClient(uri, mongoOptions);
  clientPromise = client.connect();
}

export default clientPromise;
