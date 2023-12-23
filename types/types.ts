import { IntegerType, ObjectId } from "mongodb"

export type Workout = {
  id?: string,
  user_id: string,
  exercises: Array<Exercise>,
  start_time: Date,
  end_time: Date,
  curr_ex: Number
}

export type Exercise = {
  id: string 
  name: string
  reps: Array<number>
  weight: Array<number>
  setComplete: Array<boolean>
  difficulty: number
}

export type ExerciseInfo = {
  id: string,
  creator_uid: string,
  name: string,
  muscles: Array<String>
  tags: Array<String>
  equipment: Array<String>
}