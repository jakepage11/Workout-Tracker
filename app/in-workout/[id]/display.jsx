'use client'
import BeginWorkout from "@/components/in-workout/BeginWorkout"
import { useState, useRef, useEffect, useContext } from "react"
import InExSet from "@/components/in-workout/InExSet"
import classes from "./InWorkout.module.css"
import CompletedEx from "@/components/in-workout/CompletedEx"
import EndWorkout from "@/components/in-workout/EndWorkout"
import { useRouter, useSearchParams } from "next/navigation"
import AuthContext from "@/stores/authContext"
import { StackedBarChartSharp } from "@mui/icons-material"

// TODO: workout should be the in-workout version and the regular version.
export default function InWorkoutContent({}) {
  // Grab the id query param to then get the corresponding workout
  const params = useSearchParams();
  const id = params.get('id')
  const router = useRouter();
  const {user, authReady} = useContext(AuthContext)
  const [currWorkout, setCurrWorkout] = useState(() => {return {}})
  const [currSet, setCurrSet] = useState(() => {return -1});
  const [currEx, setCurrEx] = useState(() => {return -1})
  // Whether we're in-between sets
  const [inSet, setInSet] = useState(() => {
    return true;
  })
  // Time left between sets
  const [timeLeft, setTimeLeft] = useState(() => {
    return -1;
  });
  // Whether timer between sets is running
  const [timerRunning, setTimerRunning] = useState(() => {
    return false;
  })
  // const [numSets, setNumSets] = useState(() => {
  //   // Calculate total number of sets
  //   let sets = 0;
  //   for (let i = 0; i < workout.exercises.length; i++) {
  //     sets += workout.exercises[i].reps.length
  //   }
  //   return sets
  // })
  const [initialLoad, setInitialLoad] = useState(() => {
    return true;
  })
  const [hasAccess, setHasAccess] = useState(false)
  
  // Get workout data
  useEffect(() => {
    console.log('this thing on???')
    if (authReady) {
      fetch(`/.netlify/functions/inworkout?id=${id}`, user && { 
        cache: 'no-store',
        headers: {
          Authorization: `Bearer ${user.token.access_token}`,
          'Content-Type': 'application/json'
        }
      }).then(res => res.json())
            .then(data => {
              if (data.message === undefined) { // user does have access
                setHasAccess(true);
                setCurrWorkout(data.workoutData)
                currSetProgress(data.workoutData)
                exProgress(data.workoutData)
              } else {
                setHasAccess(false);
              }
            })
    }
  }, [user, authReady, id])
  console.log({currWorkout})

  // TODO: Add some option to re-route users that didn't create this workout

  // Sets the current set
  function currSetProgress(workout) {
    if (workout.progress === undefined) {
      return -1;
    }
     // Use progress to
     let progress = workout.progress;

     // Go through each exercise and subtract its num sets from 
     // progress while keeping progress non-negative
     for (let i = 0; i < workout.exercises.length; i++) {
       const numSets = workout.exercises[i].reps.length;
       if (progress >= numSets) {
         progress -= numSets
       } else {
         return progress;
       }
     }
     setCurrSet(progress === undefined ? -1 : workout.exercises[workout.exercises.length - 1].reps.length);
  }
  // Sets the current exercise
  function exProgress(workout) {
    if (workout.progress === undefined) {
      return -1;
    }
    // Use progress to
    let progress = workout.progress;

    // Go through each exercise and subtract its num sets from 
    // progress while keeping progress non-negative
    for (let i = 0; i < workout.exercises.length; i++) {
      const numSets = workout.exercises[i].reps.length;
      if (progress >= numSets) {
        progress -= numSets
      } else {
        return i;
      }
    }
    setCurrEx(progress === undefined ? -1 : workout.exercises.length);
  }
  // Sets the number of sets completed
  function setTotalProgress(workout) {
    if (workout.progress !== undefined) setProgress(workout.progress)
  }

  // Stores the time left
  const timerId = useRef(100)

  // Handles starting the workout displaying the
  // first ex and set.
  async function handleBegin() {
    setCurrEx(0);
    setCurrSet(0);

    let startWorkoutObj = {
      ...currWorkout,
      startTime: new Date(),
      progress: 0
    }

    // Create in workout document in database
    const res = await fetch('api/in-workout/start-workout', {
      method: "POST",
      body: JSON.stringify(startWorkoutObj),
      headers: {
        "Content-Type": 'application/json'
      }
    })
  }

  // Grabs the next set of the current exercise, first of the next
  // exercise, or will display the finished workout screen.
  async function handleSetComplete() {
    console.log("complete")
    if (currWorkout.exercises[currEx].reps.length === currSet + 1) {  // finished exercise
      if (currEx + 1 === currWorkout.exercises.length) { // finished workout
        // finished the last set so calculate completeIn time
        const now = new Date();
        const completeInMillis = now - startTime;
        const completeInMins = Math.floor(completeInMillis / (1000 * 60));
    
        setCurrWorkout(prevState => ({
          ...prevState,
          completeIn: completeInMins
        }))
      } 
    } else {  // go to next set of same exercise
      startCountdown(timerId.current);
    }
    
    setInSet(false)
    setCurrSet(prevState => prevState + 1)
    setProgress(prevState => prevState + 1)
    // update progress to back-end
    await updateProgress();
  }

  // Send progress to backend
  async function updateProgress() {
    console.log("updating progress")
    const res = fetch('api/in-workout/update-progress', {
      method: 'POST',
      body: JSON.stringify({
        ...currWorkout,
        progress: progress + 1
      }),
      headers: {
        'Content-Type': 'application/json'
      }
    })
  }

  // Handles going to the next exercise or exiting the workout if there is 
  // no more exercises
  async function handleNextExercise() {
    if (currEx + 1 === currWorkout.exercises.length) {  // done with workout
      handleCompleteWorkout();
    }
    setCurrEx(prevState => prevState + 1);
    setCurrSet(0);
    setInSet(true);

    // Submit exercise feeback to db
    await updateFeedback();
  }

  // Handles what occurs after hitting the next button on the last
  // exercise's feedback screen.
  function handleCompleteWorkout() {
    // Calculate the average difficulty and time spent
    // Set these values in the workout
    let diffSum = 0;
    for (let i = 0; i < currWorkout.exercises.length; i++) {
      diffSum += currWorkout.exercises[i].difficulty;
    }
    setCurrWorkout(prevState => ({
      ...prevState,
      difficulty: Math.round(diffSum * 100 / currWorkout.exercises.length) / 100
    }))
  }

  // Display countdown as well as the sliding window
  function startCountdown() {
    // Start the time left according to how long the exercise takes (for now just do 1:30)
    setTimeLeft(90);
    setTimerRunning(true);
    timerId.current = setInterval(() => {
      // decrease timer by 1 second every second
      setTimeLeft(prevState => prevState - 1);
    }, 1000)
  }

  // Removes countdown and allows the user to perform the next set
  function stopCountdown() {
    setInSet(true);
    clearInterval(timerId.current)
    setTimeLeft(-1);
    setTimerRunning(false);
    timerId.current = 0;
  }

  // Rates the current exercise with the given level 1 - 5
  function handleRating(rating) {
    const exCopy = [...currWorkout.exercises]
    exCopy[currEx].difficulty = rating;
    setCurrWorkout(prevState => ({
      ...prevState,
      exercises: [...exCopy]
    }))
  }

  async function updateFeedback() {
    const res = await fetch('api/in-workout/update-progress', {
      method: 'POST',
      body: JSON.stringify({
        ...currWorkout,
        exIndex: currEx,
        rating: currWorkout.exercises[currEx].difficulty
      }),
      headers: {
        'Content-Type': 'application/json'
      }
    })
  }

  // Saves workout user data and exits to the home page
  async function submitWorkout() {
    const res = await fetch("/api/in-workout/finish-workout", {
      method: 'POST',
      body: JSON.stringify({...currWorkout}),
      headers: {
        'Content-Type': 'application/json'
      }
    });

    // exit to home
    router.replace("/");
  }

  // Check for whether the timer has expired
  if (timeLeft === 0) {
    stopCountdown()
  }

  // Check to see if there was feedback on the last exercise if we're on the first set
  if (currSet === 0 && currEx > 0 && currWorkout.exercises[currEx - 1].difficulty === -1) {
    setCurrEx(prevState => prevState - 1);
    setCurrSet(currWorkout.exercises[currEx - 1].reps.length);
  }

  return (
    <></>
    // <>
    //   {!hasAccess && <div>You don't have access to this workout</div>}
    //   {hasAccess && <div className={classes.backdrop}>
    //     {/* Display workout to user before beginning */}
    //     {currEx === -1  && 
    //           <BeginWorkout workout={currWorkout}
    //                     handleBegin={handleBegin}/>}
    //     {currEx !== -1 && currEx < currWorkout.exercises.length
    //                   && currSet < currWorkout.exercises[currEx].reps.length &&
    //       // Display the current exercise and set
    //       <InExSet 
    //             progressPerc={`${Math.round(progress * 100 / numSets)}%`}
    //             ex={currWorkout.exercises[currEx]}
    //             setNum={currSet}
    //             inSet={inSet}
    //             descr={exDescrs[currWorkout.exercises[currEx].name]} // Make API call to get exercise info
    //             handleSetComplete={handleSetComplete}
    //             handleStopTimer={stopCountdown}
    //             timer={timeLeft}
    //             timerRunning={timerRunning}
    //             img={"https://www.oregonlive.com/resizer/Gt7hxEHlKhuvvxLau5Pz5ZRZPvY=/arc-anglerfish-arc2-prod-advancelocal/public/XIWDL4WX5BAKRPGLU7TJIAYL24.jpeg"}/>
    //     }
    //     {/* Display the feedback / complete exercise screen */}
    //     {currEx !== -1 && currEx < currWorkout.exercises.length
    //         && currSet === currWorkout.exercises[currEx].reps.length && 
    //       <CompletedEx 
    //         progressPerc={`${Math.round(progress * 100 / numSets)}%`}
    //         exname={currWorkout.exercises[currEx].name}
    //         numsets={currWorkout.exercises[currEx].reps.length}
    //         nextExercise={currEx + 1 < currWorkout.exercises.length 
    //           ? currWorkout.exercises[currEx + 1] 
    //           : undefined}
    //         handleStartNextExercise={handleNextExercise}
    //         handleRating={handleRating}
    //       />
    //     }
    //     {/* Workout summary page */}
    //     { currEx === currWorkout.exercises.length &&  
    //       <EndWorkout workout={currWorkout}
    //                   handleCompleteWorkout={submitWorkout}/>
    //     }
    //   </div>}
      
    // </>
   
  )

}

// async function getServerSideProps(id: string) {
  
//   const mongoClient = await clientPromise;
//   // Grab exercises that are included in this workout for descriptions, videos, etc.
  
//   // Check if workout is in progress (is it in in-workout-testing collection)
//   const inWorkoutData = await mongoClient.db().collection('in-workout-testing')
//                             .findOne({"_id": new ObjectId(id)});

//   // Get workout that matches id from the URL
//   const workoutData = await mongoClient.db(process.env.MONGODB_DATABASE)
//                             .collection(String(process.env.MONGODB_COLLECTION_WORKOUTS))
//                             .findOne({"_id": new ObjectId(id)});
  
//   // Grab the in-workout version





//   // Map ex name to description
//   let descrDict: {[key: string]: string} = {}
//   exStrArr.forEach((ex: Exercise) => {
//     descrDict[ex.name] = ex.description;
//   })
  
//   return {
//       // Return the in-progress workout or the regular
//       workout: inWorkoutStr === null ? workoutStr : inWorkoutStr,
//       exDescrs: descrDict
//   }
// }