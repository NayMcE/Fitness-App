import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'
import { DailyRecord } from '../types'

export default function WeightChart({ records }: { records: DailyRecord[] }) {
  const data = [...records]
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
    .slice(-30)

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h2 className="text-lg font-bold text-gray-900 mb-4">Weight Trend (Last 30 Days)</h2>
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
