import { MongoClient } from 'mongodb';

const uri = process.env.MONGODB_URI || '';

let clientPromise: Promise<MongoClient>;

if (!process.env.MONGODB_URI) {
  throw new Error('Please add your MongoDB URI to .env.local');
}

// Create client with options
const client = new MongoClient(uri, {
  maxPoolSize: 10,
  minPoolSize: 2,
});

// Handle connection errors
client.on('error', (error) => {
  console.error('MongoDB client error:', error);
});

clientPromise = client.connect().catch((error) => {
  console.error('Failed to connect to MongoDB:', error);
  throw error;
});

export default clientPromise;
