'use client'
import React from 'react'
import { Workout } from '@/types/types'
import dayjs from "dayjs"


export default function WorkoutCard({workout}: {workout: Workout}) {
  const formattedDate = dayjs(workout.date).format('M/D')
  const formattedTime = dayjs(workout.date).format('hh:mma')
 const firstThreeExs = workout.exercises.slice(0, 3).map((ex) => {
  return <p key={ex.name}>{ex.name}</p>
 })

  return (
    <div className="bg-[var(--pink)] w-[250px] h-[180px] rounded-3xl p-5">
      <h4 className='text-[25px]'>{formattedDate} - {formattedTime}</h4>
      <div>
        {firstThreeExs}
      </div>
     
    </div>
  )
}
