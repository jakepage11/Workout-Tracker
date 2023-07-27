
import classes from "./CreateWorkout.module.css"
import NewWorkoutForm from "@/components/create-workout/NewWorkoutForm";
import clientPromise from "@/lib/mongodb";
// import ExSearch from "@/components/create-workout/ExSearch";

export default async function CreateWorkoutPage() {
  const mongoClient = await clientPromise;
  // Grab all distinct exercise names
  const exercises = await mongoClient.db().
            collection(process.env.MONGODB_COLLECTION_EXERCISES).find({}, {projection:{_id:0}}).toArray();
  const exerciseList = JSON.parse(JSON.stringify(exercises))
  // console.log(JSON.parse(JSON.stringify(exercises)));
  // Get all the possible workoutTypes
  const workoutTypes = await mongoClient.db().collection(process.env.MONGODB_COLLECTION_TYPES)
        .find({}, {projection: {_id: 0}}).toArray();
  console.log({exerciseList})
  console.log({workoutTypes})
  const types = JSON.parse(JSON.stringify(workoutTypes))[0].types;

  return (
    <div className={classes.page}>
      <div className={classes.container}>
        <div className={classes.testDiv}>
          Ex Search to be implemented soon...
        </div>

        <div className={classes.formContainer}>
          <NewWorkoutForm 
                    workoutTypes={types}
                    allExercises={exerciseList}
                    />
        </div>
      </div>
    </div>
    
    
  )
}

async function getStaticProps() {
  

  return {
    exerciseList: JSON.parse(JSON.stringify(exercises)),
    workoutTypes: types
  }

}