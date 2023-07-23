import { createPortal } from "react-dom"
import classes from "./ViewWorkout.module.css"
import CloseIcon from '@mui/icons-material/Close';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import {nanoid} from "nanoid"
import {useRef, useState} from "react"
import { useRouter } from "next/router";
import dayjs from "dayjs"

export default function ViewWorkout({workoutProp, handleClose}) {
  const [workout, setWorkout] = useState(() => {
    return JSON.parse(JSON.stringify(workoutProp));
  });

  const [showSets, setShowSets] = useState(() => {
    let setsArr = [];
    for (let i = 0; i < workoutProp.exercises.length; i++) {
      setsArr.push(false);
    }
    return setsArr;
  })

  const router = useRouter();

  function handleEditWorkout() {
    // Handle closing the view modal
    handleClose();
  
    // Push the new Edit Workout page with the given workout
    router.push({
     pathname: "/edit-workout",
     query: {workoutId: workoutProp._id}
    });
  }

  // Expand or collapse specific exercise to either show or
  // hide exercise info
  function handleExpandCollapse(index) {
    setShowSets(prevState => {
      let setCopy = [...prevState]
      setCopy[index] = !setCopy[index];
      return [...setCopy];
    })
  }

  const exComps = workout.exercises.map((ex, index) => {
    return (
    <div key={nanoid()} className={classes.exContainer}>
      <div className={classes.exheader}>
        <div className={classes.setArrow}
              onClick={() => handleExpandCollapse(index)}>
          {showSets[index] && <ExpandMoreIcon />}
          {!showSets[index] && <ExpandLessIcon />}
        </div>
        <h4>{ex.name}</h4>
      </div>
      {/* Do another mapping to create each set */}
      {showSets[index] && <div className={classes.setsContainer}>
        {ex.reps.map((rep, index2) => {
          return <div className={classes.exerciseData}
                      key={nanoid()}>
              <p className={classes.reps}>{rep}</p>
              <p>reps</p>
              <p className={classes.load}>{ex.load[index2]}</p>
              <p>lbs</p>
            </div>
          
        })}
      </div>}
    </div>
    )
  });

  const utc = require('dayjs/plugin/utc')
  dayjs.extend(utc);
  const date = dayjs.utc(workoutProp.date).format('M-DD') 

  return createPortal (
    <> 
      <div className={classes.overlay}> </div>
      <div className={classes.container}>
        <h2 className={classes.title}>{workoutProp.type} {date}</h2>
        <div className={classes.workoutContainer}>
          {exComps}
        </div>
        <div className={classes.closeBtn} onClick={handleClose}>
          <CloseIcon style={{fontSize: "40px"}}/>
        </div>
        <button className={classes.editBtn}
                onClick={handleEditWorkout}>Edit</button>
      </div>
      
    </>, 
    document.getElementById("portal-root")
  )
}