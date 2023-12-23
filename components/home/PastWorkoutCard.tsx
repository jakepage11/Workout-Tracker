'use client'
import React from 'react'
import dayjs from 'dayjs'
import { useState, useEffect } from "react"
import { ExerciseInfo, Workout } from '@/types/types'
import prisma from '@/prisma/dbConnection'
import { FitnessCenter, Timer } from '@mui/icons-material'
import { useRouter } from 'next/navigation'

export default function PastWorkoutCard({workout}: {workout: Workout}) {
  // Grab all unique muscles worked from exInfoList
  const [musclesWorked, setMusclesWorked] = useState(() => {return []})
  const router = useRouter()

  useEffect(() => {
    async function fetchMuscles() {
      const muscles = await fetch(`/api/workoutMuscles?wid=${workout.id?.toString()}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',

        }
      }).then((res) => res.json()).then(data => setMusclesWorked(data))
    }
    fetchMuscles()
  }, [workout])

  const musclesTags = musclesWorked.map((muscle) => {
    return <p key={muscle} className='bg-[var(--light-pink)] text-[12px] px-1 w-fit rounded-3xl'>{muscle}</p>
  })

  const formattedDate = dayjs(workout.date).format('M/D')
  let avgDifficulty = 0
  workout.exercises.forEach((ex) => {
    avgDifficulty += ex.difficulty
  })
  avgDifficulty /= workout.exercises.length

  let cardStyles = 'bg-[var(--gray)] w-[250px] h-[180px] rounded-lg relative'
  if (workout.completeIn === -1) {
    cardStyles += ' border-4 border-[var(--pink)]'
  }
  return (
    <div className={cardStyles}>
      <h3>{formattedDate}</h3>
      <ul className='flex flex-wrap gap-2'>
        {musclesTags}
      </ul>
      {/* Show Delete Workout option if workout wasn't used */}
      {
        workout.completeIn !== -1 ? 
        <div className='flex'>
          <Timer />
          {workout.completeIn}
          <FitnessCenter />
          {avgDifficulty}
        </div> :
        <div className='flex flex-col items-center cursor-pointer'>
          <h6>Workout wasn't completed</h6>
        </div>
      }
      <div className='flex justify-center'>
        <button className='bg-white absolute bottom-2 px-2 py-1 rounded-full'
          onClick={() => {router.push(`/edit-workout/${workout.id}`)}}>View/Edit</button>
      </div>
    </div>
  )
}

