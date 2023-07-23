import { Delete, DeleteOutline, Info, Sell } from "@mui/icons-material";
import classes from "./ExerciseDisplay.module.css"
import MuscleIcon from "../../public/icons/Muscle.png"
import BarbellsIcon from "../../public/icons/Barbells.png"

export default function ExerciseDisplay({handleClick, handleDelete, handleInfo,
                                          exname, numsets, tags, muscles, equipment}) {
  
  return (
    <div className={classes.container}
      onClick={handleClick}
      >
      <div className={classes.infoName}>
        <Info style={{"font-size": "15px"}}/>
        <h2 style={{"font-size": "18px"}}>{exname}</h2>
        <i><p style={{"font-size": "10px"}}>({numsets} sets)</p></i>
      </div>
      <div className={classes.attributesDiv}>
        <div className={classes.singleAttribute}>
          <Sell style={{"font-size": "10px"}}/>
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
      <div className={classes.dltBtn} onClick={handleDelete}>
        <DeleteOutline style={{"width": "16px"}}/>
      </div>
      
    </div>
  )
}