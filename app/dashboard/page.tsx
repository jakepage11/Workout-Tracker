import { getServerSession } from "next-auth"
import { options } from "../api/auth/[...nextauth]/options"

export default async function HomePage() {
  const session = await getServerSession(options)
  const user = session?.user
  // await getUpcomingWorkouts((user as {id: string})?.id )
  return (
    <div>
      hi
    </div>
  )
}

// Returns an array of all upcoming workouts for the current user. If the user
// isn't logged in returns []
async function getUpcomingWorkouts(userId: string) {
  try { 
    if (!userId) {
      return []
    }
    const res = await fetch(`/.netlify/functions/futureworkouts?id=${userId}`, {
      cache: 'no-store',
      headers: {
        'Content-Type': 'application/json',
      }
    });
    const plannedWorkouts = await res.json();
    console.log({plannedWorkouts})
    return plannedWorkouts
  } catch (err) {
    console.log({err})
    return []
  }
}