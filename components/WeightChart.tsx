'use client'

import { useState } from 'react'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'
import { DailyRecord } from '@/types'

type TimeRange = 'week' | 'month' | 'all'

export default function WeightChart({ records }: { records: DailyRecord[] }) {
  const [timeRange, setTimeRange] = useState<TimeRange>('month')

  const getFilteredData = () => {
    const sorted = [...records]
      .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())

    if (timeRange === 'week') {
      return sorted.slice(-7)
    } else if (timeRange === 'month') {
      return sorted.slice(-30)
    } else {
      return sorted
    }
  }

  const data = getFilteredData()

  const getRangeLabel = () => {
    if (timeRange === 'week') return '(Last 7 Days)'
    if (timeRange === 'month') return '(Last 30 Days)'
    return '(All Time)'
  }

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-bold text-gray-900">Weight Trend {getRangeLabel()}</h2>
        <div className="flex gap-2">
          <button
            onClick={() => setTimeRange('week')}
            className={`px-3 py-1 rounded-lg text-sm font-medium transition ${
              timeRange === 'week'
                ? 'bg-indigo-600 text-white'
                : 'bg-gray-200 text-gray-900 hover:bg-gray-300'
            }`}
          >
            Week
          </button>
          <button
            onClick={() => setTimeRange('month')}
            className={`px-3 py-1 rounded-lg text-sm font-medium transition ${
              timeRange === 'month'
                ? 'bg-indigo-600 text-white'
                : 'bg-gray-200 text-gray-900 hover:bg-gray-300'
            }`}
          >
            Month
          </button>
          <button
            onClick={() => setTimeRange('all')}
            className={`px-3 py-1 rounded-lg text-sm font-medium transition ${
              timeRange === 'all'
                ? 'bg-indigo-600 text-white'
                : 'bg-gray-200 text-gray-900 hover:bg-gray-300'
            }`}
          >
            All Time
          </button>
        </div>
      </div>
      {data.length > 0 ? (
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis domain={['dataMin - 5, dataMax + 5']} />
            <Tooltip />
            <Line type="monotone" dataKey="weight" stroke="#4f46e5" strokeWidth={2} dot={{ fill: '#4f46e5' }} />
          </LineChart>
        </ResponsiveContainer>
      ) : (
        <p className="text-gray-500 text-center py-8">No weight data yet</p>
      )}
    </div>
  )
}
