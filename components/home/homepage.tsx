'use client'
import { Workout } from "@/types/types"
import styles from "./homepage.module.css"
import WorkoutCard from "./WorkoutCard"
import PastWorkoutCard from "./PastWorkoutCard"
import { nanoid } from "nanoid"

// TODO: Remove all the extra checks for user and authready
export default function UserHomePage({futureWorkouts, pastWorkouts}: 
    {futureWorkouts: Workout[], pastWorkouts: Workout[]}) {
  // Set the Redux Global state for these workouts

  // TODO: Set up storing of global variables
  
  // Create workout cards for each upcoming and past workout
  const futureCards = futureWorkouts.map((workout) => {
    return <WorkoutCard key={nanoid()} workout={workout}/>
  })
  const pastCards = pastWorkouts.map((workout) => {
    console.log({workout})
    return <PastWorkoutCard key={nanoid()} workout={workout}/>
  })

  return (
    <div>
      <h2>Upcoming Workouts</h2>
      <div>
        {futureCards}
      </div>
      <h2>Past Workouts</h2>
      <div className="flex gap-10">
        {pastCards}
      </div>
    </div>
  )
}

// async function getMuscles(workout: Workout) {
//   // Grab list of all exercise names
//   const exNames: string[] = []
//   workout.exercises.forEach((ex) => {
//     exNames.push(ex.name)
//   })

//   // Get all exercise info for only exercises in workout
//   const exInfoList = await prisma.exercises.findMany({where: {
//     name: {
//       in: exNames
//     }
//   }})

//   // Return list of all muscles
//   const musclesWorked: string[] = []
//   exInfoList.forEach((ex) => {
//     ex.muscles.forEach((muscle) => {
//       if (!musclesWorked.includes(muscle)) {
//         musclesWorked.push(muscle)
//       }
//     })
//   })
//   return []
// }