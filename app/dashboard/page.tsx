import { getServerSession } from "next-auth"
import { options } from "../api/auth/[...nextauth]/options"
import { users } from "@prisma/client"
import prisma from "@/prisma/dbConnection"
import dayjs from "dayjs"
import UserHomePage from "@/components/home/homepage"
import { Workout } from "@/types/types"

export default async function DashboardPage() {
  const session = await getServerSession(options)
  const user = session?.user as users

  const futureWorkouts = await getUpcomingWorkouts(user.email)
  const pastWorkouts = await getPastWorkouts(user.email)
  return (
    <div>
      <UserHomePage futureWorkouts={futureWorkouts} pastWorkouts={pastWorkouts}/>
    </div>
  )
}

// Returns an array of all upcoming workouts for the current user. If the user
// isn't logged in returns []
async function getUpcomingWorkouts(user_email: string) {
  const url = process.env.NODE_ENV === "development" ? process.env.DEV_URL : process.env.PROD_URL
  // Set date range from today until 2 weeks into the future
  const todayDate = dayjs()
  const twoWeeksDate = todayDate.add(2, 'week')
  // Grab all upcoming workouts
  const workouts = await prisma.workouts.findMany({
    where: {
      user: user_email,
      date: {
        gte: todayDate.toDate(),
        lte: twoWeeksDate.toDate(),
      }
    }
  })
  return workouts
}

async function getPastWorkouts(user_email: string) {
  const url = process.env.NODE_ENV === "development" ? process.env.DEV_URL : process.env.PROD_URL
  // Set date range from today until 2 weeks into the future
  const todayDate = dayjs()
  const twoWeeksAgo = todayDate.subtract(2, 'week')
  // Grab all upcoming workouts
  const workouts = await prisma.workouts.findMany({
    where: {
      user: user_email,
      date: {
        lte: todayDate.toDate(),
        gte: twoWeeksAgo.toDate(),
      }
    }
  })
  return workouts
}