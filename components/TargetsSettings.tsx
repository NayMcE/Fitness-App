'use client'

import { useState } from 'react'
import { DailyTargets } from '@/types'
import { X } from 'lucide-react'

interface TargetsSettingsProps {
  targets: DailyTargets
  onSave: (targets: DailyTargets) => void
  onCancel: () => void
}

export default function TargetsSettings({ targets, onSave, onCancel }: TargetsSettingsProps) {
  const [formData, setFormData] = useState<DailyTargets>(targets)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (formData.calorieTarget > 0 && formData.stepsTarget > 0) {
      onSave(formData)
    } else {
      alert('Please enter valid target values')
    }
  }

  return (
    <div className="bg-white rounded-lg shadow p-6 mb-8">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold text-gray-900">Daily Targets</h2>
        <button
          onClick={onCancel}
          className="p-2 text-gray-500 hover:bg-gray-100 rounded-lg transition"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Daily Calorie Target
            </label>
            <input
              type="number"
              value={formData.calorieTarget}
              onChange={(e) => setFormData({ ...formData, calorieTarget: parseInt(e.target.value) || 0 })}
              placeholder="e.g., 2000"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Daily Steps Target
            </label>
            <input
              type="number"
              value={formData.stepsTarget}
              onChange={(e) => setFormData({ ...formData, stepsTarget: parseInt(e.target.value) || 0 })}
              placeholder="e.g., 10000"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
        </div>

        <div className="flex gap-4">
          <button
            type="submit"
            className="flex-1 bg-indigo-600 text-white px-6 py-2 rounded-lg hover:bg-indigo-700 transition font-medium"
          >
            Save Targets
          </button>
          <button
            type="button"
            onClick={onCancel}
            className="flex-1 bg-gray-200 text-gray-900 px-6 py-2 rounded-lg hover:bg-gray-300 transition font-medium"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  )
}
