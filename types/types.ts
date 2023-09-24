import { IntegerType, ObjectId } from "mongodb"

export type Workout = {
  _id?: string,
  user: string,
  exercises: Array<Object>,
  difficulty: number,
  date: Date,
  completeIn: number,
}

export type Exercise = {
  id: String 
  name: String
  reps: IntegerType[]
  load: IntegerType[]
  difficulty: Number
}

export type WorkoutStarted = {
    _id: ObjectId,
    user: string,
    exercises: Array<Object>,
    difficulty: number,
    date: Date,
    completeIn: number,
    progress: number,
    startTime: Date,
}