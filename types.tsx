export type Exercise = {
  name: string
  link: string,
  muscles: string[],
  tags: string[],
  equipment: string[],
  level: number,
  popularity: number,
  description: string
}

export type Workout = {
  user: string,
  exercises: any[],
  difficulty: number,
  data: Date,
  type: string,
  completeIn: number
}

export type PlannedEx = {
  id: string,
  name: string,
  reps: string[],
  load: string[],
  orderNum: number,
  difficulty: string
}

export type InWorkout = {
  user: string,
  exerises: any[],
  date: Date,
  type: string,
  start_time: Date,
  progress: number
}