'use client'

import { TrendingDown, Flame, Calendar, Pill } from 'lucide-react'
import { FitnessData } from '@/types'
import { getWeightTrend, getAverageCalories, getWeeklyWorkouts } from '@/utils/calculations'
import StatCard from './StatCard'
import WeightChart from './WeightChart'
import CaloriesChart from './CaloriesChart'
import RecentRecords from './RecentRecords'

export default function Dashboard({ data }: { data: FitnessData }) {
  const weightTrend = getWeightTrend(data.records)
  const avgCalories = getAverageCalories(data.records)
  // const streak = getWorkoutStreak(data.records)
  const weeklyWorkouts = getWeeklyWorkouts(data.records)
  const creatineDays = data.records.filter(record => record.creatine).length

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          icon={TrendingDown}
          label="Current Weight"
          value={`${weightTrend.current.toFixed(1)} lbs`}
          change={weightTrend.change}
          trend={weightTrend.trend}
        />
        <StatCard
          icon={Flame}
          label="Avg Calories (7d)"
          value={avgCalories.toString()}
          change={0}
          trend="stable"
        />
        <StatCard
          icon={Pill}
          label="Creatine Taken"
          value={`${creatineDays} days`}
          change={0}
          trend="stable"
        />
        {/* <StatCard
          icon={Zap}
          label="Workout Streak"
          value={streak.toString()}
          change={0}
          trend="stable"
        /> */}
        <StatCard
          icon={Calendar}
          label="Workouts This Week"
          value={weeklyWorkouts.toString()}
          change={0}
          trend="stable"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <WeightChart records={data.records} />
        <CaloriesChart records={data.records} />
      </div>

      <RecentRecords records={data.records.slice(0, 10)} />
    </div>
  )
}
