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

export function getAverageCalories(records: DailyRecord[], days: number = 7): number {
  const recent = records.slice(0, days)
  if (recent.length === 0) return 0
  const total = recent.reduce((sum, r) => sum + r.calories, 0)
  return Math.round(total / recent.length)
}

export function getWeeklyWorkouts(records: DailyRecord[]): number {
  const oneWeekAgo = new Date()
  oneWeekAgo.setDate(oneWeekAgo.getDate() - 7)

  return records.filter(r => {
    const recordDate = new Date(r.date)
    return recordDate >= oneWeekAgo && r.strengthTraining 
  }).length
}
