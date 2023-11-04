import CreateWorkoutForm from '@/components/create-workout/CreateWorkoutFrom'
import React from 'react'
import prisma from '@/prisma/dbConnection'

export default async function LogWorkout() {
  // Fetch the workout data that's needed
  const exercisesInfo = await prisma.exercises.findMany()
  return (
    <div>
      <CreateWorkoutForm exercisesInfo={exercisesInfo}/>
    </div>
  )
}
