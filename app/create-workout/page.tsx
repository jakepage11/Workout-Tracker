import CreateWorkoutForm from "@/components/create-workout/CreateWorkoutFrom";
import prisma from "@/prisma/dbConnection";
import { ExerciseInfo } from "@/types/types";

export default async function CreateWorkoutPage() {
  // TODO: Get all the possible workoutTypes
  const exercisesInfo = await prisma.exercises.findMany()
  return (
    // entire page container
    <div className={"flex justify-center"}>
      <CreateWorkoutForm exercisesInfo={exercisesInfo}/>
    </div>
  )
}

// Returns all exercises to choose in the db
async function getExercises() {
  return 
}
