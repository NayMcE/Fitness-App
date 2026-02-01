import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
  try {
    console.log('Health check - DATABASE_URL:', process.env.DATABASE_URL ? 'Set ✓' : 'NOT SET ✗');
    
    // Try a simple connection test
    const result = await prisma.dailyRecord.findMany({
      take: 1,
    });
    
    return NextResponse.json({
      status: 'ok',
      database: 'connected',
      records_found: result.length,
    });
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    console.error('Health check failed:', errorMessage);
    
    return NextResponse.json({
      status: 'error',
      database: 'disconnected',
      error: errorMessage,
      env_set: process.env.DATABASE_URL ? 'yes' : 'no',
    }, { status: 500 });
  }
}
