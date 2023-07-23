import classes from "./GoalCard.module.css"
import {nanoid} from "nanoid"
export default function GoalCard(props) {

  return (
    <div className={classes.container}>
      <div className={classes.content}>
        
        <div style={{backgroundImage: `url(${props.img})`}}>
          {/* Put the image as the background of the div */}
          <h2>{props.title}</h2>
        </div>
        <div>
          <h5>Started: {props.start}</h5>
          <h5>Ending: {props.end}</h5>
          <p>{props.desc}</p>
          <h6>Rules</h6>
          {props.rules.map((r) => {return <p key={nanoid()}>{r}</p>})}
        </div>
      </div>
    </div>
  )
}