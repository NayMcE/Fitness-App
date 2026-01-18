import { NextRequest, NextResponse } from 'next/server';
import { ObjectId } from 'mongodb';
import clientPromise from '@/lib/mongodb';
import { DailyRecord } from '@/types';

export async function GET(request: NextRequest) {
  try {
    console.log('GET /api/records - Connecting to MongoDB...');
    const client = await clientPromise;
    console.log('Connected to MongoDB');
    
    const db = client.db('fitness-tracker');
    const collection = db.collection('records');

    const records = await collection
      .find({})
      .sort({ date: -1 })
      .toArray();

    console.log(`Retrieved ${records.length} records`);
    return NextResponse.json(records || []);
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    const errorStack = error instanceof Error ? error.stack : '';
    console.error('GET Error:', errorMessage);
    console.error('Stack:', errorStack);
    return NextResponse.json(
      { 
        error: errorMessage,
        details: 'Check server logs for more information'
      },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    if (!body) {
      return NextResponse.json(
        { error: 'Request body is empty' },
        { status: 400 }
      );
    }

    console.log('POST /api/records - Adding record:', body);
    const client = await clientPromise;
    const db = client.db('fitness-tracker');
    const collection = db.collection('records');

    const record: DailyRecord = body;
    const recordToInsert = {
      ...record,
      _id: record._id ? new ObjectId(record._id) : undefined
    };
    const result = await collection.insertOne(recordToInsert as any);

    console.log('Record inserted with ID:', result.insertedId);
    return NextResponse.json(
      { ...record, _id: result.insertedId },
      { status: 201 }
    );
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    const errorStack = error instanceof Error ? error.stack : '';
    console.error('POST Error:', errorMessage);
    console.error('Stack:', errorStack);
    return NextResponse.json(
      { 
        error: errorMessage,
        details: 'Check server logs for more information'
      },
      { status: 500 }
    );
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json(
        { error: 'Record ID is required' },
        { status: 400 }
      );
    }

    console.log('DELETE /api/records - Deleting record:', id);
    const client = await clientPromise;
    const db = client.db('fitness-tracker');
    const collection = db.collection('records');

    const result = await collection.deleteOne({ _id: new ObjectId(id) });

    console.log('Record deleted:', result.deletedCount);
    return NextResponse.json({ message: 'Record deleted' });
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    const errorStack = error instanceof Error ? error.stack : '';
    console.error('DELETE Error:', errorMessage);
    console.error('Stack:', errorStack);
    return NextResponse.json(
      { 
        error: errorMessage,
        details: 'Check server logs for more information'
      },
      { status: 500 }
    );
  }
}

export async function PUT(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    const body = await request.json();

    if (!id) {
      return NextResponse.json(
        { error: 'Record ID is required' },
        { status: 400 }
      );
    }

    console.log('PUT /api/records - Updating record:', id, body);
    const client = await clientPromise;
    const db = client.db('fitness-tracker');
    const collection = db.collection('records');

    const result = await collection.updateOne(
      { _id: new ObjectId(id) },
      { $set: body }
    );

    if (result.matchedCount === 0) {
      return NextResponse.json(
        { error: 'Record not found' },
        { status: 404 }
      );
    }

    console.log('Record updated:', result.modifiedCount);
    return NextResponse.json({ message: 'Record updated', ...body });
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    const errorStack = error instanceof Error ? error.stack : '';
    console.error('PUT Error:', errorMessage);
    console.error('Stack:', errorStack);
    return NextResponse.json(
      { 
        error: errorMessage,
        details: 'Check server logs for more information'
      },
      { status: 500 }
    );
  }
}
