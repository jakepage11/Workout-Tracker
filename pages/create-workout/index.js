import classes from "./CreateWorkout.module.css"
import NewWorkoutForm from "@/components/create-workout/NewWorkoutForm";
import {nanoid} from "nanoid";
import clientPromise from "@/lib/mongodb";
import ExSearch from "@/components/create-workout/ExSearch";
import Calendar from "react-calendar";
import { useRouter } from "next/router";
import { useContext } from "react";
import AuthContext from "@/stores/authContext";

export default function CreateWorkoutPage(props) {
  const router = useRouter();
  const {user, login} = useContext(AuthContext)

  // Sends the particular workout data to the db
  async function handleSubmit(workout) {
    if (user) { // only create workout for 
      const res = await fetch("/api/create-workout", {
        method: 'POST',
        body: JSON.stringify({
          ...workout,
          user: user.email
        }),
        headers: {
          'Content-Type': 'application/json'
        }
      });

      const data = await res.json();
      router.push("/");
    } else {
      login();
    }
  }
 
  return (
    <div className={classes.page}>
      <div className={classes.container}>
        <div className={classes.testDiv}>
          Ex Search to be implemented soon...
        </div>

        <div className={classes.formContainer}>
          <NewWorkoutForm 
                    handleSubmit={handleSubmit} 
                    workoutTypes={props.workoutTypes}
                    allExercises={props.exerciseList}
                    />
        </div>
      </div>
    </div>
    
    
  )
}

export async function getStaticProps() {
  const mongoClient = await clientPromise;
  // Grab all distinct exercise names
  const exercises = await mongoClient.db().
            collection('exercises-testing').find({}, {projection:{_id:0}}).toArray();
  // console.log(JSON.parse(JSON.stringify(exercises)));
  // Get all the possible workoutTypes
  const workoutTypes = await mongoClient.db().collection('workout-types')
        .find({}, {projection: {_id: 0}}).toArray();
  const types = JSON.parse(JSON.stringify(workoutTypes))[0].types;

  return {
    props: {
      exerciseList: JSON.parse(JSON.stringify(exercises)),
      workoutTypes: types
    }
  }

}