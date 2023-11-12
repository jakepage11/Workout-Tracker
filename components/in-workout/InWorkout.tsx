'use client'
import { Workout, ExerciseInfo } from '@/types/types'
import React from 'react'
import { useState } from 'react'
import ExerciseItem from './ExerciseItem'
import CurrentEx from './CurrentEx'
import styles from "../../app/in-workout/[wid]/InWorkout.module.css"

export default function InWorkout({workout, exInfo}: {workout: Workout|undefined, exInfo: ExerciseInfo[]}) {
  const [workoutState, setWorkoutState] = useState<Workout|undefined>(() => {
    return workout
  }) 
  const [currExIndex, setCurrExIndex] = useState<number>(() => {return -1})

  const exList = workout?.exercises.map((ex) => {
    const info = exInfo.find(i => i['name'] === ex.name)
    return <ExerciseItem exercise={ex} exinfo={info}/>
  })

  const handleBegin = () => {
    setCurrExIndex(0)
  }

  return (
    <div className='w-[100%] min-h-[calc(100vh-var(--navbar-height))] flex flex-col items-center relative'>
      {currExIndex === -1 && <>
        <h2 className='text-white'>Workout Rundown</h2>
        <div className='w-[90%] flex flex-col gap-2'>
          {exList}
        </div>
        <button className={styles.btn}
          onClick={handleBegin}>Begin Workout</button>
        </>
      }
      {currExIndex >= 0 && <CurrentEx exercise={workoutState?.exercises[currExIndex]} 
        exinfo={exInfo.find(i => i['name'] === workoutState?.exercises[currExIndex].name)}/>}
    </div>
  )
}
