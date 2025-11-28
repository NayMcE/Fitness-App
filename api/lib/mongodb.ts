import { MongoClient } from 'mongodb';

const uri = process.env.MONGODB_URI || '';
const options = {};

console.log('1. MongoDB module loading...');
console.log('2. MONGODB_URI exists:', !!process.env.MONGODB_URI);
console.log('3. NODE_ENV:', process.env.NODE_ENV);

let client: MongoClient;
let clientPromise: Promise<MongoClient>;

if (!process.env.MONGODB_URI) {
  throw new Error('Please add your MongoDB URI to .env.local');
}

console.log('4. MongoDB URI loaded:', uri.substring(0, 50) + '...');

if (process.env.NODE_ENV === 'development') {
  console.log('5. In development mode');
  // In development mode, use a global variable to preserve the connection
  let globalWithMongo = global as typeof globalThis & {
    _mongoClientPromise?: Promise<MongoClient>;
  };

  if (!globalWithMongo._mongoClientPromise) {
    console.log('6. Creating new MongoDB connection...');
    client = new MongoClient(uri, options);
    globalWithMongo._mongoClientPromise = client.connect()
      .then(() => {
        console.log('7. MongoDB connected successfully!');
        return client;
      })
      .catch((err: any) => {
        console.error('8. MongoDB connection FAILED:', err?.message || err);
        throw err;
      });
  } else {
    console.log('6. Using existing MongoDB connection');
  }
  clientPromise = globalWithMongo._mongoClientPromise;
} else {
  console.log('5. In production mode');
  // In production mode, create a new client for each request
  client = new MongoClient(uri, options);
  clientPromise = client.connect();
}

console.log('9. MongoDB module export ready');
export default clientPromise;
