import classes from "./PrCard.module.css"

export default function PrCard(props) {
  return (
    <div className={classes.container}>
      <div className={classes.content}>
        <h5>Benchpress</h5>
        <h5>225lbs</h5>
        <h5>11/7/22</h5>
      </div>
      
    </div>
  )
}