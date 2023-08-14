import { createPortal } from "react-dom";
import { useRef, useEffect } from "react"
import classes from "./StartWorkoutModal.module.css"
import CloseIcon from "../ui/CloseIcon"

export default function StartWorkoutModal({type, percentProgress, exName, currSet, 
                                            duration, exNumSets, handleStart, handleCancel, handleEdit}) {

  ////// Progress bar stuff ////////////////
  const progressBarRef = useRef()

  // Upon each initial render set the progress bar width
  useEffect(() => {
    // Grab num sets completed and total sets
    if (percentProgress !== undefined) {
      if (progressBarRef.current) {
        progressBarRef.current.style.width = `${percentProgress}%`
      }
    }
  }, [])

  /////////////////////////////////////////////////////////////
  // These 3 functions prevent any click events from propagating up
  function handleCancelLocal(e) {
    e.stopPropagation();
    handleCancel();
  }

  function handleStartLocal(e) {
    e.stopPropagation();
    handleStart();
  }

  function handleEditLocal(e) {
    e.stopPropagation();
    handleEdit();
  }
  ////////////////////////////////////////////////////////////

  return createPortal (
    <div>
      <div className={classes.background}></div>
      
      <div className={classes.contentContainer}>
        <CloseIcon handleClose={handleCancel} width={"30px"} color={"white"}/>
          <h2>
            {type} Workout
          </h2>
          {/* Starting for first time */}
          {percentProgress === undefined && 
            <h6 className={classes.durationHeader}>
              {duration}
            </h6>
          }
          {percentProgress !== undefined && 
            <div className={classes.workoutDataContainer}>
              <div className={classes.progressContainer}>
                {/* progress bar outline */}
                <div className={classes.barContainer}>
                  {/* bar outline */}
                  <div className={classes.barTrack}> </div>
                  {/* progress bar */}
                  <div ref={progressBarRef} className={classes.progressBar}></div>
                </div>
                  {/* percent sign */ }
                <p className={classes.progressText}>
                    {percentProgress}%
                </p>
              </div>
              <div className={classes.currEx}>
                {/* ex name and set number*/}
                <label>
                  {percentProgress !== 100 ? `${exName} - Set ${currSet} / ${exNumSets}` : "Need to Review"}
                </label>
              </div>
            </div>
          }
          <button className={classes.startBtn} 
                  onClick={(e) => handleStartLocal(e)}>
              {percentProgress !== undefined ? "Continue" : "Start"}
          </button>
          <p className={classes.cancelBtn}
              onClick={(e) => handleEditLocal(e)}>
            Edit
          </p>
      </div>
    </div>,
    document.getElementById('portal-root')
  )
}