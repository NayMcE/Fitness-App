import { FitnessData } from '../types'

const STORAGE_KEY = 'fitness_tracker_data'

export function loadData(): FitnessData {
  try {
    const stored = localStorage.getItem(STORAGE_KEY)
    return stored ? JSON.parse(stored) : { records: [] }
  } catch {
    return { records: [] }
  }
}

export function saveData(data: FitnessData): void {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data))
}
