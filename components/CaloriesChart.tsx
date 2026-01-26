'use client'

import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Label } from 'recharts'
import { DailyRecord } from '@/types'

export default function CaloriesChart({ records }: { records: DailyRecord[] }) {
  // Group records by week and calculate weekly totals
  const getWeekKey = (date: Date): string => {
    const monday = new Date(date)
    const day = monday.getDay()
    const diff = monday.getDate() - day + (day === 0 ? -6 : 1)
    monday.setDate(diff)
    return monday.toISOString().split('T')[0]
  }

  const weeklyData: { [key: string]: number } = {}
  records.forEach(record => {
    const recordDate = new Date(record.date)
    const weekKey = getWeekKey(recordDate)
    weeklyData[weekKey] = (weeklyData[weekKey] || 0) + record.calories
  })

  // Convert to array and sort by week
  const data = Object.entries(weeklyData)
    .map(([week, calories]) => ({
      week: `Week of ${week}`,
      calories
    }))
    .sort((a, b) => a.week.localeCompare(b.week))
    .slice(-12) // Last 12 weeks

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h2 className="text-lg font-bold text-gray-900 mb-4">Weekly Calories Total</h2>
      {data.length > 0 ? (
        <>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={data} margin={{ top: 20, right: 30, left: 0, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis 
                dataKey="week" 
                tick={{ fontSize: 12 }}
                angle={-45}
                textAnchor="end"
                height={80}
              />
              <YAxis />
              <Tooltip formatter={(value) => `${value} cal`} />
              <Line 
                type="monotone" 
                dataKey="calories" 
                stroke="#f59e0b" 
                strokeWidth={2}
                dot={{ fill: '#f59e0b', r: 5 }}
                label={{ position: 'top', formatter: (value: number) => `${value}`, fill: '#374151', fontSize: 12 }}
              />
            </LineChart>
          </ResponsiveContainer>
          <div className="mt-6 grid grid-cols-1 gap-3">
            {data.map((record) => (
              <div key={record.week} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                <span className="text-sm font-medium text-gray-700">{record.week}</span>
                <span className="text-lg font-bold text-amber-600">{record.calories} cal</span>
              </div>
            ))}
          </div>
        </>
      ) : (
        <p className="text-gray-500 text-center py-8">No calorie data yet</p>
      )}
    </div>
  )
}


