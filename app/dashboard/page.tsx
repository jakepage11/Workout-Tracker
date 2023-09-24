import { getServerSession } from "next-auth"
import { options } from "../api/auth/[...nextauth]/options"
import { users } from "@prisma/client"
import prisma from "@/prisma/dbConnection"

export default async function DashboardPage() {
  const session = await getServerSession(options)
  const user = session?.user as users

  await getUpcomingWorkouts(user.email)
  return (
    <div>
      dashboard
    </div>
  )
}

// Returns an array of all upcoming workouts for the current user. If the user
// isn't logged in returns []
async function getUpcomingWorkouts(user_email: string) {
  // TODO: need to add on either localhost or prod url before /api
  const url = process.env.NODE_ENV === "development" ? process.env.DEV_URL : process.env.PROD_URL
  // Grab all the workout from the current user
  const workouts = await prisma.workouts.findMany({where: {user: user_email}})
  console.log({workouts})
}