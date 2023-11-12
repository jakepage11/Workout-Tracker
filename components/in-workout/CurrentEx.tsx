'use client'
import { useState} from "react";
import { Exercise, ExerciseInfo } from "@/types/types";
import styles from "../../app/in-workout/[wid]/InWorkout.module.css"

export default function CurrentEx({exercise, exinfo}: {exercise: Exercise|undefined, exinfo: ExerciseInfo|undefined}) {
  const [currSet, setCurrSet] = useState(() => {return 0})

  const setInfo = exercise?.reps.map((rep, index) => {
    return <div className="flex">
      <p>Set {index + 1}</p>
      <p>|</p>
      <p>{rep} @ {exercise.load[index]}</p>
    </div>
  })

  return (
    <div className={styles.content}>
      {/* Name and set */}
      <div>
        <h5>{exercise?.name}</h5>
        <h5>Set {currSet + 1} / {exercise?.reps.length} </h5>
      </div>
      {/* load and reps */}
      <div>
        <h2>
          {exercise?.load[currSet]} lbs
        </h2>
        <h2>
          {exercise?.reps[currSet]} reps
        </h2>
      </div>
      <div>
        {setInfo}
      </div>
      <button className={styles.btn}>Set Completed</button>
    </div>
  )
}