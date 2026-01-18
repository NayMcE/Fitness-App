export interface DailyRecord {
  _id?: string
  date: string
  calories: number
  strengthTraining: boolean
  cardio: boolean
  workoutMinutes: number
  weight: number
  protein: number
  carbs: number
  fat: number
  creatine: boolean
  stepCount: number
  notes: string
}

export interface FitnessData {
  records: DailyRecord[]
}
