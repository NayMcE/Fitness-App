'use client'

import { useState, useEffect } from 'react'
import { Activity, Plus } from 'lucide-react'
import Dashboard from '@/components/Dashboard'
import MetricsForm from '@/components/MetricsForm'
import { FitnessData, DailyRecord } from '@/types'
import { loadData, saveData } from '@/utils/storage'

export default function Page() {
  const [data, setData] = useState<FitnessData>({ records: [] })
  const [showForm, setShowForm] = useState(false)

  useEffect(() => {
    const loaded = loadData()
    setData(loaded)
  }, [])

  useEffect(() => {
    saveData(data)
  }, [data])

  const addRecord = (record: DailyRecord) => {
    setData(prev => ({
      records: [record, ...prev.records]
    }))
    setShowForm(false)
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
              onClick={() => setShowForm(!showForm)}
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
            <MetricsForm onSubmit={addRecord} onCancel={() => setShowForm(false)} />
          </div>
        )}
        <Dashboard data={data} />
      </main>
    </div>
  )
}
