import { getServerSession } from "next-auth"
import { options } from "../api/auth/[...nextauth]/options"

export default async function HomePage() {
  const session = await getServerSession(options)
  const user = session?.user
  await getUpcomingWorkouts()
  return (
    <div>
      dashboard
    </div>
  )
}

// Returns an array of all upcoming workouts for the current user. If the user
// isn't logged in returns []
async function getUpcomingWorkouts() {
  // TODO: need to add on either localhost or prod url before /api
  const url = process.env.NODE_ENV === "development" ? process.env.DEV_URL : process.env.PROD_URL
  const res = await fetch(`${url}/api/getUpcomingWorkouts`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
}