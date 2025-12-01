import type { VercelRequest, VercelResponse } from '@vercel/node';
import clientPromise from '../lib/mongodb.ts';
import { MetricRecord } from '../../src/types';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  try {
    const client = await clientPromise;
    const db = client.db('fitness-tracker');
    const collection = db.collection('records');

    // GET - Fetch all records
    if (req.method === 'GET') {
      const records = await collection.find({}).sort({ date: -1 }).toArray();
      return res.status(200).json(records || []);
    }

    // POST - Add a new record
    if (req.method === 'POST') {
      if (!req.body) {
        return res.status(400).json({ error: 'Request body is empty' });
      }
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
    console.error('API Error:', errorMessage);
    return res.status(500).json({ error: errorMessage });
  }
}
