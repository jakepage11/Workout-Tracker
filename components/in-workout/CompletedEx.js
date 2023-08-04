'use client'
import inSetClasses from "./InExSet.module.css"
import classes from "./CompletedEx.module.css"
import { useRef, useEffect, useState } from "react"
import circle1 from "../../public/feedbackUI/Group 11.png"
import circle2 from "../../public/feedbackUI/Group 12.png"
import circle3 from "../../public/feedbackUI/Group 13.png"
import circle4 from "../../public/feedbackUI/Group 14.png"
import circle5 from "../../public/feedbackUI/Group 15.png"

export default function CompletedEx({progressPerc, exname, numsets, 
                                    nextExercise, handleStartNextExercise,
                                    handleRating}) {
  const [ratings, setRatings] = useState(() => {
    return -1;
  })
  const progressBarRef = useRef();

  console.log({progressPerc})

  // Anytime the progress changes update the width of the bar
  useEffect(() => {
    if (progressBarRef.current) {
      progressBarRef.current.style.width = progressPerc
    }
  }, [progressPerc])

  function localHandleRating(rating) {
    setRatings(rating);
    handleRating(rating)
  }

  return (
    <div className={inSetClasses.background}>
      <div className={classes.contentContainer}>
        {/* Progress Bar */}
        <div className={inSetClasses.progressContainer}>
            {/* Inner will be how much is filled */}
            <div className={inSetClasses.barContainer}>
              <div ref={progressBarRef} className={inSetClasses.progressBar}></div>
              <div className={inSetClasses.progressBarTrack}></div>
            </div>
            <h6 className={inSetClasses.percentHeader}>
              {progressPerc}
            </h6>
        </div>
        {/* Header with ex and sets */}
        <div className={classes.namesetHeader}>
          <h2 className={classes.completedHeader}>
            Completed!
          </h2>
          <h2 className={classes.exnameHeader}>
            {exname}
          </h2>
          <h2>
            {numsets} sets
          </h2>
        </div>
        {/* some sort of image */}
        <div className={inSetClasses.imageContainer}>
          <img 
            src={"https://hoopshype.com/wp-content/uploads/sites/92/2022/12/USATSI_19177905.jpg"} 
            alt="image not found"
            className={inSetClasses.exerciseImage}
            />
        </div>

        {/* Difficulty rating */}
        <div className={classes.diffContainer}>
          <h2 className={classes.diffHeader}>
            Difficulty Rating
          </h2>
          {/* TODO: Add conditional style */}
          <ul className={classes.circlesContainer}>
            <img src={circle1.src} 
                alt="circle"
                className={ratings === 1 ? classes.circleSelected : classes.feedbackCircle}
                onClick={() => localHandleRating(1)}
                />
            <img src={circle2.src} 
                  alt="circle"
                  className={ratings === 2 ? classes.circleSelected : classes.feedbackCircle}
                  onClick={() => localHandleRating(2)}/>
            <img src={circle3.src} 
                  alt="circle"
                  onClick={() => localHandleRating(3)}
                  className={ratings === 3 ? classes.circleSelected : classes.feedbackCircle}/>
            <img src={circle4.src} 
                  alt="circle"
                  onClick={() => localHandleRating(4)}
                  className={ratings === 4 ? classes.circleSelected : classes.feedbackCircle}/>
            <img src={circle5.src} 
                  alt="circle"
                  onClick={() => localHandleRating(5)}
                  className={ratings === 5 ? classes.circleSelected : classes.feedbackCircle}/>
          </ul>
        </div>
        {console.log({nextExercise})}
        {/* button */}
        <div className={inSetClasses.bottomContainer}> 
          { ratings !== -1 && nextExercise !== undefined && 
          <button className="inworkout-btns"
                  onClick={handleStartNextExercise}>
            Next: {nextExercise.name}
          </button>  
          }
          {ratings !== -1 && nextExercise === undefined && 
            <button className="inworkout-btns"
                    onClick={handleStartNextExercise}>
                    Review Workout
            </button>  
          }
        </div>
      </div>
      
    </div>
  )
}