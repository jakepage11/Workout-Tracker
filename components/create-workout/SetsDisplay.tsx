import { createPortal } from "react-dom";
import classes from "./SetsDisplay.module.css"
import { ChangeEvent, useEffect, useState } from "react";
import {nanoid} from "nanoid"
import RemoveIcon from '@mui/icons-material/Remove';
import { Close, HdRounded } from "@mui/icons-material";
import { ContentCopy, Delete, Remove } from "@mui/icons-material";
import { Exercise, ExerciseInfo } from "@/types/types";
import SearchBar from "./SearchBar";
// import ExSearch from "./ExSearch";
// import SearchName from "../queries/SearchName";

// Takes in the exercise object, the index of that exercise,
// list of exercises, as well as functions to handle updating the 
// workout state and closing the modal.
export default function ExSetDisplay({ex, index, handleClose, handleUpdate, allExercises}: 
  {ex: Exercise, index: number, handleClose: Function, handleUpdate: Function, allExercises: Array<ExerciseInfo>}) {

  // ANY CHANGES TO THE EXERCISE ARE HANDLED THROUGH 
  // THE UPDATE FUNCTION

  // Handles setting values for the given exercise and/or set number
  function handleExChanges(e: ChangeEvent<HTMLInputElement>, setindex: number = -1, name: string = "") {
    const exCopy: Exercise = JSON.parse(JSON.stringify(ex))
    if (name !== "") { // update name
      exCopy.name = name
    } else {
      if (e.target.name === 'name') { // updating name of ex
        exCopy.name = e.target.value
      } else if (e.target.name === "reps") {
          exCopy.reps[setindex] = Number(e.target.value)
      } else {
        exCopy.load[setindex] = Number(e.target.value)
      }
    }
    // update state
    handleUpdate(exCopy, index)
  }

  // Delete set at index
  function deleteSet(setIndex: number) {
    let deepCopy = {...ex}
    deepCopy.reps.splice(setIndex, 1);
    deepCopy.load.splice(setIndex, 1);
    handleUpdate(deepCopy, index);
  }

  // Adds a set to the current exercise
  function handleAdd() {
    let exCpy = JSON.parse(JSON.stringify(ex))
    exCpy.reps.push(0)
    exCpy.load.push(0)
    handleUpdate(exCpy, index)
  }

  // Create a duplicate of the set at index and places
  // the duplicate at index + 1. Shifting all exercises after down 1.
  function duplicateSet(setIndex: number) {
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
      <h3 className="text-center">{`Set ${setIndex + 1}`}</h3>
      {/* reps input */}
      <div className={classes.repsContainer}>
        <input key={`${ex.id}_reps_${setIndex}`} className={classes.repInput} 
              name="reps" 
              value={set} onChange={(e) => handleExChanges(e, setIndex)}/>
        <p>rep(s)</p>
      </div>
      {/* load input */}
      <div className={classes.repsContainer}>
        <input className={classes.loadInput}
              key={`${ex.id}_load_${setIndex}`}
              name="load" 
              value={ex.load[setIndex]} 
              onChange={(e) => handleExChanges(e, setIndex)}/>
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

  return (
    <div className={classes.container}>

      {/* Search Bar for Exercise Name */}
      <SearchBar query={ex.name} all_exercises={allExercises} 
        updateName={handleExChanges}/>
      <div className={classes.setsContainer}>
        {sets}
        <div className={classes.addBtnContainer}>
          <button className="bg-[var(--pink)] w-[200px] rounded-full py-1 mt-4"
                onClick={handleAdd}>Add Set</button>
        </div>
      </div>
      <hr className="h-2 bg-black my-10"/>
      {/* previous numbers from the current exercise */}
      <div className="mb-5">
        <h6>Previous Use</h6>
        {/* Find last used exercise */}
      </div>
      <div className={classes.closeIcon}
          onClick={() => handleClose()}>
        <Close />
      </div>
      {/* <button onClick={saveExercises}>Save</button> */}
    </div>
  )
}

// Returns the last 3 uses of the given exercise.
// If exname hasn't been used 3 times it returns the amount
// of times its been used.
async function getPreviousUse(exname: string) {

}