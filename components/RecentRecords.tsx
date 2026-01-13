'use client'

import { DailyRecord } from '@/types'
import { CheckCircle, Circle } from 'lucide-react'

export default function RecentRecords({ records }: { records: DailyRecord[] }) {
  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h2 className="text-lg font-bold text-gray-900 mb-4">Recent Logs</h2>
      {records.length > 0 ? (
        <div className="space-y-3">
          {records.map((record, idx) => (
            <div key={idx} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <div className="flex items-center gap-4 flex-1">
                {record.strengthTraining   ? (
                  <CheckCircle className="w-5 h-5 text-green-600" />
                ) : (
                  <Circle className="w-5 h-5 text-gray-300" />
                )}
                <div>
                  <p className="font-medium text-gray-900">{record.date}</p>
                  <p className="text-sm text-gray-600">
                    {record.calories} cal • {record.weight} lbs {record.strengthTraining && `• ${record.workoutMinutes}min workout`}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-gray-500 text-center py-8">No records yet. Start logging your metrics!</p>
      )}
    </div>
  )
}
