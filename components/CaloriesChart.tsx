'use client'

import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Label } from 'recharts'
import { DailyRecord } from '@/types'

export default function CaloriesChart({ records }: { records: DailyRecord[] }) {
  const data = [...records]
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
    .slice(-14)

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h2 className="text-lg font-bold text-gray-900 mb-4">Calories (Last 14 Days)</h2>
      {data.length > 0 ? (
        <>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={data} margin={{ top: 20, right: 30, left: 0, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
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
          <div className="mt-6 grid grid-cols-2 gap-4">
            {data.map((record) => (
              <div key={record.date} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                <span className="text-sm font-medium text-gray-700">{record.date}</span>
                <span className="text-lg font-bold text-amber-600">{record.calories}</span>
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

