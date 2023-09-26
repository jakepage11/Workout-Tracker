import { Delete, DeleteOutline, Info, Sell } from "@mui/icons-material";
import classes from "./ExerciseDisplay.module.css"
import MuscleIcon from "../../public/icons/Muscle.png"
import BarbellsIcon from "../../public/icons/Barbells.png"
import { Exercise, ExerciseInfo } from "@/types/types";
import { MouseEvent } from "react"

export default function ExerciseDisplay({handleClick, handleDelete, exinfo, exercise}: 
  {handleClick: Function, handleDelete: Function,
    exinfo: ExerciseInfo|undefined, exercise: Exercise}) {
  
  // TODO: Map Tags, muscles, and equipment into their own strings
  const muscles = exinfo?.muscles.join(" ")
  const equipment = exinfo?.equipment.join(" ")
  const tags = exinfo?.tags.join(" ")

  function localDelete(e: MouseEvent) {
    e.preventDefault();
    e.stopPropagation();
    handleDelete();
  }
  return (
    <div className={classes.container}
      onClick={() => handleClick()}
      >
      <div className={classes.infoName}>
        <Info style={{"fontSize": "15px"}}/>
        <h2 style={{"fontSize": "18px"}}>{exercise.name}</h2>
        <i><p style={{"fontSize": "10px"}}>({exercise.reps.length} sets)</p></i>
      </div>
      <div className={classes.attributesDiv}>
        <div className={classes.singleAttribute}>
          <Sell style={{"fontSize": "10px"}}/>
          {tags}
        </div>
        {/* muscles */}
        <div className={classes.singleAttribute}>
          <img src={MuscleIcon.src} style={{"width": "10px"}}/>
          {muscles}
        </div>
        {/* equipmment */}
        <div className={classes.singleAttribute}>
          <img src={BarbellsIcon.src} style={{"width": "10px"}}/>
          {equipment}
        </div>
      </div>
      {/* delete */}
      <div className={classes.dltBtn} onClick={(e) => localDelete(e)}>
        <DeleteOutline style={{"width": "16px"}}/>
      </div>
      
    </div>
  )
}