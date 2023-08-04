'use client'
import { useRef, useEffect } from "react"
import inSetClasses from "./InExSet.module.css"
import classes from "./EndWorkout.module.css"
import {nanoid} from "nanoid"

export default function EndWorkout({workout, handleCompleteWorkout}) {
  const progressBarRef = useRef();

  useEffect(() => {
    if (progressBarRef.current) {
      progressBarRef.current.style.width = "100%"
    }
  }, [workout])

  // Calculate the average difficulty
  let totalDiff = 0;
  for (let i = 0; i < workout.exercises.length; i++) {
    totalDiff += workout.exercises[i].difficulty;
  }


  // Create list of exercises and num sets
  const mapExs = workout.exercises.map((ex) => {
    return <h6 key={nanoid()}
              className={classes.exerciseListItem}>
                {ex.name} ({ex.reps.length})
            </h6>
  });

  return (
    <div className={inSetClasses.background}>
      <div className={classes.contentContainer}>
        {/* List of completed exercises */}
        <div className={classes.topContainer}>
          <h2 className={classes.completeHeader}>
            Completed!
          </h2>
          <div className={classes.exerciseList}>
            {mapExs}
          </div>
        </div>
        <div className={classes.diffContainer}>
          <h3 className={classes.diffHeader}>
            Difficulty
          </h3>
          <div className={classes.diffValContainer}>
            <h2 className={classes.diffValue}>
              {Math.round(totalDiff * 100 / workout.exercises.length) / 100}
            </h2>
            <p className={classes.diffMax}> / 5</p>
          </div>
          
        </div>
        <div className={classes.diffContainer}>
          <h3 className={classes.timeHeader}>
            Time Spent
          </h3>
          <h2 className={classes.timeValue}>
            55 min
          </h2>
        </div>
        {/* Feel good message */}
        <p>
          Keep up the Great work!
        </p>
        <div className={inSetClasses.bottomContainer}>
          <button className="inworkout-btns"
                  onClick={handleCompleteWorkout}>
            Exit
          </button>
        </div>
      </div>
    </div>
  )

  
}