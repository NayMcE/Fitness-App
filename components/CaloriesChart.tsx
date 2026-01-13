'use client'

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'
import { DailyRecord } from '@/types'

export default function CaloriesChart({ records }: { records: DailyRecord[] }) {
  const data = [...records]
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
    .slice(-14)

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h2 className="text-lg font-bold text-gray-900 mb-4">Calories (Last 14 Days)</h2>
      {data.length > 0 ? (
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="calories" fill="#f59e0b" />
          </BarChart>
        </ResponsiveContainer>
      ) : (
        <p className="text-gray-500 text-center py-8">No calorie data yet</p>
      )}
    </div>
  )
}
