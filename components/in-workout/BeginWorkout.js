import {nanoid} from "nanoid"
import classes from "./BeginWorkout.module.css"
import inExClasses from "./InExSet.module.css";
// Start screen for the workout. Shows type, exercises, and estimated 
// time
export default function BeginWorkout({workout, handleBegin}) {
  // No state needed

  // Map each exercise into "[name] ([sets])"
  const mapExs = workout.exercises.map((ex) => {
    return <h6 key={nanoid()}>{ex.name} ({ex.reps.length})</h6>
  });


  return (
    <div className={classes.background}>
      <div className={classes.contentContainer}>
        {/* Type */}
        <h1 className={classes.typeHeader}>
          {workout.type}
        </h1>
        {/* Exercises */}
        <div className={classes.exList}>
          {mapExs}
        </div>
        {/* Duration */}
        <h3 className={classes.timeHeader}>
          ~ 55 min
        </h3>
        
        <button className={classes.beginBtn}
                      onClick={handleBegin}>
            {"Let's Begin!"}
        </button> 
       
        
      </div>
      
    </div>
  )
}