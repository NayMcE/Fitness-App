'use client'

import { useState } from 'react'
import { TrendingDown, Flame, Calendar, Pill } from 'lucide-react'
import { FitnessData, DailyRecord } from '@/types'
import { getWeightTrend, getAverageCalories, getWeeklyWorkouts } from '@/utils/calculations'
import StatCard from './StatCard'
import WeightChart from './WeightChart'
import CaloriesChart from './CaloriesChart'
import RecentRecords from './RecentRecords'

interface DashboardProps {
  data: FitnessData
  onEditRecord?: (record: DailyRecord) => void
}

export default function Dashboard({ data, onEditRecord }: DashboardProps) {
  const [records, setRecords] = useState(data.records)

  const weightTrend = getWeightTrend(records)
  const avgCalories = getAverageCalories(records)
  const weeklyWorkouts = getWeeklyWorkouts(records)
  const creatineDays = records.filter(record => record.creatine).length

  const handleEdit = (record: DailyRecord) => {
    if (onEditRecord) {
      onEditRecord(record)
    }
  }

  const handleDeleteRecord = async (date: string) => {
    try {
      const recordToDelete = records.find(r => r.date === date)
      if (!recordToDelete?._id) return

      const response = await fetch(`/api/records?id=${recordToDelete._id}`, {
        method: 'DELETE',
      })

      if (response.ok) {
        setRecords(records.filter(r => r.date !== date))
      }
    } catch (error) {
      console.error('Failed to delete record:', error)
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
