import { createPortal } from "react-dom";
import classes from "./CreateSets.module.css"
import { useEffect, useState } from "react";
import {nanoid} from "nanoid"
import RemoveIcon from '@mui/icons-material/Remove';
import { Close } from "@mui/icons-material";
import { ContentCopy, Delete, Remove } from "@mui/icons-material";
import ExSearch from "./ExSearch";
import SearchName from "../queries/SearchName";

export default function CreateSets({ex, handleName, index, 
                                    handleClose, allExercises, handleUpdate}) {
  console.log({ex});

  // Add sets if there aren't any already
  if (ex.reps.length === 0) {
    ex.reps.push("");
    ex.load.push("");
      
  }
  // const [currEx, setCurrEx] = useState(ex);
  const [prevEx, setPrevEx] = useState();

  useEffect(() => {
    if (allExercises.some(obj => obj.name === ex.name)) {
      const prev = async () => await fetch(`api/find-lastexercise/${ex.name}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json"
        }
      })
      const lastEx = prev();
      // setPrevEx({...prev})
    }
    // handleUpdate(currEx, index)
  }, [ex]);

  // Update the reps or load of specific set
  function handleChange(e, setIndex) {
    const { name, value } = e.target;
    let copy = {...ex};
    // Check whether it's the name vs the reps/load
    if (name == "name") {
      copy[name] = value;
      handleName(value, index);
    } else {
      copy[name][setIndex] = value; 
    }
  
    handleUpdate(copy, index)
  }

  // Delete set at index
  function deleteSet(setIndex) {
    let deepCopy = {...ex}
    deepCopy.reps.splice(setIndex, 1);
    deepCopy.load.splice(setIndex, 1);
    handleUpdate(deepCopy, index);
  }

  function handleAdd() {
    let exCpy = {...ex}
    exCpy.reps.push("")
    exCpy.load.push("")
    handleUpdate(exCpy, index)
  }

  // Saves the sets to the given exercise
  function saveExercises() {
    console.log('save')
    let deepCopy = JSON.parse(JSON.stringify(ex));
    // Delete any sets that are empty
    for (let i = 0; i < ex.reps.length; i++) {
      if (deepCopy.reps[i] === "" || deepCopy.load[i] === "") {
        // remove the empty sets
        console.log("removed");
        deepCopy.reps.splice(i, 1);
        deepCopy.load.splice(i, 1);
        i--;
      }
    }

    // call the parent function
    handleSave(deepCopy, index);
  }

  // Create a duplicate of the set at index and places
  // the duplicate at index + 1. Shifting all exercises after down 1.
  function duplicateSet(setIndex) {
    let exCpy = {...ex}
    let repVal= ex.reps[setIndex];
    let loadVal = ex.load[setIndex];
    
    exCpy.reps.splice(setIndex + 1, 0, repVal);
    exCpy.load.splice(setIndex + 1, 0, loadVal);
    handleUpdate(exCpy, index)
  }

  // Map each set (reps and load) into it's own row
  const sets = ex.reps.map((set, setIndex) => {
    return <div key={`${ex.id}_set_${setIndex}`} className={classes.singleSet}>
      <h3 className={classes.setHeader}>{`Set ${setIndex + 1}`}</h3>
      {/* reps input */}
      <div className={classes.repsContainer}>
        <input key={`${ex.id}_reps_${setIndex}`} className={classes.repInput} 
              name="reps" 
              value={set} onChange={(e) => handleChange(e, setIndex)}/>
        <p>rep(s)</p>
      </div>
      {/* load input */}
      <div className={classes.repsContainer}>
        <input className={classes.loadInput}
              key={`${ex.id}_load_${setIndex}`}
              name="load" 
              value={ex.load[setIndex]} 
              onChange={(e) => handleChange(e, setIndex)}/>
        <select className={classes.loadOption}>
          <option>lbs</option>
          <option>other</option>
        </select>
      </div>
      
      
      <div className={classes.setButtons}>
        <div className={classes.copySetBtn}
              onClick={() => duplicateSet(setIndex)}>
          <ContentCopy />
        </div>
        <div className={classes.deleteSetBtn}
              onClick={() => deleteSet(setIndex)}>
          <Delete />
        </div>
      </div>
    </div>
  });

  // return createPortal (
  return (
    <div className={classes.container}>
      <SearchName allItems={allExercises} 
                  index={index}
                  handleNameChange={handleName}
                  name={ex.name}/>
      <div className={classes.setsContainer}>

        {sets}
        <div className={classes.addBtnContainer}>
          <button className={classes.addBtn}
                onClick={handleAdd}>Add Set</button>
        </div>
      </div>
      {/* previous numbers from the current exercise */}
      <div className={classes.prevCont}>
        <h6>Previous Use</h6>
        {/* Find last used exercise */}
      </div>
      <div className={classes.closeIcon}
          onClick={handleClose}>
        <Close />
      </div>
      {/* <button onClick={saveExercises}>Save</button> */}
    </div>
    // document.getElementById("portal-root")
  )
}