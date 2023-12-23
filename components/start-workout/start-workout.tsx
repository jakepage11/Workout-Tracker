'use client'
import React from 'react'
import { useState } from "react"
import AddExModal from './add-ex-modal'
import { Exercise } from '@/types/types'
import { ExerciseInfo } from '@/types/types'
import {useSession} from "next-auth/react"
import ExDisplay from './exercise-display'
import { Preview } from '@mui/icons-material'

export default function StartWorkout({exOptions}: {exOptions: ExerciseInfo[]}) {
  const {data: session} = useSession()
  const user = session?.user?.email as string
  const [currWorkout, setCurrWorkout] = useState(() => {
    return {
      user_id: user,
      exercises: [],
      start_time: new Date(),
      end_time: null,
      curr_ex: -1
    }
  })
  const [showAddModal, setShowAddModal] = useState(() => {return false})

  function addExercise(ex_name: string) {
    let excopy = JSON.parse(JSON.stringify(currWorkout.exercises))
    excopy.push({
      name: ex_name,
      reps: [0],
      weight: [0],
      setComplete: [false],
      difficulty: -1
    })
    setCurrWorkout(prevState => ({
      ...prevState,
      exercises: excopy
    }))
  }
  function updateSet(e: HTMLInputElement, exI: number, setI: number) {
    if (!Number.isNaN(parseInt(e.value))) {
      let exsCopy = JSON.parse(JSON.stringify(currWorkout.exercises))
      let currEx: Exercise = exsCopy[exI]
      if (e.name === "reps") {
        currEx.reps[setI] = parseInt(e.value)
      } else {
        currEx.weight[setI] = parseInt(e.value)
      }
      setCurrWorkout(prevState => ({
        ...prevState,
        exercises: exsCopy
      }))
    }
  }
  function markComplete(exI: number, setI: number) {
    let exsCopy = JSON.parse(JSON.stringify(currWorkout.exercises))
    let currEx: Exercise = exsCopy[exI]
    currEx.setComplete[setI] = !currEx.setComplete[setI]
    setCurrWorkout(prevState => ({
      ...prevState,
      exercises: exsCopy
    }))
  }
  function removeEx(exI: number) {
    let exsCopy = JSON.parse(JSON.stringify(currWorkout.exercises))
    exsCopy.splice(exI, 1)
    setCurrWorkout(prevState => ({
      ...prevState,
      exercises: exsCopy
    }))
  }
  console.log(currWorkout)
  const exs = currWorkout.exercises.map((ex, i) => {return <ExDisplay ex={ex} changeSet={updateSet} index={i} 
      markComplete={markComplete} removeEx={removeEx}/>})

  return (
    <div className='flex flex-col items-center'>
      <div className='w-[40%] border-pink-500 border-2 relative items-center'>
        {showAddModal && <AddExModal closeModal={() => setShowAddModal(false)} exercises={exOptions} addExercise={addExercise}/>}
        <h2>Title</h2>
        <div className='flex flex-col gap-3'>
         {exs}
        </div>
        <div className='flex flex-col items-center'>
          <button onClick={() => setShowAddModal(true)}>Add Exercises</button>
          <button>Cancel Workout</button>
        </div>
      </div>
    </div>
  )
}
