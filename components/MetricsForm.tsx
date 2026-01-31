'use client'

import { useState, useEffect } from 'react'
import { DailyRecord } from '@/types'
import { X } from 'lucide-react'

interface MetricsFormProps {
  onSubmit: (record: DailyRecord) => void
  onCancel: () => void
  editingRecord?: DailyRecord | null
}

export default function MetricsForm({ onSubmit, onCancel, editingRecord }: MetricsFormProps) {
  const today = new Date().toISOString().split('T')[0]
  const [formData, setFormData] = useState<DailyRecord>({
    date: today,
    calories: 0,
    strengthTraining: false,
    cardio: false,
    weight: 0,
    protein: 0,
    carbs: 0,
    fat: 0,
    creatine: false,
    stepCount: 0,
    notes: ''
  })

  useEffect(() => {
    if (editingRecord) {
      setFormData(editingRecord)
    } else {
      setFormData({
        date: today,
        calories: 0,
        strengthTraining: false,
        cardio: false,
        weight: 0,
        protein: 0,
        carbs: 0,
        fat: 0,
        creatine: false,
        stepCount: 0,
        notes: ''
      })
    }
  }, [editingRecord, today])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (formData.weight <= 0 || formData.calories < 0) {
      alert('Please enter valid values')
      return
    }
    // Preserve _id if editing
    const recordToSubmit = {
      ...formData,
      _id: editingRecord?._id
    } as DailyRecord
    onSubmit(recordToSubmit)
  }

  const handleCancel = () => {
    setFormData({
      date: today,
      calories: 0,
      strengthTraining: false,
      cardio: false,
      weight: 0,
      protein: 0,
      carbs: 0,
      fat: 0,
      creatine: false,
      stepCount: 0,
      notes: ''
    })
    onCancel()
  }

  return (
    <div className="bg-white rounded-lg shadow p-6 border-t-4 border-brand-teal">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-bold text-brand-dark">
          {editingRecord ? `Edit Metrics - ${editingRecord.date}` : "Log Today's Metrics"}
        </h2>
        <button onClick={handleCancel} className="text-brand-slate hover:text-brand-dark">
          <X className="w-6 h-6" />
        </button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-brand-dark mb-1">Date</label>
            <input
              type="date"
              value={formData.date}
              onChange={(e) => setFormData({ ...formData, date: e.target.value })}
              className="w-full px-3 py-2 border border-brand-light rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-teal"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-brand-dark mb-1">Weight (lbs)</label>
            <input
              type="number"
              step="0.1"
              value={formData.weight || ''}
              onChange={(e) => setFormData({ ...formData, weight: parseFloat(e.target.value) || 0 })}
              placeholder="e.g., 180.5"
              className="w-full px-3 py-2 border border-brand-light rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-teal"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-brand-dark mb-1">Calories</label>
            <input
              type="number"
              value={formData.calories || ''}
              onChange={(e) => setFormData({ ...formData, calories: parseInt(e.target.value) || 0 })}
              placeholder="e.g., 2000"
              className="w-full px-3 py-2 border border-brand-light rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-teal"
            />
          </div>

           <div>
            <label className="block text-sm font-medium text-brand-dark mb-1">Protein</label>
            <input
              type="number"
              value={formData.protein || ''}
              onChange={(e) => setFormData({ ...formData, protein: parseInt(e.target.value) || 0 })}
              placeholder="e.g., 130"
              className="w-full px-3 py-2 border border-brand-light rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-teal"
            />
          </div>

           <div>
            <label className="block text-sm font-medium text-brand-dark mb-1">Carbs</label>
            <input
              type="number"
              value={formData.carbs || ''}
              onChange={(e) => setFormData({ ...formData, carbs: parseInt(e.target.value) || 0 })}
              placeholder="e.g., 200"
              className="w-full px-3 py-2 border border-brand-light rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-teal"
            />
          </div>

           <div>
            <label className="block text-sm font-medium text-brand-dark mb-1">Fat</label>
            <input
              type="number"
              value={formData.fat || ''}
              onChange={(e) => setFormData({ ...formData, fat: parseInt(e.target.value) || 0 })}
              placeholder="e.g., 60"
              className="w-full px-3 py-2 border border-brand-light rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-teal"
            />
          </div>

           <div>
            <label className="block text-sm font-medium text-brand-dark mb-1">Step Count</label>
            <input
              type="number"
              value={formData.stepCount || ''}
              onChange={(e) => setFormData({ ...formData, stepCount: parseInt(e.target.value) || 0 })}
              placeholder="e.g., 10,000"
              className="w-full px-3 py-2 border border-brand-light rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-teal"
            />
          </div>
        </div>

        <div className="flex items-center gap-3">
          <input
            type="checkbox"
            id="strengthTraining"
            checked={formData.strengthTraining}
            onChange={(e) => setFormData({ ...formData, strengthTraining: e.target.checked })}
            className="w-4 h-4 text-brand-teal rounded focus:ring-2 focus:ring-brand-teal"
          />
          <label htmlFor="strengthTraining" className="text-sm font-medium text-brand-dark">
            Strength Training
          </label>

          <input
            type="checkbox"
            id="cardio"
            checked={formData.cardio}
            onChange={(e) => setFormData({ ...formData, cardio: e.target.checked })}
            className="w-4 h-4 text-brand-teal rounded focus:ring-2 focus:ring-brand-teal"
          />
          <label htmlFor="cardio" className="text-sm font-medium text-brand-dark">
            I did a run today!
          </label>

          <input
            type="checkbox"
            id="creatine"
            checked={formData.creatine}
            onChange={(e) => setFormData({ ...formData, creatine: e.target.checked })}
            className="w-4 h-4 text-brand-teal rounded focus:ring-2 focus:ring-brand-teal"
          />
          <label htmlFor="creatine" className="text-sm font-medium text-brand-dark">
            Creatine
          </label>
        </div>

        <div>
          <label className="block text-sm font-medium text-brand-dark mb-1">Notes</label>
          <textarea
            value={formData.notes}
            onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
            placeholder="Add any notes..."
            className="w-full px-3 py-2 border border-brand-light rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-teal"
            rows={3}
          />
        </div>

        <div className="flex gap-3 justify-end">
          <button
            type="button"
            onClick={handleCancel}
            className="px-4 py-2 text-brand-dark bg-brand-light rounded-lg hover:bg-brand-slate hover:text-brand-light transition"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-4 py-2 bg-brand-teal text-brand-dark rounded-lg hover:opacity-80 transition"
          >
            {editingRecord ? 'Update Metrics' : 'Save Metrics'}
          </button>
        </div>
      </form>
    </div>
  )
}
