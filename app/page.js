'use client'
import WorkoutCard from "@/components/homepage/WorkoutCard"
import classes from "../styles/homepage.module.css"
// import clientPromise from "@/lib/mongodb"
import * as dayjs from 'dayjs';
import { useContext, useEffect, useState } from "react";
import { useRouter } from "next/navigation"
import {nanoid} from "nanoid"
import ViewWorkout from "@/components/homepage/ViewWorkout"
import TodayWorkoutCard from "@/components/homepage/TodayWorkoutCard"
import PastWorkoutCard from "@/components/homepage/PastWorkoutCard"
import { CheckCircle } from "@mui/icons-material";
import AuthContext from "@/stores/authContext";

export default function HomePage() {
  
  // Global variables
  const router = useRouter();
  const utc = require('dayjs/plugin/utc');
  dayjs.extend(utc);
  const {user, authReady } = useContext(AuthContext)
  // State
  const [showWorkout, setShowWorkout] = useState(() => {return false});
  const [currWorkout, setCurrWorkout] = useState(() => {return {}});
  const [workoutToday, setWorkoutToday] = useState(false)
  const [workouts, setWorkouts] = useState([])
  const [pastWorkouts, setPastWorkouts] = useState([])
  const [progressWorkout, setProgressWorkout] = useState()

  // Grab all upcoming workouts
  useEffect(() => {
    if (authReady) {
      let plannedWorkouts
      console.log(user)
      fetch('./.netlify/functions/futureworkouts', user && {
          cache: 'no-store',
          headers: {
            Authorization: `Bearer ${user.token.access_token}`
          }
        }).then(res => res.json()).then(data => {
          if (user) {
            console.log(data)
            plannedWorkouts = JSON.parse(JSON.stringify(data));
            // Find if there's a workout today to display
            if (plannedWorkouts.length === 0) {
              setWorkoutToday(false)
            } else {
              const date1 = dayjs.utc(plannedWorkouts[0].date).format('YYYY-MM-DD');
              const date2 = dayjs().format('YYYY-MM-DD');
              console.log(date1)
              console.log(date2)
              const isToday = workouts.length > 0 && date1 === date2
              setWorkoutToday(isToday) 
              // if workout is in progress grab in-workout version
              // if (isToday) {
              //   const mongoClient = await clientPromise
              //   const workout = await mongoClient.db(MONGODB_DATABASE).collection(MONGO_COLLECTION_INWORKOUT).findOne({_id: wid});
              //   setProgressWorkout(workout)
              // } 
            }
            setWorkouts(plannedWorkouts)
          }
        })
      } 
  }, [user, authReady])
  console.log(workouts)
  console.log(workoutToday)

  // TODO: Grab past workouts
  useEffect(() => {
    if (authReady) {
      fetch('./.netlify/functions/pastworkouts', user && {
        cache: 'no-store',
        headers: {
          Authorization: `Bearer ${user.token.access_token}`
        }
      }).then(res => res.json()).then(data => {
        console.log(data)
        const past = JSON.parse(JSON.stringify(data));
        // setPastWorkouts(past)
      })
    } 
  }, [user, authReady])

  // Show a modal of a given workout which includes exercises
  // with weight, reps.
  function previewWorkout(workoutIndex) {
    setCurrWorkout(workoutIndex);
    // setCurrWorkout(props.workouts[workoutIndex]);
    setShowWorkout(true);
  }

  // Handles closing the preview window of a workout
  function closePreview() {
    setCurrWorkout({});
    setShowWorkout(false);
  }

  const workoutsToMap = JSON.parse(JSON.stringify(workouts))
  if (workoutToday) {
    // don't show today's workout under "Upcoming"
    workoutsToMap.splice(0,1);
  }

  // Map Each workout to a Workout card
  const nextWorkouts = workoutsToMap.map((w, index) => {
    return <WorkoutCard key={nanoid()} workout={w} handlePreview={() => previewWorkout(index)}/>
  });
  console.log({pastWorkouts})
  // Map each previous workout to a PastWorkoutCard
  const pastCards = pastWorkouts.map((w, index) => {
    return <PastWorkoutCard key={`past-workout-${index}`} workout={w}/>
  })
  

  // TODO: Add implementation that will handle whether "Start Workout"
  // button should be displayed. And add the type of today's workout.
  function startWorkout() {
    // Get the first workout in the props (this will be today's workout)
    console.log("starting workout")
    router.push({
      pathname: "/in-workout",
      query: {workoutId: workouts[0]._id}
     });
  }
  
  return (
    <div className={classes.body}>
        <div className={classes.nextWorkoutContainer}>
          {workoutToday && 
            <div>
              <div style={{"display": "flex", 'alignItems': "center", 'gap': "10px"}}>
                {/* if workout has already been completed */}
                
                <h1 className={classes.headers}>
                  {"Today's Workout"}
                </h1>
                {workouts[0].completeIn !== "" &&
                    <CheckCircle style={{"color": "green", "font-size": "40px"}}/>
                }
              </div>
              {workouts[0].completeIn === "" && 
              <TodayWorkoutCard workout={todayInProgress !== null ? todayInProgress : workouts[0]}
                              handleStart={startWorkout} complete={workouts[0].completeIn !== ""}/>}
            </div>
          }
          {!workoutToday && workouts.length !== 0 && 
              <label className={classes.nextWorkoutHeader}>
                Next Workout {new Date(workouts[0].date).toUTCString().substring(0,16)}
              </label>
          }
          {!workoutToday && workouts.length === 0 && 
              <label className={classes.nextWorkoutHeader}>
                No workouts scheduled
              </label>
          }
        </div>
        <h1 className={classes.headers}>
          Upcoming
        </h1>
        {/* no schedule workouts */}
        {workouts.length === 0 && 
          <h6 className={classes.emptyUpcoming}>
            No workouts scheduled
          </h6>
        }
        <div className={classes.cards}>
          {nextWorkouts}
        </div>
        <div className={classes.goals}>
          <h1 className={classes.headers}>
            Current Goals
          </h1>
          {/* <GoalCard rules={["Gains"]}/> */}
        </div>
        <div>
          <h1 className={classes.headers}>
            Past Workouts
          </h1>
          <div className={classes.pastWorkoutsContainer}>
            {pastCards}
          </div>
        </div>
        {showWorkout && 
          <ViewWorkout workoutProp={workouts[currWorkout]}
                      handleClose={() => {setShowWorkout(false)}}/>
        }
        
    </div>
  )
}

// export async function getServerSideProps() {
 
  // Check if there is a planned workout and if it is today
  // if (data.length > 0) {
  //   const firstWorkoutDate = dayjs.utc(JSON.parse(JSON.stringify(data))[0].date)
  //   if (todayDateLocal === firstWorkoutDate) {
  //     const wid = new ObjectId(JSON.parse(JSON.stringify(data))[0]._id)
  //     inProgressWorkout = await mongoClient.db().collection('in-workout-testing')
  //                           .findOne({_id: wid});
  //   }
  // }

// }