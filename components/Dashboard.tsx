'use client'

import { TrendingDown, Flame, Calendar, Pill } from 'lucide-react'
import { FitnessData, DailyRecord } from '@/types'
import { getWeightTrend, getAverageCalories, getWeeklyWorkouts, getWeeklyCreatineDays } from '@/utils/calculations'
import StatCard from './StatCard'
import WeightChart from './WeightChart'
import CaloriesChart from './CaloriesChart'
import RecentRecords from './RecentRecords'

interface DashboardProps {
  data: FitnessData
  onEditRecord?: (record: DailyRecord) => void
  onDeleteRecord?: (date: string) => void
}

export default function Dashboard({ data, onEditRecord, onDeleteRecord }: DashboardProps) {
  const records = data.records

  const weightTrend = getWeightTrend(records)
  const avgCalories = getAverageCalories(records)
  const weeklyWorkouts = getWeeklyWorkouts(records)
  const creatineDays = getWeeklyCreatineDays(records)

  const handleEdit = (record: DailyRecord) => {
    if (onEditRecord) {
      onEditRecord(record)
    }
  }

  const handleDeleteRecord = (date: string) => {
    if (onDeleteRecord) {
      onDeleteRecord(date)
    }
  }

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
          label="Avg Calories (This Week)"
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
        <StatCard
          icon={Calendar}
          label="Workouts This Week"
          value={weeklyWorkouts.toString()}
          change={0}
          trend="stable"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <WeightChart records={records} />
        <CaloriesChart records={records} />
      </div>

      <RecentRecords 
        records={records.slice(0, 10)} 
        onEdit={handleEdit}
        onDelete={handleDeleteRecord}
      />
    </div>
  )
}
