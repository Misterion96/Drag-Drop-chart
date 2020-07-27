export interface DailyPlan {
  maxValue: number
  minValue: number
  midValue : number
  targetName: string
  presentName: string
  days: dayPlan[]
}
export interface dayPlan{
  date: Date
  targetValue: number
  presentValue: number,
  target?: string
  present?: string
}
