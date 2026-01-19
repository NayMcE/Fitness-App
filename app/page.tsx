'use client'

import { useState, useEffect } from 'react'
import { Activity, Plus } from 'lucide-react'
import Dashboard from '@/components/Dashboard'
import MetricsForm from '@/components/MetricsForm'
import { FitnessData, DailyRecord } from '@/types'
import { loadData, saveData } from '@/utils/storage'

// Fitness tracker application
export default function Page() {
  const [data, setData] = useState<FitnessData>({ records: [] })
  const [showForm, setShowForm] = useState(false)
  const [editingRecord, setEditingRecord] = useState<DailyRecord | null>(null)
  const [isLoaded, setIsLoaded] = useState(false)

  // Load data from localStorage on mount
  useEffect(() => {
    const loaded = loadData()
    setData(loaded)
    setIsLoaded(true)
  }, [])

  // Save data to localStorage whenever it changes
  useEffect(() => {
    if (isLoaded) {
      saveData(data)
    }
  }, [data, isLoaded])

  const addRecord = (record: DailyRecord) => {
    if (editingRecord) {
      // Update existing record
      setData(prev => ({
        records: prev.records.map(r => r.date === editingRecord.date ? record : r)
      }))
      setEditingRecord(null)
    } else {
      // Add new record
      setData(prev => ({
        records: [record, ...prev.records]
      }))
    }
    setShowForm(false)
  }

  const handleEditRecord = (record: DailyRecord) => {
    setEditingRecord(record)
    setShowForm(true)
  }

  const handleDeleteRecord = (date: string) => {
    setData(prev => ({
      records: prev.records.filter(r => r.date !== date)
    }))
  }

  const handleCloseForm = () => {
    setShowForm(false)
    setEditingRecord(null)
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
      <header className="bg-white shadow">
        <div className="max-w-6xl mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Activity className="w-8 h-8 text-indigo-600" />
              <h1 className="text-3xl font-bold text-gray-900">Macci Fit Tracker</h1>
            </div>
            <button
              onClick={() => {
                setEditingRecord(null)
                setShowForm(!showForm)
              }}
              className="flex items-center gap-2 bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition"
            >
              <Plus className="w-5 h-5" />
              Log Metrics
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 py-8">
        {showForm && (
          <div className="mb-8">
            <MetricsForm 
              onSubmit={addRecord} 
              onCancel={handleCloseForm}
              editingRecord={editingRecord}
            />
          </div>
        )}
        <Dashboard 
          data={data}
          onEditRecord={handleEditRecord}
          onDeleteRecord={handleDeleteRecord}
        />
      </main>
    </div>
  )
}
