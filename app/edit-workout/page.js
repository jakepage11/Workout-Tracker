'use client'
import classes from "../create-workout/CreateWorkout.module.css"
import NewWorkoutForm from "@/components/create-workout/NewWorkoutForm";
import { useRouter } from "next/navigation";

export default function EditWorkoutPage() {
  const router = useRouter();
  // Sends the particular workout data to the db
  // TODO: Use updated version of this method from create workout
  async function handleSubmit(workout) {
    const res = await fetch("/api/update-workout", {
      method: 'POST',
      body: JSON.stringify({...workout}),
      headers: {
        'Content-Type': 'application/json'
      }
    });

    const data = await res.json();
    router.push("/");
  }

  function handleAddEx(exs, name) {
    exs.push()
    return exs;
  }
  // TODO: Fetch data
  
  return (
    <div className={classes.page}>
      <div className={classes.container}>
        <div className={classes.testDiv}>
          Ex Search to be implemented soon...
        </div>

        <div className={classes.formContainer}>
          {/* <NewWorkoutForm 
                    handleSubmit={handleSubmit} 
                    workoutTypes={null}
                    allExercises={null}
                    workout={null}
                    /> */}
        </div>
      </div>
    </div>
  )
}

// export async function getServerSideProps(context) {
//   const { query } = context;
//   const wid = query.workoutId;
//   console.log(wid);
//   const mongoClient = await clientPromise;
//   // Grab all distinct exercise names
//   const exercises = await mongoClient.db().
//             collection('exercises-testing').find({}, {projection:{_id:0}}).toArray();
//   // Get all the possible workoutTypes
//   const workoutTypes = await mongoClient.db().collection('workout-types')
//         .find({}, {projection: {_id: 0}}).toArray();
//   const types = JSON.parse(JSON.stringify(workoutTypes))[0].types;
//   // Get workout that matches id from the URL
//   const workoutData = await mongoClient.db().collection('workout-testing')
//                             .findOne({"_id": new ObjectId(wid)});
//   const workoutStr = JSON.parse(JSON.stringify(workoutData));
//   console.log({types})
//   return {
//     props: {
//       exerciseList: JSON.parse(JSON.stringify(exercises)),
//       workoutTypes: types,
//       workoutProp: workoutStr
//     }
//   }

// }