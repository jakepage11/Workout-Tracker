'use server'
import CreateWorkoutForm from "@/components/create-workout/CreateWorkoutForm";
import prisma from "@/prisma/dbConnection";
import { Workout } from "@/types/types";
import { Exercise } from "@/types/types";
import { ExerciseInfo } from "@/types/types";
import { workouts } from "@prisma/client";
import { useRouter } from "next/navigation";

export default async function EditWorkoutPage({params}: {params: {wid: string}}) {
  // TODO: Get all the possible workoutTypes
  const wid = params.wid
  const exercisesInfo = await prisma.exercises.findMany()
  const workout = await prisma.workouts.findFirst({where: {
    id: wid
  }}) ?? undefined
  return (
    // entire page container
    <CreateWorkoutForm editWorkout={workout} exercisesInfo={exercisesInfo} isLogging={false} isEditing={true}/>
  )
}



// export async function submitWorkout(workout: Workout) {
//   await prisma.workouts.create({data: {
//     user: workout.user, exercises: workout.exercises as Array<Exercise>,
//     date: workout.date, type: "", 
//     completeIn: -1,
//   }})
// }