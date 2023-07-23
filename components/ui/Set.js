import { useEffect, useState } from "react"
import classes from "./Set.module.css"

export default function Set(props) {

  return (
    <div className={classes.set}>
      <h4 className={classes.header}>Set {props.index2 + 1}</h4>
    
      <input placeholder="reps" type="number" name="reps" className={classes.inputfield} 
          value={props.reps} onChange={(e) => props.handleChange(e, props.index, props.index2)}
          onKeyDown={e => props.handleKeyDown(e)}/>
  
      <input placeholder="load" type="number" name="load" className={classes.inputfield}
          value={props.load} 
          onChange={(e) => props.handleChange(e, props.index, props.index2)}
          onKeyDown={e => props.handleKeyDown(e)}/>
   
      <button className={classes.remove} onClick={(e) => 
        props.handleDelete(props.index, props.index2)}>Remove Set</button>
    
    </div>
  )
}