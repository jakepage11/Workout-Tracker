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