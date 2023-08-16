import { useState } from "react";
import locationIcon from "../../public/todayWorkoutIcons/location.svg"
import peopleIcon from "../../public/todayWorkoutIcons/People.svg"
import timerIcon from "../../public/todayWorkoutIcons/Timer.svg"
import StartWorkoutModal from "./StartWorkoutModal";
import dayjs from "dayjs"
import {useRouter} from "next/navigation"

export default function TodayWorkoutCard({workout, handleStart, complete}) {
  const router = useRouter();
  const [showConfirm, setShowConfirm] = useState(() => {
    return false;
  })

  function handleCloseModal() {
    setShowConfirm(prevState => !prevState);
  }

  // Extracting time of day from UTC
  const utc = require('dayjs/plugin/utc');
  dayjs.extend(utc);
  let dateStr = dayjs.utc(workout.date).format('h:mm A')

  // calculate the set and exercise number if workout is in progress
  let exName = "";
  let setNum = 0;
  let exNumSets = 0;
  let percentComplete;
  if (workout.progress !== undefined) {
    let setsCompleted = workout.progress;
    for (let i = 0; i < workout.exercises.length; i++) {
      if (workout.exercises[i].reps.length <= setsCompleted) {
        setsCompleted -= workout.exercises[i].reps.length;
      } else {
        exName = workout.exercises[i].name;
        exNumSets = workout.exercises[i].reps.length;
        break;
      }
    }
    
    setNum = setsCompleted + 1;
    percentComplete = percentProgress();
  }

  // Finds percent of workout completed (only call when workout.progress is defined)
  function percentProgress() {
    let totalSets = 0;
    for (let i = 0; i < workout.exercises.length; i++) {
      totalSets += workout.exercises[i].reps.length;
    }
    return Math.round(workout.progress * 100 / totalSets)
  }

  // Set the URL to the Edit Workout page of this given workout
  function handleEditWorkout() {
    router.push(`/edit-workout/${workout._id}`)
  }

  return (
    <div className='bg-[#141349] text-white h-[175px] md:w-[300px] sm:w-[200px] rounded-2xl relative px-5 hover:scale-110 cursor-pointer'
        onClick={() => {setShowConfirm(true)}}>
      {showConfirm && /*!complete &&*/
        <StartWorkoutModal type={workout.type} 
                      duration={"55 min"}
                      percentProgress={percentComplete}
                      exName={exName}
                      currSet={setNum}
                      exNumSets={exNumSets}
                      handleStart={handleStart}
                      handleCancel={handleCloseModal}
                      handleEdit={handleEditWorkout}/>
      }
      {/* Workout type and time */}
      <div className="flex justify-between items-baseline py-7">
        <h3 className="text-5xl">
          {workout.type}
        </h3>
        <h4 className="text-2xl">
          {dateStr}
        </h4>
      </div>
      {/* Location, users, and time */}
      <div className="flex gap-6 align-baseline absolute bottom-4">
        {/* location */}
        <div className="flex gap-1 items-center">
          <img src={locationIcon.src} alt="location" />
          <label>
            location
          </label>
        </div>
        {/* People if needed */}
        <div className="flex gap-1 items-center">
           <img src={peopleIcon.src} alt="people" />
          <label>me</label>
        </div>
        {/* Estimated time */}
        <div className="flex gap-1 items-center">
        <img src={timerIcon.src} alt="timer" />
          <label>-1 min</label>
        </div>
      </div>
    </div>
  )
}