import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';

export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session?.user?.id) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const { searchParams } = new URL(request.url);
    const date = searchParams.get('date');

    if (date) {
      const record = await prisma.dailyRecord.findUnique({
        where: { 
          userId_date: {
            userId: session.user.id,
            date,
          }
        },
      });
      if (record) {
        return NextResponse.json(record);
      }
      return NextResponse.json({ message: 'No record found' });
    }

    const records = await prisma.dailyRecord.findMany({
      where: { userId: session.user.id },
      orderBy: { date: 'desc' },
    });
    return NextResponse.json(records);
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    console.error('GET Error:', errorMessage);
    console.error('Full error:', error);
    return NextResponse.json(
      { error: errorMessage, details: String(error) },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session?.user?.id) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const body = await request.json();
    
    if (!body) {
      return NextResponse.json(
        { error: 'Request body is empty' },
        { status: 400 }
      );
    }

    // Use upsert to create or update if date already exists for this user
    const record = await prisma.dailyRecord.upsert({
      where: { 
        userId_date: {
          userId: session.user.id,
          date: body.date,
        }
      },
      create: {
        userId: session.user.id,
        date: body.date,
        calories: body.calories,
        strengthTraining: body.strengthTraining,
        cardio: body.cardio,
        weight: body.weight,
        protein: body.protein,
        carbs: body.carbs,
        fat: body.fat,
        creatine: body.creatine,
        stepCount: body.stepCount,
        notes: body.notes || '',
      },
      update: {
        calories: body.calories,
        strengthTraining: body.strengthTraining,
        cardio: body.cardio,
        weight: body.weight,
        protein: body.protein,
        carbs: body.carbs,
        fat: body.fat,
        creatine: body.creatine,
        stepCount: body.stepCount,
        notes: body.notes || '',
      },
    });
    
    return NextResponse.json(record, { status: 201 });
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    console.error('POST Error:', errorMessage);
    console.error('Full error:', error);
    return NextResponse.json(
      { error: errorMessage, details: String(error) },
      { status: 500 }
    );
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session?.user?.id) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json(
        { error: 'Record ID is required' },
        { status: 400 }
      );
    }

    await prisma.dailyRecord.delete({
      where: { id },
    });

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
    const session = await getServerSession(authOptions);
    
    if (!session?.user?.id) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    const body = await request.json();

    if (!id) {
      return NextResponse.json(
        { error: 'Record ID is required' },
        { status: 400 }
      );
    }

    const record = await prisma.dailyRecord.update({
      where: { id },
      data: {
        date: body.date,
        calories: body.calories,
        strengthTraining: body.strengthTraining,
        cardio: body.cardio,
        weight: body.weight,
        protein: body.protein,
        carbs: body.carbs,
        fat: body.fat,
        creatine: body.creatine,
        stepCount: body.stepCount,
        notes: body.notes || '',
      },
    });

    return NextResponse.json(record);
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    console.error('PUT Error:', errorMessage);
    return NextResponse.json(
      { error: errorMessage },
      { status: 500 }
    );
  }
}
