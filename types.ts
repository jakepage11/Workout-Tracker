import { ObjectId } from "mongodb"
export type Workout = {
  _id: ObjectId,
  user: string,
  exercises: Array<Object>,
  difficulty: number,
  date: Date,
  completeIn: number,
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