import CreateWorkoutForm from "@/components/create-workout/CreateWorkoutFrom";
import classes from "./CreateWorkout.module.css"
import prisma from "@/prisma/dbConnection";
import { ExerciseInfo } from "@/types/types";

export default async function CreateWorkoutPage() {
  // TODO: Get all the possible workoutTypes
  const exercisesInfo = await prisma.exercises.findMany()
  return (
    // entire page container
    <div className={"flex justify-center"}>
      <div className={classes.container}>
        <div className={classes.testDiv}>
          Ex Search to be implemented soon...
        </div>
        <div className={classes.formContainer}>
          {/* <h1>Hello bros</h1> */}
          <CreateWorkoutForm exercisesInfo={exercisesInfo}/>
        </div>
      </div>
    </div>
  )
}

// Returns all exercises to choose in the db
async function getExercises() {
  return 
}
