'use client'

import { useState } from 'react'
import { DailyRecord } from '@/types'
import { CheckCircle, Circle, Edit2, Trash2 } from 'lucide-react'

interface RecentRecordsProps {
  records: DailyRecord[]
  onEdit: (record: DailyRecord) => void
  onDelete: (date: string) => void
}

export default function RecentRecords({ records, onEdit, onDelete }: RecentRecordsProps) {
  const [deletingId, setDeletingId] = useState<string | null>(null)

  const handleDelete = async (record: DailyRecord) => {
    if (!window.confirm(`Delete entry for ${record.date}?`)) return
    setDeletingId(record.date)
    try {
      await onDelete(record.date)
    } finally {
      setDeletingId(null)
    }
  }

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
              <div className="flex gap-2">
                <button
                  onClick={() => onEdit(record)}
                  className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition"
                  title="Edit entry"
                >
                  <Edit2 className="w-4 h-4" />
                </button>
                <button
                  onClick={() => handleDelete(record)}
                  disabled={deletingId === record.date}
                  className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition disabled:opacity-50"
                  title="Delete entry"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
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
