import { FitnessData } from '@/types'

const STORAGE_KEY = 'fitness_tracker_data'

export function loadData(): FitnessData {
  try {
    const stored = localStorage.getItem(STORAGE_KEY)
    const data = stored ? JSON.parse(stored) : { records: [] }
    
    // Ensure targets are always present
    if (!data.targets) {
      data.targets = { calorieTarget: 2000, stepsTarget: 10000, weeklyStepsTarget: 70000 }
    } else if (!data.targets.weeklyStepsTarget) {
      // Add weeklyStepsTarget if it's missing from existing targets
      data.targets.weeklyStepsTarget = 70000
    }
    
    return data
  } catch {
    return { records: [], targets: { calorieTarget: 2000, stepsTarget: 10000, weeklyStepsTarget: 70000 } }
  }
}

export function saveData(data: FitnessData): void {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data))
}
