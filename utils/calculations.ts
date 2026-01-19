import { DailyRecord } from '@/types'

/**
 * Get Monday of the current week at 00:00:00
 */
function getMondayOfWeek(): Date {
  const today = new Date()
  const dayOfWeek = today.getDay()
  const monday = new Date(today)
  const daysFromMonday = dayOfWeek === 0 ? 6 : dayOfWeek - 1
  monday.setDate(today.getDate() - daysFromMonday)
  monday.setHours(0, 0, 0, 0)
  return monday
}

export function getWeightTrend(records: DailyRecord[]): {
  current: number
  previous: number
  change: number
  trend: 'up' | 'down' | 'stable'
} {
  // Get records from last 7 days
  const sevenDaysAgo = new Date()
  sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7)

  const recentRecords = records.filter(r => {
    const recordDate = new Date(r.date)
    return recordDate >= sevenDaysAgo
  })

  if (recentRecords.length === 0) {
    return { current: 0, previous: 0, change: 0, trend: 'stable' }
  }

  const sorted = [...recentRecords].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
  const current = sorted[0].weight
  const previous = sorted.length > 1 ? sorted[1].weight : current

  const change = current - previous
  const trend = change > 0.5 ? 'up' : change < -0.5 ? 'down' : 'stable'

  return { current, previous, change, trend }
}

export function getAverageCalories(records: DailyRecord[]): number {
  const monday = getMondayOfWeek()
  const today = new Date()

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
  const monday = getMondayOfWeek()
  const today = new Date()

  return records.filter(r => {
    const recordDate = new Date(r.date)
    return recordDate >= monday && recordDate <= today && r.strengthTraining 
  }).length
}

export function getWeeklyCreatineDays(records: DailyRecord[]): number {
  const monday = getMondayOfWeek()
  const today = new Date()

  // Filter records from Monday to today where creatine was taken
  return records.filter(r => {
    const recordDate = new Date(r.date)
    return recordDate >= monday && recordDate <= today && r.creatine
  }).length
}
