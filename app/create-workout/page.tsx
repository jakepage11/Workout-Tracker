'use server'
import CreateWorkoutForm from "@/components/create-workout/CreateWorkoutForm";
import prisma from "@/prisma/dbConnection";
import { Workout } from "@/types/types";
import { Exercise } from "@/types/types";
import { ExerciseInfo } from "@/types/types";

export default async function CreateWorkoutPage() {
  // TODO: Get all the possible workoutTypes
  const exercisesInfo = await prisma.exercises.findMany()
  return (
    // entire page container
    <CreateWorkoutForm exercisesInfo={exercisesInfo} isLogging={false} isEditing={false}/>
    
  )
}

export async function submitWorkout(workout: Workout) {
  await prisma.workouts.create({data: {
    user: workout.user, exercises: workout.exercises as Array<Exercise>,
    date: workout.date, type: "", 
    completeIn: -1,
  }})
}