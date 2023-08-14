import classes from "./WorkoutCard.module.css";
import todayClasses from "./TodayWorkout.module.css"
import * as dayjs from "dayjs";
import peopleIcon from "../../public/todayWorkoutIcons/PeopleB.svg"
import timerIcon from "../../public/todayWorkoutIcons/TimerB.svg"
import { useState } from "react"
import { nanoid } from "nanoid"

// Home page component that displays short info about upcoming workouts
export default function WorkoutCard({workout, handlePreview, color}) {
  const dayJsDate = dayjs.utc(workout.date);
  const formatDate = dayJsDate.format('M-DD');
  const firstThree = [...workout.exercises].splice(0, 3);
  
  return (
    <div className={classes.card} onClick={handlePreview} style={{backgroundColor: color}}>
      {/* Type and date */}
      <div className={classes.typeDateBox}>
        <h3 className={classes.typeHeader}>
          {workout.type}
        </h3>
        <h3 className={classes.dateHeader}>
          {formatDate}
        </h3>
      </div>
      {/* First 3 exercises */}
      <div className={classes.exercises}>
        {firstThree.map((ex) => {return <h4 key={nanoid()}>{ex.name}</h4>})}
      </div>
      <div className={todayClasses.bottomContainer}>
        {/* People if needed */}
        <div className={todayClasses.bottomInnerDivs}>
           <img src={peopleIcon.src} alt="people" />
          <label>me</label>
        </div>
        {/* Estimated time */}
        <div className={todayClasses.bottomInnerDivs}>
        <img src={timerIcon.src} alt="timer" className={classes.icons}/>
          <label>55 min</label>
        </div>
      </div>
      
    </div>
  )
}




