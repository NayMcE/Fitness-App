'use client'

import { useState } from 'react'
import { DailyRecord } from '@/types'
import { X } from 'lucide-react'

interface MetricsFormProps {
  onSubmit: (record: DailyRecord) => void
  onCancel: () => void
}

export default function MetricsForm({ onSubmit, onCancel }: MetricsFormProps) {
  const today = new Date().toISOString().split('T')[0]
  const [formData, setFormData] = useState({
    date: today,
    calories: 0,
    strengthTraining: false,
    cardio: false,
    workoutMinutes: 0,
    weight: 0,
    protein: 0,
    carbs: 0,
    fat: 0,
    creatine: false,
    stepCount: 0,
    notes: ''
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (formData.weight <= 0 || formData.calories < 0) {
      alert('Please enter valid values')
      return
    }
    onSubmit(formData as DailyRecord)
    setFormData({
      date: today,
      calories: 0,
      strengthTraining: false,
      cardio: false,
      workoutMinutes: 0,
      weight: 0,
      protein: 0,
      carbs: 0,
      fat: 0,
      creatine: false,
      stepCount: 0,
      notes: ''
    })
  }

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-bold text-gray-900">Log Today's Metrics</h2>
        <button onClick={onCancel} className="text-gray-400 hover:text-gray-600">
          <X className="w-6 h-6" />
        </button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Date</label>
            <input
              type="date"
              value={formData.date}
              onChange={(e) => setFormData({ ...formData, date: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Weight (lbs)</label>
            <input
              type="number"
              step="0.1"
              value={formData.weight || ''}
              onChange={(e) => setFormData({ ...formData, weight: parseFloat(e.target.value) || 0 })}
              placeholder="e.g., 180.5"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Calories</label>
            <input
              type="number"
              value={formData.calories || ''}
              onChange={(e) => setFormData({ ...formData, calories: parseInt(e.target.value) || 0 })}
              placeholder="e.g., 2000"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

           <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Protein</label>
            <input
              type="number"
              value={formData.protein || ''}
              onChange={(e) => setFormData({ ...formData, protein: parseInt(e.target.value) || 0 })}
              placeholder="e.g., 130"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

           <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Carbs</label>
            <input
              type="number"
              value={formData.carbs || ''}
              onChange={(e) => setFormData({ ...formData, carbs: parseInt(e.target.value) || 0 })}
              placeholder="e.g., 200"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

           <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Fat</label>
            <input
              type="number"
              value={formData.fat || ''}
              onChange={(e) => setFormData({ ...formData, fat: parseInt(e.target.value) || 0 })}
              placeholder="e.g., 60"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Workout Minutes</label>
            <input
              type="number"
              value={formData.workoutMinutes || ''}
              onChange={(e) => setFormData({ ...formData, workoutMinutes: parseInt(e.target.value) || 0 })}
              placeholder="e.g., 30"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

           <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Step Count</label>
            <input
              type="number"
              value={formData.stepCount || ''}
              onChange={(e) => setFormData({ ...formData, stepCount: parseInt(e.target.value) || 0 })}
              placeholder="e.g., 10,000"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
        </div>

        <div className="flex items-center gap-3">
          <input
            type="checkbox"
            id="strengthTraining"
            checked={formData.strengthTraining}
            onChange={(e) => setFormData({ ...formData, strengthTraining: e.target.checked })}
            className="w-4 h-4 text-indigo-600 rounded focus:ring-2 focus:ring-indigo-500"
          />
          <label htmlFor="strengthTraining" className="text-sm font-medium text-gray-700">
            Strength Training
          </label>

          <input
            type="checkbox"
            id="cardio"
            checked={formData.cardio}
            onChange={(e) => setFormData({ ...formData, cardio: e.target.checked })}
            className="w-4 h-4 text-indigo-600 rounded focus:ring-2 focus:ring-indigo-500"
          />
          <label htmlFor="cardio" className="text-sm font-medium text-gray-700">
            I did a run today!
          </label>

          <input
            type="checkbox"
            id="creatine"
            checked={formData.creatine}
            onChange={(e) => setFormData({ ...formData, creatine: e.target.checked })}
            className="w-4 h-4 text-indigo-600 rounded focus:ring-2 focus:ring-indigo-500"
          />
          <label htmlFor="creatine" className="text-sm font-medium text-gray-700">
            Creatine
          </label>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Notes</label>
          <textarea
            value={formData.notes}
            onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
            placeholder="Add any notes..."
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            rows={3}
          />
        </div>

        <div className="flex gap-3 justify-end">
          <button
            type="button"
            onClick={onCancel}
            className="px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition"
          >
            Save Metrics
          </button>
        </div>
      </form>
    </div>
  )
}
