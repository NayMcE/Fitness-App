export interface DailyRecord {
  id?: string
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
  weeklyCalorieTarget?: number
  weeklyStepsTarget: number
}

export interface FitnessData {
  records: DailyRecord[]
  targets?: DailyTargets
}
