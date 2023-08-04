'use client'
import { useEffect, useRef, useState} from "react";
import classes from "./InExSet.module.css";
import SliderOverlay from "./SliderOverlay";

export default function InExSet({progressPerc, ex, setNum, descr, img, handleSetComplete, 
                                timer, timerRunning, handleStopTimer}) {
  const [showConfirmBtns, setShowConfirmBtns] = useState(() => {
    return false;
  })

  const progressBarRef = useRef()

  // Anytime the progress changes update the width of the bar
  useEffect(() => {
    if (progressBarRef.current) {
      progressBarRef.current.style.width = progressPerc;
    }
  }, [progressPerc])

  // Calculate the percentage of time left
  return (
    <div className={classes.background}>
        <div className={classes.contentContainer}>
          {timer !== -1 && <div><SliderOverlay timeLeft={timer} totalTime={100}/></div> }
          {/* Have this one be the outline */}
          <div className={classes.progressContainer}>
            {/* Inner will be how much is filled */}
            <div className={classes.barContainer}>
              <div ref={progressBarRef} className={classes.progressBar}></div>
              <div className={classes.progressBarTrack}></div>
            </div>
            <h6 className={classes.percentHeader}>
              {progressPerc}
            </h6>
          </div>
          {/* Name and set */}
          <div className={classes.nameSetHeader}>
            <h5>{ex.name}</h5>
            <h5>Set {setNum + 1} / {ex.reps.length} </h5>
          </div>
          {/* Image */}
          <div className={classes.imageContainer}>
            <img 
              src={img} alt="image not found"
              className={classes.exerciseImage}
              />
          </div>
          {/* load and reps */}
          <div className={classes.repsAndLoad}>
            <h2 className={classes.loadHeader}>
              {ex.load[setNum]} lbs
            </h2>
            <h2 className={classes.repsHeader}>
              {ex.reps[setNum]} reps
            </h2>
          </div>
          <div className={classes.exDescription}>
            <i>{descr !== undefined ? descr : "Exercise if fun!"}</i>
          </div>
          {timer === -1 && 
            <div className={classes.bottomContainer}>
              <button className="inworkout-btns"
                      onClick={handleSetComplete}>
                Set Completed!
              </button>
            </div>
          }
          {timer !== -1 &&
            <div className={classes.bottomContainer}>
              <p className={classes.timerHeader}>
                {timer}
              </p>
              <p className={classes.nextUpHeader}> 
                Next up: {ex.load[setNum]} lbs for {ex.reps[setNum]}
              </p>
              {timerRunning && !showConfirmBtns && 
                  <button className="inworkout-btns"
                      onClick={() => {setShowConfirmBtns(true)}}>
                        {/* TODO: Add a confirmation modal */}
                    Cancel Timer
                  </button> 
              }
              {timerRunning && showConfirmBtns && 
                <div className={classes.confirmBtnContainer}>
                  <button className={classes.cancelBtn} 
                          onClick={handleStopTimer}>
                    Cancel
                  </button>
                  <button className={classes.continueBtn}
                          onClick={() => setShowConfirmBtns(false)}>
                    Continue
                  </button>
                </div>
              }
            </div>
          }
          
        </div>
    </div>
    
  )
}