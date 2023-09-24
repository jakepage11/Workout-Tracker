import CreateWorkoutForm from "@/components/create-workout/CreateWorkoutFrom";
import classes from "./CreateWorkout.module.css"

export default async function CreateWorkoutPage() {
  // TODO: Get all the possible workoutTypes
  


  return (
    <div className={classes.page}>
      <div className={classes.container}>
        <div className={classes.testDiv}>
          Ex Search to be implemented soon...
        </div>
        <div className={classes.formContainer}>
          {/* <h1>Hello bros</h1> */}
          <CreateWorkoutForm />
        </div>
      </div>
    </div>
  )
}

// Returns all exercises to choose in the db
async function getExercises(user_email: string) {

}
