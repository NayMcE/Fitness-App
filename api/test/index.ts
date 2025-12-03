import type { VercelRequest, VercelResponse } from '@vercel/node';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  try {
    console.log('Test endpoint called');
    console.log('MONGODB_URI set:', !!process.env.MONGODB_URI);
    
    if (!process.env.MONGODB_URI) {
      return res.status(400).json({ 
        error: 'MONGODB_URI not found',
        env: Object.keys(process.env).filter(k => k.includes('MONGO') || k.includes('DB'))
      });
    }

    // Test basic connection without complex logic
    const { MongoClient } = await import('mongodb');
    const client = new MongoClient(process.env.MONGODB_URI);
    
    console.log('Attempting connection...');
    await client.connect();
    console.log('Connected!');
    
    const db = client.db('fitness-tracker');
    const collections = await db.listCollections().toArray();
    
    await client.close();
    
    return res.status(200).json({ 
      success: true,
      message: 'MongoDB connection successful',
      collections: collections.map(c => c.name)
    });
  } catch (error) {
    const msg = error instanceof Error ? error.message : String(error);
    console.error('Test Error:', msg);
    return res.status(500).json({ 
      error: msg,
      type: error instanceof Error ? error.name : 'Unknown'
    });
  }
}
