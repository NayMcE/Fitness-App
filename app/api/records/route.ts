import { NextRequest, NextResponse } from 'next/server';
import { DailyRecord } from '@/types';

export async function GET(request: NextRequest) {
  try {
    // All data is stored in browser localStorage
    // This endpoint returns success to maintain API compatibility
    return NextResponse.json({ message: 'Data stored in browser' });
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    console.error('GET Error:', errorMessage);
    return NextResponse.json(
      { error: errorMessage },
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

    // Data is managed by the browser (localStorage)
    // This endpoint returns success for API compatibility
    const record: DailyRecord = body;
    return NextResponse.json(
      { ...record, success: true },
      { status: 201 }
    );
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    console.error('POST Error:', errorMessage);
    return NextResponse.json(
      { error: errorMessage },
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

    // Data is managed by the browser (localStorage)
    // This endpoint returns success for API compatibility
    return NextResponse.json({ message: 'Record deleted', success: true });
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    console.error('DELETE Error:', errorMessage);
    return NextResponse.json(
      { error: errorMessage },
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

    // Data is managed by the browser (localStorage)
    // This endpoint returns success for API compatibility
    return NextResponse.json({ message: 'Record updated', success: true, ...body });
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    console.error('PUT Error:', errorMessage);
    return NextResponse.json(
      { error: errorMessage },
      { status: 500 }
    );
  }
}
