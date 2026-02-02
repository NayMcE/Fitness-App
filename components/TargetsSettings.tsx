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
    if (formData.calorieTarget > 0 && formData.stepsTarget > 0 && formData.weeklyStepsTarget > 0 && formData.weeklyCalorieTarget && formData.weeklyCalorieTarget > 0) {
      onSave(formData)
    } else {
      alert('Please enter valid target values')
    }
  }

  return (
    <div className="bg-white rounded-lg shadow p-6 mb-8 border-t-4 border-brand-teal">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold text-brand-dark">Targets</h2>
        <button
          onClick={onCancel}
          className="p-2 text-brand-slate hover:bg-brand-light rounded-lg transition"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="mb-6">
          <h3 className="text-lg font-semibold text-brand-dark mb-4">Daily Targets</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div>
              <label className="block text-sm font-medium text-brand-dark mb-2">
                Daily Calorie Target
              </label>
              <input
                type="number"
                value={formData.calorieTarget}
                onChange={(e) => setFormData({ ...formData, calorieTarget: parseInt(e.target.value) || 0 })}
                placeholder="e.g., 2000"
                className="w-full px-4 py-2 border border-brand-light rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-teal"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-brand-dark mb-2">
                Daily Steps Target
              </label>
              <input
                type="number"
                value={formData.stepsTarget}
                onChange={(e) => setFormData({ ...formData, stepsTarget: parseInt(e.target.value) || 0 })}
                placeholder="e.g., 10000"
                className="w-full px-4 py-2 border border-brand-light rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-teal"
              />
            </div>
          </div>
        </div>

        <div className="mb-6">
          <h3 className="text-lg font-semibold text-brand-dark mb-4">Weekly Targets</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div>
              <label className="block text-sm font-medium text-brand-dark mb-2">
                Weekly Calorie Target
              </label>
              <div className="flex gap-2">
                <input
                  type="number"
                  value={formData.weeklyCalorieTarget || formData.calorieTarget * 7}
                  onChange={(e) => setFormData({ ...formData, weeklyCalorieTarget: parseInt(e.target.value) || 0 })}
                  placeholder="e.g., 14000"
                  className="flex-1 px-4 py-2 border border-brand-light rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-teal"
                />
                <button
                  type="button"
                  onClick={() => setFormData({ ...formData, weeklyCalorieTarget: formData.calorieTarget * 7 })}
                  className="px-3 py-2 bg-brand-light text-brand-dark rounded-lg hover:bg-brand-teal transition text-sm font-medium whitespace-nowrap"
                  title="Auto-calculate from daily target"
                >
                  Auto
                </button>
              </div>
              <p className="text-xs text-brand-slate mt-1">
                Daily target × 7 = {formData.calorieTarget * 7}
              </p>
            </div>

            <div>
              <label className="block text-sm font-medium text-brand-dark mb-2">
                Weekly Steps Target
              </label>
              <div className="flex gap-2">
                <input
                  type="number"
                  value={formData.weeklyStepsTarget}
                  onChange={(e) => setFormData({ ...formData, weeklyStepsTarget: parseInt(e.target.value) || 0 })}
                  placeholder="e.g., 70000"
                  className="flex-1 px-4 py-2 border border-brand-light rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-teal"
                />
                <button
                  type="button"
                  onClick={() => setFormData({ ...formData, weeklyStepsTarget: formData.stepsTarget * 7 })}
                  className="px-3 py-2 bg-brand-light text-brand-dark rounded-lg hover:bg-brand-teal transition text-sm font-medium whitespace-nowrap"
                  title="Auto-calculate from daily target"
                >
                  Auto
                </button>
              </div>
              <p className="text-xs text-brand-slate mt-1">
                Daily target × 7 = {formData.stepsTarget * 7}
              </p>
            </div>
          </div>
        </div>

        <div className="flex gap-4">
          <button
            type="submit"
            className="flex-1 bg-brand-teal text-brand-dark px-6 py-2 rounded-lg hover:opacity-80 transition font-medium"
          >
            Save Targets
          </button>
          <button
            type="button"
            onClick={onCancel}
            className="flex-1 bg-brand-light text-brand-dark px-6 py-2 rounded-lg hover:bg-brand-slate hover:text-brand-light transition font-medium"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  )
}

