import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { DailyTargets } from '@/types'

export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session?.user?.id) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    const targets = await prisma.dailyTargets.findUnique({
      where: { userId: session.user.id },
    })

    if (!targets) {
      return NextResponse.json(
        { calorieTarget: 2000, stepsTarget: 10000, weeklyCalorieTarget: 14000, weeklyStepsTarget: 70000 },
        { status: 200 }
      )
    }

    return NextResponse.json(targets)
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error)
    console.error('GET targets error:', errorMessage)
    return NextResponse.json(
      { error: errorMessage },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session?.user?.id) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    const body: DailyTargets = await request.json()

    // Upsert targets (create if doesn't exist, update if does)
    const targets = await prisma.dailyTargets.upsert({
      where: { userId: session.user.id },
      create: {
        userId: session.user.id,
        calorieTarget: body.calorieTarget,
        stepsTarget: body.stepsTarget,
        weeklyCalorieTarget: body.weeklyCalorieTarget || body.calorieTarget * 7,
        weeklyStepsTarget: body.weeklyStepsTarget,
      },
      update: {
        calorieTarget: body.calorieTarget,
        stepsTarget: body.stepsTarget,
        weeklyCalorieTarget: body.weeklyCalorieTarget || body.calorieTarget * 7,
        weeklyStepsTarget: body.weeklyStepsTarget,
      },
    })

    return NextResponse.json(targets)
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error)
    console.error('POST targets error:', errorMessage)
    return NextResponse.json(
      { error: errorMessage },
      { status: 500 }
    )
  }
}
