import { NextResponse } from 'next/server';
import { MongoClient } from 'mongodb';

export async function GET() {
  try {
    const url = process.env.DATABASE_URL;
    
    if (!url) {
      return NextResponse.json({
        status: 'error',
        message: 'DATABASE_URL not set',
      }, { status: 500 });
    }

    console.log('Testing MongoDB connection...');
    console.log('Connection string (first 50 chars):', url.substring(0, 50));

    const client = new MongoClient(url);
    await client.connect();
    
    const admin = client.db().admin();
    const status = await admin.ping();
    
    await client.close();

    return NextResponse.json({
      status: 'success',
      message: 'MongoDB connected successfully',
      ping: status,
    });
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    console.error('MongoDB test error:', errorMessage);
    
    return NextResponse.json({
      status: 'error',
      message: errorMessage,
      full_error: String(error),
    }, { status: 500 });
  }
}
