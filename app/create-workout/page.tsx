'use server'
import CreateWorkoutForm from "@/components/create-workout/CreateWorkoutFrom";
import prisma from "@/prisma/dbConnection";
import { Workout } from "@/types/types";
import { Exercise } from "@/types/types";
import { ExerciseInfo } from "@/types/types";

export default async function CreateWorkoutPage() {
  // TODO: Get all the possible workoutTypes
  const exercisesInfo = await prisma.exercises.findMany()
  return (
    // entire page container
    <div className={"flex justify-center"}>
      <CreateWorkoutForm exercisesInfo={exercisesInfo} />
    </div>
  )
}

// TODO: Need to figure out how to use prisma within the client component. Either using a 
// function to pass down or a server component on the inside
// Adds the given workout to the database
export async function submitWorkout(workout: Workout) {
  await prisma.workouts.create({data: {
    user: workout.user, exercises: workout.exercises as Array<Exercise>,
    date: workout.date, type: "", 
    completeIn: -1,
  }})
}
