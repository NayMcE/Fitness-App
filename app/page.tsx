'use client'

import { useState, useEffect } from 'react'
import Dashboard from '@/components/Dashboard'
import MetricsForm from '@/components/MetricsForm'
import TargetsSettings from '@/components/TargetsSettings'
import Header from '@/components/Header'
import { FitnessData, DailyRecord, DailyTargets } from '@/types'
import { loadData, saveData } from '@/utils/storage'

// Fitness tracker application
export default function Page() {
  const [data, setData] = useState<FitnessData>({ 
    records: [], 
    targets: { calorieTarget: 2000, stepsTarget: 10000 } 
  })
  const [showForm, setShowForm] = useState(false)
  const [showTargets, setShowTargets] = useState(false)
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
        records: prev.records.map(r => r.date === editingRecord.date ? record : r),
        targets: prev.targets
      }))
      setEditingRecord(null)
    } else {
      // Add new record
      setData(prev => ({
        records: [record, ...prev.records],
        targets: prev.targets
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
      records: prev.records.filter(r => r.date !== date),
      targets: prev.targets
    }))
  }

  const handleSaveTargets = (targets: DailyTargets) => {
    setData(prev => ({
      ...prev,
      targets
    }))
    setShowTargets(false)
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
            targets={data.targets || { calorieTarget: 2000, stepsTarget: 10000 }}
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
        <Dashboard 
          data={data}
          onEditRecord={handleEditRecord}
          onDeleteRecord={handleDeleteRecord}
        />
      </main>
    </div>
  )
}
