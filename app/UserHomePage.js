'use client'
import WorkoutCard from "@/components/homepage/WorkoutCard"
import classes from "../styles/homepage.module.css"
import * as dayjs from 'dayjs';
import { useContext, useEffect, useState } from "react";
import { useRouter } from "next/navigation"
import {nanoid} from "nanoid"
import ViewWorkout from "@/components/homepage/ViewWorkout"
import TodayWorkoutCard from "@/components/homepage/TodayWorkoutCard"
import PastWorkoutCard from "@/components/homepage/PastWorkoutCard"
import { CheckCircle } from "@mui/icons-material";
import AuthContext from "@/stores/authContext";
// TODO: Remove all the extra checks for user and authready
export default function UserHomePage() {
  // Global variables
  const router = useRouter();
  const utc = require('dayjs/plugin/utc');
  dayjs.extend(utc);
  const {user, authReady } = useContext(AuthContext)

  const [showWorkout, setShowWorkout] = useState(() => {return false});
  // currWorkout: Index of the workout that is being displayed in the modal
  const [modalCurrWorkout, setModalCurrWorkout] = useState(() => {return {}});
  const [workoutToday, setWorkoutToday] = useState(() => {return false})
  const [workouts, setWorkouts] = useState([])
  const [pastWorkouts, setPastWorkouts] = useState([])
  // Stores today's workout: inworkout version if it's already been started or regular if not
  const [todayData, setTodayData] = useState({})

  // Grab all upcoming workouts
  useEffect(() => {
    try {
      if (authReady && user) {
        const getPlannedWorkouts = async() => {
          const res = await fetch('/.netlify/functions/futureworkouts', user && {
            cache: 'no-store',
            headers: {
              Authorization: `Bearer ${user.token.access_token}`
            }
          });
          // TODO: Later change the [] to null and give different content to user
          if (!res.ok) {
            return [];
          }
          return await res.json();
        }
        const plannedWorkouts = getPlannedWorkouts();

        // Convert requested data into array
        if (plannedWorkouts.length === 0) {
          setWorkoutToday(false)
        } else {
          const date1 = dayjs.utc(plannedWorkouts[0].date).format('YYYY-MM-DD');
          const date2 = dayjs().format('YYYY-MM-DD');
          const isToday = plannedWorkouts.length > 0 && date1 === date2
          setWorkoutToday(isToday) 
          // Grab workout progress if started
          if (isToday) {
            fetch(`/.netlify/functions/inworkout?id=${plannedWorkouts[0]._id}`, {
              cache: "no-store",
              headers: {
                Authorization: `Bearer ${user.token.access_token}`
              }
            }).then(res => res.json()).then(data2 => {
              setTodayData(data2.workoutData)})
          } 
        }
        setWorkouts(plannedWorkouts)
      }
      setWorkouts([])
      setWorkoutToday(false)
    } catch (err) {
      console.log(err)
    }
  }, [user, authReady])

  // TODO: Grab past workouts
  useEffect(() => {
    if (authReady && user) {
      fetch('/.netlify/functions/pastworkouts', user && {
        cache: 'no-store',
        headers: {
          Authorization: `Bearer ${user.token.access_token}`
        }
      }).then(res => res.json()).then(data => {
        console.log({data})
        setPastWorkouts(data)
      })
    } else {
      setPastWorkouts([])
    }
  }, [user, authReady])

  async function doNothing() {
    return;
  }

  // Show a modal of a given workout which includes exercises
  // with weight, reps.
  function previewWorkout(workoutIndex) {
    setModalCurrWorkout(workouts[workoutIndex]);
    // setCurrWorkout(props.workouts[workoutIndex]);
    setShowWorkout(true);
  }

  // Displays a modal
  function viewPastWorkout(index) {
    setModalCurrWorkout(pastWorkouts[index])
    setShowWorkout(true)
  }

  // Handles closing the preview window of a workout
  function closePreview() {
    setModalCurrWorkout(null);
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
  // Map each previous workout to a PastWorkoutCard
  const pastCards = pastWorkouts.map((w, index) => {
    return <WorkoutCard key={`past-workout-${index}`} color={'#D9D9D9'} workout={w} handlePreview={() => viewPastWorkout(index)}/>
  })

  // TODO: Add implementation that will handle whether "Start Workout"
  // button should be displayed. And add the type of today's workout.
  function startWorkout() {
    // Get the first workout in the props (this will be today's workout)
    router.push(`/in-workout/${todayData._id}`)
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
                  <div>
                    <CheckCircle style={{"color": "green", "font-size": "40px"}}/>
                    </div>
                }
              </div>
              {workouts[0].completeIn === "" && 
                <TodayWorkoutCard workout={todayData}
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
          <ViewWorkout workoutProp={modalCurrWorkout}
                      handleClose={closePreview}/>
        }
    </div>
  )
}