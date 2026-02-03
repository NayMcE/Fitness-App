'use client'

import { useState, useEffect } from 'react'
import { DailyRecord, DailyTargets } from '@/types'
import { CheckCircle, Circle, Edit2, Trash2 } from 'lucide-react'
import MetricsForm from '@/components/MetricsForm'
import TargetsSettings from '@/components/TargetsSettings'
import Header from '@/components/Header'

export default function LogsPage() {
  const [records, setRecords] = useState<DailyRecord[]>([])
  const [targets, setTargets] = useState<DailyTargets>({ calorieTarget: 2000, stepsTarget: 10000, weeklyStepsTarget: 70000 })
  const [showForm, setShowForm] = useState(false)
  const [showTargets, setShowTargets] = useState(false)
  const [editingRecord, setEditingRecord] = useState<DailyRecord | null>(null)
  const [deletingId, setDeletingId] = useState<string | null>(null)
  const [isLoaded, setIsLoaded] = useState(false)

  // Load data from database on mount
  useEffect(() => {
    const init = async () => {
      await fetchRecords()
      await fetchTargets()
      setIsLoaded(true)
    }
    init()
  }, [])

  const fetchRecords = async () => {
    try {
      const response = await fetch('/api/records')
      if (response.ok) {
        const data = await response.json()
        setRecords(Array.isArray(data) ? data : [])
      }
    } catch (error) {
      console.error('Failed to fetch records:', error)
    }
  }

  const fetchTargets = async () => {
    try {
      const response = await fetch('/api/targets')
      if (response.ok) {
        const data = await response.json()
        setTargets(data)
      }
    } catch (error) {
      console.error('Failed to fetch targets:', error)
    }
  }

  const addRecord = async (record: DailyRecord) => {
    try {
      if (editingRecord) {
        // Update existing record
        const recordId = editingRecord.id || editingRecord._id
        const response = await fetch(`/api/records?id=${recordId}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(record)
        })
        if (response.ok) {
          const updated = await response.json()
          setRecords(prev => prev.map(r => (r.id === updated.id || r._id === updated.id) ? updated : r))
          setEditingRecord(null)
        }
      } else {
        // Add new record
        const response = await fetch('/api/records', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(record)
        })
        if (response.ok) {
          const created = await response.json()
          setRecords(prev => [created, ...prev])
        }
      }
      setShowForm(false)
    } catch (error) {
      console.error('Failed to save record:', error)
      alert('Failed to save record. Please try again.')
    }
  }

  const handleEditRecord = (record: DailyRecord) => {
    setEditingRecord(record)
    setShowForm(true)
  }

  const handleDeleteRecord = async (recordId: string) => {
    try {
      const response = await fetch(`/api/records?id=${recordId}`, {
        method: 'DELETE'
      })
      if (response.ok) {
        setRecords(prev => prev.filter(r => (r.id || r._id) !== recordId))
      }
    } catch (error) {
      console.error('Failed to delete record:', error)
      alert('Failed to delete record. Please try again.')
    }
  }

  const handleSaveTargets = async (newTargets: DailyTargets) => {
    try {
      const response = await fetch('/api/targets', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newTargets)
      })
      if (response.ok) {
        const saved = await response.json()
        setTargets(saved)
        setShowTargets(false)
      }
    } catch (error) {
      console.error('Failed to save targets:', error)
      alert('Failed to save targets. Please try again.')
    }
  }

  const handleCloseForm = () => {
    setShowForm(false)
    setEditingRecord(null)
  }

  const targetsMetDaily = (record: DailyRecord): boolean => {
    const caloriesMet = record.calories >= targets.calorieTarget
    const stepsMet = record.stepCount >= targets.stepsTarget
    return caloriesMet && stepsMet
  }

  const handleDelete = async (record: DailyRecord) => {
    if (!window.confirm(`Delete entry for ${record.date}?`)) return
    const recordId = record.id || record._id || ''
    if (!recordId) return
    setDeletingId(recordId)
    try {
      await handleDeleteRecord(recordId)
    } finally {
      setDeletingId(null)
    }
  }

  if (!isLoaded) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="text-gray-600">Loading...</div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <Header
        onLogsClick={() => {}}
        onSettingsClick={() => {
          setShowForm(false)
          setShowTargets(!showTargets)
        }}
        onLogMetricsClick={() => {
          setEditingRecord(null)
          setShowTargets(false)
          setShowForm(!showForm)
        }}
      />

      <main className="max-w-6xl mx-auto px-4 py-8">
        {showTargets && (
          <TargetsSettings 
            targets={targets}
            onSave={handleSaveTargets}
            onCancel={() => setShowTargets(false)}
          />
        )}
        {showForm && (
          <div className="mb-8">
            <MetricsForm 
              onSubmit={addRecord} 
              onCancel={handleCloseForm}
              editingRecord={editingRecord}
            />
          </div>
        )}

        <div className="bg-white rounded-lg shadow p-6">
          <h1 className="text-2xl font-bold text-gray-900 mb-6">All Logs</h1>
          {records.length > 0 ? (
            <div className="space-y-3">
              {records.map((record, idx) => (
                <div key={idx} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div className="flex items-center gap-4 flex-1">
                    {targetsMetDaily(record) ? (
                      <CheckCircle className="w-5 h-5 text-green-600" />
                    ) : (
                      <Circle className="w-5 h-5 text-gray-300" />
                    )}
                    <div>
                      <p className="font-medium text-gray-900">{record.date}</p>
                      <p className="text-sm text-gray-600">
                        {record.calories} cal • {record.weight} lbs {record.strengthTraining && '• Strength Training'}
                      </p>
                      <p className="text-xs text-gray-500 mt-1">
                        Steps: {record.stepCount} • Protein: {record.protein}g • Carbs: {record.carbs}g • Fat: {record.fat}g
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleEditRecord(record)}
                      className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition"
                      title="Edit entry"
                    >
                      <Edit2 className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleDelete(record)}
                      disabled={deletingId === (record.id || record._id)}
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
      </main>
    </div>
  )
}

