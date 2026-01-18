import { DailyRecord } from '@/types'

export function getWeightTrend(records: DailyRecord[]): {
  current: number
  previous: number
  change: number
  trend: 'up' | 'down' | 'stable'
} {
  if (records.length === 0) {
    return { current: 0, previous: 0, change: 0, trend: 'stable' }
  }

  const sorted = [...records].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
  const current = sorted[0].weight
  const previous = sorted.length > 1 ? sorted[1].weight : current

  const change = current - previous
  const trend = change > 0.5 ? 'up' : change < -0.5 ? 'down' : 'stable'

  return { current, previous, change, trend }
}

export function getAverageCalories(records: DailyRecord[]): number {
  // Get Monday of the current week
  const today = new Date()
  const dayOfWeek = today.getDay()
  const monday = new Date(today)
  const daysFromMonday = dayOfWeek === 0 ? 6 : dayOfWeek - 1
  monday.setDate(today.getDate() - daysFromMonday)
  
  // Set time to start of day for comparison
  monday.setHours(0, 0, 0, 0)

  // Filter records from Monday to today
  const weekRecords = records.filter(r => {
    const recordDate = new Date(r.date)
    return recordDate >= monday && recordDate <= today
  })

  if (weekRecords.length === 0) return 0
  const total = weekRecords.reduce((sum, r) => sum + r.calories, 0)
  return Math.round(total / weekRecords.length)
}

export function getWeeklyWorkouts(records: DailyRecord[]): number {
  const oneWeekAgo = new Date()
  oneWeekAgo.setDate(oneWeekAgo.getDate() - 7)

  return records.filter(r => {
    const recordDate = new Date(r.date)
    return recordDate >= oneWeekAgo && r.strengthTraining 
  }).length
}
