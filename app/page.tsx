'use client'

import { useState, useEffect } from 'react'
import { useSession, signOut } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import Dashboard from '@/components/Dashboard'
import MetricsForm from '@/components/MetricsForm'
import TargetsSettings from '@/components/TargetsSettings'
import Header from '@/components/Header'
import { FitnessData, DailyRecord, DailyTargets } from '@/types'
import { loadData, saveData } from '@/utils/storage'

// Fitness tracker application
export default function Page() {
  const { data: session, status } = useSession()
  const router = useRouter()
  
  const [data, setData] = useState<FitnessData>({ 
    records: [], 
    targets: { calorieTarget: 2000, stepsTarget: 10000, weeklyCalorieTarget: 14000, weeklyStepsTarget: 70000 } 
  })
  const [showForm, setShowForm] = useState(false)
  const [showTargets, setShowTargets] = useState(false)
  const [editingRecord, setEditingRecord] = useState<DailyRecord | null>(null)
  const [isLoaded, setIsLoaded] = useState(false)
  const [isSaving, setIsSaving] = useState(false)

  // Redirect if not authenticated
  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/login')
    }
  }, [status, router])

  // Load data from database on mount
  useEffect(() => {
    const init = async () => {
      // Check health first
      try {
        const healthRes = await fetch('/api/health')
        console.log('Health check response:', healthRes.status)
      } catch (e) {
        console.error('Health check failed:', e)
      }
      
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
        const records = await response.json()
        setData(prev => ({
          ...prev,
          records: Array.isArray(records) ? records : []
        }))
      } else {
        console.error('Failed to fetch records:', response.status)
        const errorData = await response.json()
        console.error('Error details:', errorData)
        // Fallback to empty records on error
        setData(prev => ({
          ...prev,
          records: []
        }))
      }
    } catch (error) {
      console.error('Failed to fetch records:', error)
      // Fallback to empty records on error
      setData(prev => ({
        ...prev,
        records: []
      }))
    }
  }

  const fetchTargets = async () => {
    try {
      const response = await fetch('/api/targets')
      if (response.ok) {
        const targets = await response.json()
        setData(prev => ({
          ...prev,
          targets
        }))
      } else {
        console.error('Failed to fetch targets:', response.status)
        // Fallback to localStorage
        const loaded = loadData()
        if (loaded.targets) {
          setData(prev => ({ ...prev, targets: loaded.targets }))
        }
      }
    } catch (error) {
      console.error('Failed to fetch targets:', error)
      // Fallback to localStorage on error
      const loaded = loadData()
      if (loaded.targets) {
        setData(prev => ({ ...prev, targets: loaded.targets }))
      }
    }
  }

  const addRecord = async (record: DailyRecord) => {
    setIsSaving(true)
    try {
      console.log('Adding record:', record)
      if (editingRecord) {
        // Update existing record
        const recordId = editingRecord.id || editingRecord._id
        console.log('Updating record with ID:', recordId)
        const response = await fetch(`/api/records?id=${recordId}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(record)
        })
        console.log('Update response status:', response.status)
        if (response.ok) {
          const updated = await response.json()
          console.log('Updated record:', updated)
          setData(prev => ({
            records: prev.records.map(r => (r.id === updated.id || r._id === updated.id) ? updated : r),
            targets: prev.targets
          }))
          setEditingRecord(null)
        }
      } else {
        // Add new record
        console.log('Creating new record')
        const response = await fetch('/api/records', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(record)
        })
        console.log('Create response status:', response.status)
        if (response.ok) {
          const created = await response.json()
          console.log('Created record:', created)
          setData(prev => ({
            records: [created, ...prev.records],
            targets: prev.targets
          }))
        } else {
          const errorData = await response.json()
          console.error('API error:', errorData)
          alert(`Failed to save: ${errorData.error}`)
        }
      }
      setShowForm(false)
    } catch (error) {
      console.error('Failed to save record:', error)
      alert('Failed to save record. Please try again.')
    } finally {
      setIsSaving(false)
    }
  }

  const handleEditRecord = (record: DailyRecord) => {
    setEditingRecord(record)
    setShowForm(true)
  }

  const handleDeleteRecord = async (date: string) => {
    try {
      const recordToDelete = data.records.find(r => r.date === date)
      if (!recordToDelete) return
      
      const recordId = recordToDelete.id || recordToDelete._id
      const response = await fetch(`/api/records?id=${recordId}`, {
        method: 'DELETE'
      })
      
      if (response.ok) {
        setData(prev => ({
          records: prev.records.filter(r => r.date !== date),
          targets: prev.targets
        }))
      }
    } catch (error) {
      console.error('Failed to delete record:', error)
      alert('Failed to delete record. Please try again.')
    }
  }

  const handleSaveTargets = async (targets: DailyTargets) => {
    try {
      const response = await fetch('/api/targets', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(targets),
      })

      if (response.ok) {
        const savedTargets = await response.json()
        setData(prev => ({
          ...prev,
          targets: savedTargets
        }))
        // Also save to localStorage as fallback
        saveData({ records: data.records, targets: savedTargets })
        setShowTargets(false)
      } else {
        console.error('Failed to save targets:', response.status)
        alert('Failed to save targets. Please try again.')
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
            targets={data.targets || { calorieTarget: 2000, stepsTarget: 10000, weeklyStepsTarget: 70000 }}
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
