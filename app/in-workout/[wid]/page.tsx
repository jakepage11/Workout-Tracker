// import AuthContext from '@/stores/authContext'
// import {useState, useContext, useEffect} from 'react'
// import InWorkoutContent from "./display"
// TODO: workout should be the in-workout version and the regular version.
import { getServerSession } from "next-auth"
import prisma from "@/prisma/dbConnection"
import InWorkout from "@/components/in-workout/InWorkout"
import styles from "./InWorkout.module.css"
const WID_LENGTH = 24

export default async function InWorkoutPage({params}: {params: {wid: string}}) {
  const session = await getServerSession()
  const email = session?.user?.email
  const wid = params.wid
  const exercisesInfo = await prisma.exercises.findMany()
  let workout = undefined

  const isHexadecimal = (str: string) => {
    const hexRegex = /^[0-9a-fA-F]+$/;
    return hexRegex.test(str);
  }

  // Only fetches workout for valid wid
  if (isHexadecimal(wid) && wid.length === WID_LENGTH) {
     workout = await prisma.workouts.findFirst({where: {
        id: wid
      }}) ?? undefined
  }
  const userHasAccess = workout?.user === email

  return (
    <div className={styles.background}>
      {/* Has Access */}
       {userHasAccess && <div className={styles.content}>
        <InWorkout workout={workout} exInfo={exercisesInfo}/>
      </div>}
       {workout && !userHasAccess && <div>You don't have access to this workout</div>}
       {!workout && <div>Workout doesn't exist</div>}
    </div>
  )
}
