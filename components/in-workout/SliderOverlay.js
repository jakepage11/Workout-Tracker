// Component used to visually display the time left until the next

import { useRef, useEffect, useState } from "react";
import classes from "./SliderOverlay.module.css"
import { Preview, Timer } from "@mui/icons-material";

// set. Slowly disappears as the timer gets closer to 0.
export default function SliderOverlay({timeLeft, totalTime}) {
  const sliderRef = useRef(null);

  const [heightPerc, setHeightPerc] = useState(() => {
    return (100.0 * timeLeft) / totalTime
  });

  const stepSizePerc = 100.0 / totalTime;

  // Update the height frequently to appear as smooth scrolling
  useEffect(() => {
    // render 10 times during each second
    const interval = setInterval(() => {
      setHeightPerc(prevState => {
        return prevState - stepSizePerc / 244.0;
      });
    }, 1000 / 244.0)
    
    
    return () => {
      clearInterval(interval);
    }
  }, [timeLeft])

  useEffect(() => {
    sliderRef.current.style.height = `${heightPerc}%`
  }, [heightPerc])


  return (
    <div className={classes.backdrop} ref={sliderRef}>

    </div>
  )
}