import StartWorkout from '@/components/start-workout/start-workout'
import React from 'react'
import prisma from '@/prisma/dbConnection'
import { getServerSession } from "next-auth"

export default async function StartWorkoutPage() {
  const session = await getServerSession()
  const user = session?.user?.email as string
  const exercises = await prisma.exercises.findMany({where: {
    OR: [
      {creator_uid: user},
      {creator_uid: "" }
    ]
    
  }})
  return (
    <div>
      <StartWorkout exOptions={exercises}/>
    </div>
  )
}
