export interface DailyRecord {
  _id?: string
  date: string
  calories: number
  strengthTraining: boolean
  cardio: boolean
  weight: number
  protein: number
  carbs: number
  fat: number
  creatine: boolean
  stepCount: number
  notes: string
}

export interface DailyTargets {
  calorieTarget: number
  stepsTarget: number
}

export interface FitnessData {
  records: DailyRecord[]
  targets?: DailyTargets
}
