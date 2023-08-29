'use client'
// import WorkoutCard from "@/components/homepage/WorkoutCard"
import styles from "./homepage.module.css"
import dayjs from 'dayjs';
import utc from "dayjs/plugin/utc"
dayjs.extend(utc)
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation"
import {nanoid} from "nanoid"
// import ViewWorkout from "@/components/homepage/ViewWorkout"
// import TodayWorkoutCard from "@/components/homepage/TodayWorkoutCard"
// import { CheckCircle } from "@mui/icons-material";
import { ObjectId } from "mongodb";
import { type } from "os";

type Workout = {
  _id: ObjectId,
  user: string,
  exercise: Array<Object>,
  difficulty: number,
  date: Date,
  completeIn: number,
}
type WorkoutStarted = {
  _id: ObjectId,
  user: string,
  exercise: Array<Object>,
  difficulty: number,
  date: Date,
  completeIn: number,
  progress: number,
  startTime: Date,
}

// TODO: Remove all the extra checks for user and authready
export default function UserHomePage() {
  // Global variables
  const router = useRouter();
  const utc = require('dayjs/plugin/utc');
  dayjs.extend(utc);

  const [workoutToday, setWorkoutToday] = useState(null);


  const [showWorkout, setShowWorkout] = useState(() => {return false});
  // currWorkout: Index of the workout that is being displayed in the modal
  const [modalCurrWorkout, setModalCurrWorkout] = useState(() => {return {}});
  const [workouts, setWorkouts] = useState([])
  const [pastWorkouts, setPastWorkouts] = useState([])
  // Stores today's workout: inworkout version if it's already been started or regular if not
  const [todayData, setTodayData] = useState({})
  const [user, setUser] = useState(null)
  const [authReady, setAuthReady] = useState(false)

  // Grab all upcoming workouts
  // useEffect(() => {
    
  // }, [user, authReady])

  // TODO: Grab past workouts
  // useEffect(() => {
  //   console.log({user})
  //   try {
  //     const getPastWorkouts = async () => {
  //       let pastworkouts = []
  //       const res = await fetch('/.netlify/functions/pastworkouts', user && {
  //         cache: 'no-store',
  //         headers: {
  //           Authorization: `Bearer ${user.token.access_token}`
  //         }
  //       });
  //       // Assign pastworkouts if request was allowed
  //       if (res.ok) {
  //         pastworkouts = await res.json();
  //       }
  //       setPastWorkouts(pastworkouts);
  //     }
  //     getPastWorkouts();
  //   } catch(err) {
  //     console.log({err});
  //     setPastWorkouts([]);
  //   }
  // }, [user, authReady])


  // Show a modal of a given workout which includes exercises
  // with weight, reps.
  function previewWorkout(workoutIndex: number) {
    setModalCurrWorkout(workouts[workoutIndex]);
    // setCurrWorkout(props.workouts[workoutIndex]);
    setShowWorkout(true);
  }

  // Displays a modal
  function viewPastWorkout(index: number) {
    setModalCurrWorkout(pastWorkouts[index])
    setShowWorkout(true)
  }

  // Handles closing the preview window of a workout
  function closePreview() {
    // setModalCurrWorkout(null);
    setShowWorkout(false);
  }
  
  const workoutsToMap = JSON.parse(JSON.stringify(workouts))
  if (workoutToday) {
    // don't show today's workout under "Upcoming"
    workoutsToMap.splice(0,1);
  }

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
        { workoutToday &&
          <div>
            <h1>Today's Workout</h1>
          </div>
        }
        {/* Show upcoming workouts or message about creating them */}
        <h1>Upcoming</h1>
        {/* Show previous workouts from the past 2 weeks */}
        <h1>Completed</h1>
        {/* Display current goals and allow for adding and marking completed */}
        <h1>Goals</h1>
    </div>
  )
}

// Returns an array of all upcoming workouts for the current user. If the user
// isn't logged in returns []
async function getUpcomingWorkouts(user: any, authReady: any) {
  if (!user || !authReady) {
    return []
  }
  try { 
    const res = await fetch('/.netlify/functions/futureworkouts', user && {
      cache: 'no-store',
      headers: {
        Authorization: `Bearer ${user.token.access_token}`
      }
    });
    const plannedWorkouts = await res.json();
    return plannedWorkouts
  } catch (err) {
    console.log({err})
  }
}

// Returns the workout progress of the given workout or null if no progress
async function getWorkoutProgress(workout: Workout, user: any) {
  // Convert requested data into array
  try {
    const date1 = dayjs.utc(workout.date).format('YYYY-MM-DD');
    const date2 = dayjs().format('YYYY-MM-DD');
    const workouttoday = date1 === date2
    // Grab workout progress if started
    if (workouttoday) {
      const res = await fetch(`/.netlify/functions/inworkout?id=${workout._id}`, {
        cache: "no-store",
        headers: {
          Authorization: `Bearer ${user.token.access_token}`
        }
      })
      const progress = await res.json()
      return progress
    } else {
      return null
    }
  } catch(err) {
    console.log({err})
  }
  
}
