import { useState } from "react"
import classes from "./PastWorkoutCard.module.css"
import timerIcon from "../../public/todayWorkoutIcons/TimerB.svg"
import diffIcon from "../../public/todayWorkoutIcons/Strength.png"
import FitnessCenterIcon from '@mui/icons-material/FitnessCenter';
import InfoIcon from '@mui/icons-material/Info';
import dayjs from "dayjs"
import { FitnessCenter, Info } from "@mui/icons-material";

export default function PastWorkoutCard({workout}) {
  // Whether to show muscles worked info (side info)
  const [showInfo, setShowInfo] = useState(() => {
    return false;
  })

  const todayDate = dayjs().startOf('day');
  const workoutDate = dayjs(workout.date);
  const daysAgo = todayDate.diff(workoutDate, 'day');

  return (
    <div className={classes.container}>
      {/* info icon and # days ago */}
      <div className={classes.infoDaysContainer}>
        <div className={classes.infoIcon}>
         <Info />
        </div>
        { daysAgo === 0 && <h2>Today</h2>}
        { daysAgo === 1 && <h2>Yesterday</h2>}
        { daysAgo > 1 && <h2>{daysAgo} days ago</h2>}
      </div>
      {/* type, icon, and difficulty */}
      <div className={classes.typeDiffContainer}>
        <h3 className={classes.typeHeader}>
          {workout.type}
        </h3>
        <div className={classes.diffContainer}>
          <FitnessCenter />
          <div className={classes.diffText}>
            <h4 className={classes.diffHeader}>
              {workout.difficulty}
            </h4>
            <p>
              /5
            </p>
          </div>
        </div>
      </div>
      {/* time */}
      <div className={classes.timeContainer}>
        <img src={timerIcon.src} alt="timer"
            className={classes.timeImg}/>
        <h3 className={classes.timeText}>
          {workout.completeIn} min
        </h3>
      </div>
    </div>
  )
}