'use client'
import styles from "./homepage.module.css"
import dayjs from 'dayjs';
import utc from "dayjs/plugin/utc"
dayjs.extend(utc)
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation"
import {nanoid} from "nanoid"
import {Workout, WorkoutStarted} from '../../types/types'
import { useSelector, useDispatch } from "react-redux"
import { WorkoutState, setFutureWorkouts } from "@/app/GlobalRedux/Features/futureworkouts/futureworkoutsSlice";

// TODO: Remove all the extra checks for user and authready
export default function UserHomePage() {
  // Global State
  const futureWorkouts = useSelector((state: WorkoutState) => state.workouts)
  const dispatch = useDispatch()
  
  // Global variables
  const router = useRouter();
  const utc = require('dayjs/plugin/utc');
  dayjs.extend(utc);

  // Show a modal of a given workout which includes exercises
  // with weight, reps.
  // function previewWorkout(workoutIndex: number) {
  //   setModalCurrWorkout(workouts[workoutIndex]);
  //   // setCurrWorkout(props.workouts[workoutIndex]);
  //   setShowWorkout(true);
  // }

  // Displays a modal
  // function viewPastWorkout(index: number) {
  //   setModalCurrWorkout(pastWorkouts[index])
  //   setShowWorkout(true)
  // }

  // Handles closing the preview window of a workout
  // function closePreview() {
  //   // setModalCurrWorkout(null);
  //   setShowWorkout(false);
  // }
  
  // const workoutsToMap = JSON.parse(JSON.stringify(workouts))
  // if (workoutToday) {
  //   // don't show today's workout under "Upcoming"
  //   workoutsToMap.splice(0,1);
  // }

  // Map Each workout to a Workout card
  // const nextWorkouts = workoutsToMap.map((w: Workout, index: number) => {
  //   return <WorkoutCard key={nanoid()} workout={w} handlePreview={() => previewWorkout(index)}/>
  // });
  // // Map each previous workout to a PastWorkoutCard
  // const pastCards = pastWorkouts.map((w, index) => {
  //   return <WorkoutCard key={`past-workout-${index}`} color={'#D9D9D9'} workout={w} handlePreview={() => viewPastWorkout(index)}/>
  // })

  // TODO: Add implementation that will handle whether "Start Workout"
  // button should be displayed. And add the type of today's workout.
  // function startWorkout() {
  //   // Get the first workout in the props (this will be today's workout)
  //   router.push(`/in-workout/${todayData._id}`)
  // }


  return (
    <div className={styles.body}>
        {/* Display Today's Workout if there is one */}
        {/* Show upcoming workouts or message about creating them */}
        <h1>Upcoming</h1>
        {/* Show previous workouts from the past 2 weeks */}
        <h1>Completed</h1>
        {/* Display current goals and allow for adding and marking completed */}
        <h1>Goals</h1>
    </div>
  )
}

// Returns the workout progress of the given workout or null if no progress
// async function getWorkoutProgress(workout: Workout, user: any) {
//   // Convert requested data into array
//   try {
//     const date1 = dayjs.utc(workout.date).format('YYYY-MM-DD');
//     const date2 = dayjs().format('YYYY-MM-DD');
//     const workouttoday = date1 === date2
//     // Grab workout progress if started
//     if (workouttoday) {
//       const res = await fetch(`/.netlify/functions/inworkout?id=${workout._id}`, {
//         cache: "no-store",
//         headers: {
//           'Content-Type': 'application/json'
//         },
//         body: {
//           userId: 
//         }
//       })
//       const progress = await res.json()
//       return progress
//     } else {
//       return null
//     }
//   } catch(err) {
//     console.log({err})
//   }
  
// }
