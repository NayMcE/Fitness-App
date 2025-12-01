import type { VercelRequest, VercelResponse } from '@vercel/node';
import clientPromise from '../lib/mongodb.ts';
import { MetricRecord } from '../../src/types';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // Add CORS headers
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader('Access-Control-Allow-Headers', 'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version');

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  try {
    const client = await clientPromise;
    const db = client.db('fitness-tracker');
    const collection = db.collection('records');

    // GET - Fetch all records
    if (req.method === 'GET') {
      try {
        const records = await collection.find({}).sort({ date: -1 }).toArray();
        return res.status(200).json(records || []);
      } catch (err) {
        console.error('GET Error:', err);
        throw err;
      }
    }

    // POST - Add a new record
    if (req.method === 'POST') {
      const record: MetricRecord = req.body;
      const result = await collection.insertOne(record);
      return res.status(201).json({ ...record, _id: result.insertedId });
    }

    // DELETE - Delete a record
    if (req.method === 'DELETE') {
      const { id } = req.query;
      if (!id || typeof id !== 'string') {
        return res.status(400).json({ error: 'Record ID is required' });
      }
      await collection.deleteOne({ id });
      return res.status(200).json({ message: 'Record deleted' });
    }

    // Method not allowed
    return res.status(405).json({ error: 'Method not allowed' });
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    console.error('API Error:', errorMessage, error);
    return res.status(500).json({ error: errorMessage });
  }
}
