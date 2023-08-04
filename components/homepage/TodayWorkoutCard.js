import classes from "./TodayWorkout.module.css"
import { useState } from "react";
import locationIcon from "../../public/todayWorkoutIcons/location.svg"
import peopleIcon from "../../public/todayWorkoutIcons/People.svg"
import timerIcon from "../../public/todayWorkoutIcons/Timer.svg"
import StartWorkoutModal from "./StartWorkoutModal";
import dayjs from "dayjs"

export default function TodayWorkoutCard({workout, handleStart, complete}) {
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

  return (
    <div className={classes.contentContainer}
        onClick={() => {setShowConfirm(true)}}>
      {showConfirm && /*!complete &&*/
        <StartWorkoutModal type={workout.type} 
                      duration={"55 min"}
                      percentProgress={percentComplete}
                      exName={exName}
                      currSet={setNum}
                      exNumSets={exNumSets}
                      handleStart={handleStart}
                      handleCancel={handleCloseModal}/>
      }
      <div className={classes.typeNameContainer}>
        <h3 className={classes.typeHeader}>
          {workout.type}
        </h3>
        <h4 className={classes.timeOfDayHeader}>
          {dateStr}
        </h4>
      </div>
      <div className={classes.bottomContainer}>
        {/* location */}
        <div className={classes.bottomInnerDivs}>
          <img src={locationIcon.src} alt="location" />
          <label>
            24 Hour Fitness
          </label>
        </div>
        {/* People if needed */}
        <div className={classes.bottomInnerDivs}>
           <img src={peopleIcon.src} alt="people" />
          <label>me</label>
        </div>
        {/* Estimated time */}
        <div className={classes.bottomInnerDivs}>
        <img src={timerIcon.src} alt="timer" />
          <label>55 min</label>
        </div>
      </div>
    </div>
  )
}