import { createPortal } from "react-dom"
import classes from "./AddExercise.module.css"
import { useEffect, useState } from "react"
// Modal that allows the user to submit information regarding an 
// a new exercise such as muscles, name, and equipment needed.
export default function AddExerciseForm({exname, handleSubmit}) {
  const [exInfo, setExInfo] = useState(() => {
    return {
      name: exname,
      equipment: "",
      muscles: ""
    }
  });

  function handleChange(e) {
    const { name, value } = e.target;
   
    setExInfo(prevState => ({
      ...prevState,
      [name]: value
    }));
    
  }

  return createPortal (
    <>
      <div className={classes.overlay}></div>
      <div className={classes.container}>
        <form className={classes.form}>
          <input name="name" className={classes.name} value={exInfo.name}
                  onChange={e => handleChange(e)}/>
          <h3>Muscles</h3>
          <input name="muscles" className={classes.otherInputs} placeholder="Muscles: muscle 1, muscle 2, ..." 
                  onChange={e => handleChange(e)} value={exInfo.muscles}/>
          <h3>Equipment</h3>
          <input name="equipment" className={classes.otherInputs} placeholder="Equipment: equipment 1, equipment 2..." 
                  onChange={e => handleChange(e)}/>
          <button className={classes.submitBtn} onClick={e => {e.preventDefault(); handleSubmit(exInfo)} }
                    value={exInfo.muscles}>Add Exercise</button>
        </form>
        
      </div>
      
    </>,
    // Render the modal to a new root
    document.getElementById("portal-root")
  )
}