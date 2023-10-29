import { NextRequest, NextResponse } from "next/server";
import prisma from "@/prisma/dbConnection";
import { getServerSession } from 'next-auth/next'
import { ObjectId } from "mongodb";

// Registers users that used the credentials provider
export async function GET(request: NextRequest, response: NextResponse) {
  const server = await getServerSession()
  console.log({server})


  // Parse Url for the id of the workout
  const url = new URL(request.url)
  if (url.searchParams.get('wid')) { 
    const workoutId = url.searchParams.get('wid') ?? ""
    const workout = await prisma.workouts.findUnique({
      where: {
        id: workoutId
      }
    })
    // Ensure user requesting workout is same as owner
    if (workout?.user !== server?.user?.email) {
      return NextResponse.json("User does not own this workout", {status: 401})
    }
    // Grab all exercise names
    const exnames: string[] = []
    workout?.exercises.forEach(ex => {
      exnames.push(ex.name)
    })
    const exInfoList = await prisma.exercises.findMany({
      where: {
        name: {
          in: exnames
        }
      }
    })
    // Return all muscles
    const muscles: string[] = []
    exInfoList.forEach((ex) => {
      ex.muscles.forEach(muscle => {
        if (!muscles.includes(muscle)) {
          muscles.push(muscle)
        }
      })
    })
    return NextResponse.json(muscles, {status: 200})
  } 
}

