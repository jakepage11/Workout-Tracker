'use client'
import React from 'react'
import { Workout } from '@/types/types'
import dayjs from "dayjs"
import { useRouter } from 'next/navigation'


export default function WorkoutCard({workout}: {workout: Workout}) {
  const router = useRouter()
  const formattedDate = dayjs(workout.date).format('M/D')
  const formattedTime = dayjs(workout.date).format('hh:mma')
  const firstThreeExs = workout.exercises.slice(0, 3).map((ex) => {
    return <p key={ex.name}>{ex.name}</p>
  })

  const isToday = dayjs(workout.date).isSame(dayjs(), 'day')

  const startWorkout = () => {
    // reroute to in-workout with given workotu id
    router.push(`/in-workout/${workout.id}`)
  }
  return (
    <div className="bg-[var(--light-blue)] w-[250px] h-[180px] rounded-3xl p-5">
      <h4 className='text-[25px]'>{formattedDate} - {formattedTime}</h4>
      <div>
        {firstThreeExs}
      </div>
      {isToday && <button className='bg-[var(--pink)] px-2 py-1 rounded-full text-white'
        onClick={startWorkout}>Start Workout</button>}
    </div>
  )
}
