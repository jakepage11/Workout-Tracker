import classes from "./WorkoutCard.module.css";
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
      {/* People & Time  */}
      <div className="flex items-baseline gap-6 absolute bottom-4 px-4">
        {/* People if needed */}
        <div className="flex gap-1">
           <img src={peopleIcon.src} alt="people" />
          <label>me</label>
        </div>
        {/* Estimated time */}
        <div className="flex gap-1">
          <img src={timerIcon.src} alt="timer" className={classes.icons}/>
          <label>55 min</label>
        </div>
      </div>
    </div>
  )
}




