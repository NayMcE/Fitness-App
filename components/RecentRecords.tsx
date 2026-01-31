'use client'

import { useState } from 'react'
import { DailyRecord } from '@/types'
import { CheckCircle, Circle, Edit2, Trash2 } from 'lucide-react'

interface RecentRecordsProps {
  records: DailyRecord[]
  onEdit: (record: DailyRecord) => void
  onDelete: (date: string) => void
  calorieTarget?: number
  stepsTarget?: number
}

export default function RecentRecords({ records, onEdit, onDelete, calorieTarget = 2000, stepsTarget = 10000 }: RecentRecordsProps) {
  const [deletingId, setDeletingId] = useState<string | null>(null)

  const targetsMetDaily = (record: DailyRecord): boolean => {
    const caloriesMet = record.calories >= calorieTarget
    const stepsMet = record.stepCount >= stepsTarget
    return caloriesMet && stepsMet
  }

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
    <div className="bg-white rounded-lg shadow p-6 border-l-4 border-brand-teal">
      <h2 className="text-lg font-bold text-brand-dark mb-4">Recent Logs</h2>
      {records.length > 0 ? (
        <div className="space-y-3">
          {records.map((record, idx) => (
            <div key={idx} className="flex items-center justify-between p-4 bg-brand-light rounded-lg border-l-4 border-brand-teal">
              <div className="flex items-center gap-4 flex-1">
                {targetsMetDaily(record) ? (
                  <CheckCircle className="w-5 h-5 text-brand-teal" />
                ) : (
                  <Circle className="w-5 h-5 text-brand-slate" />
                )}
                <div>
                  <p className="font-medium text-brand-dark">{record.date}</p>
                  <p className="text-sm text-brand-slate">
                    {record.calories} cal • {record.weight} lbs {record.strengthTraining && '• Strength Training'}
                  </p>
                </div>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => onEdit(record)}
                  className="p-2 text-brand-teal hover:bg-brand-light rounded-lg transition"
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
        <p className="text-brand-slate text-center py-8">No records yet. Start logging your metrics!</p>
      )}
    </div>
  )
}
