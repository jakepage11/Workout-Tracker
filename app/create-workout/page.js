import classes from "./CreateWorkout.module.css"
import NewWorkoutForm from "@/components/create-workout/NewWorkoutForm";
import clientPromise from "@/lib/mongodb";

export default async function CreateWorkoutPage() {
  const mongoClient = await clientPromise;
  // Get all the possible workoutTypes
  const workoutTypes = await mongoClient.db(process.env.MONGODB_DATABASE).collection(process.env.MONGODB_COLLECTION_TYPES)
        .find({}, {projection: {_id: 0}}).toArray();
  const types = JSON.parse(JSON.stringify(workoutTypes))[0].types;

  // TODO: make this into an api route instead once I figure out the server component fetch thingy
  const exercises = await mongoClient.db(process.env.MONGODB_DATABASE).
            collection(String(process.env.MONGODB_COLLECTION_EXERCISES))
            .find({}, {projection:{_id:0}}).toArray()
  const exerciseList = JSON.parse(JSON.stringify(exercises))

  return (
    <div className={classes.page}>
      <div className={classes.container}>
        <div className={classes.testDiv}>
          Ex Search to be implemented soon...
        </div>
        <div className={classes.formContainer}>
          {/* <h1>Hello bros</h1> */}
          <NewWorkoutForm 
                    workoutTypes={types}
                    allExercises={exerciseList}
                    />
        </div>
      </div>
    </div>
    
    
  )
}