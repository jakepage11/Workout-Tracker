import { IntegerType, ObjectId } from "mongodb"

export type Workout = {
  id?: string,
  user: string,
  exercises: Array<Exercise>,
  date: Date,
  completeIn: number,
}

export type Exercise = {
  id: string 
  name: string
  reps: Array<number>
  load: Array<number>
  difficulty: number
}

export type ExerciseInfo = {
  id: string,
  name: string,
  muscles: Array<String>
  tags: Array<String>
  level: string
  link: string
  equipment: Array<String>
  popularity: number
  people_req: number
  description: string
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