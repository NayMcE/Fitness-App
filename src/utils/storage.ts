import { FitnessData, MetricRecord } from '../types'

const API_URL = '/api/records'

// Fetch all records from MongoDB
export async function loadData(): Promise<FitnessData> {
  try {
    const response = await fetch(API_URL)
    if (!response.ok) throw new Error('Failed to fetch records')
    const records = await response.json()
    return { records }
  } catch (error) {
    console.error('Error loading data:', error)
    return { records: [] }
  }
}

// Save a new record to MongoDB
export async function saveRecord(record: MetricRecord): Promise<void> {
  try {
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(record),
    })
    if (!response.ok) throw new Error('Failed to save record')
  } catch (error) {
    console.error('Error saving record:', error)
    throw error
  }
}

// Delete a record from MongoDB
export async function deleteRecord(id: string): Promise<void> {
  try {
    const response = await fetch(`${API_URL}?id=${id}`, {
      method: 'DELETE',
    })
    if (!response.ok) throw new Error('Failed to delete record')
  } catch (error) {
    console.error('Error deleting record:', error)
    throw error
  }
}
