'use client'
// This page lets the user discover, search, and even add to a bank

import SearchBar from "@/components/create-workout/SearchBar";
import classes from "./ExSearch.module.css"
import { useState } from "react";
import DragIndicatorIcon from '@mui/icons-material/DragIndicator';
import AddIcon from '@mui/icons-material/Add';
import {nanoid} from "nanoid"

export default function ExSearch({allExercises, allTypes, allMuscles}) {

  // Store user query input for potentially creating new 
  // exercise
  const [userInput, setUserInput] = useState(() => {
    return {
      popularity: "",
      type: "",
      muscles: ["triceps", "biceps", "pecs"],
      frequency: ""
    }
  });

  // Updates when user 
  const [musclesInput, setMusclesOptions] = useState(() => {
    return allMuscles
  })

  // Muscles that match users input
  const [filteredMuscles, setFilteredMuscles] = useState(() => {
    return []
  })

  // Exercises that match the userInput
  const [filteredEx, setFilteredEx] = useState(() => {
    return [];
  });

  // Sets query input field
  


    // Set filtered exercises


  // Either displays or un-displays the add exercise form
  function showExForm(show) {
    setShowAdd(show);
  }

  // Add the drag and drop exercise to the workout
  function handleOnDrag(e, exname) {
    const exInfo = JSON.stringify({
                    id: nanoid(),
                    name: exname,
                    reps: [],
                    load: [],
                    orderNum: -1
                  });
    e.dataTransfer.setData("exInfo", exInfo);
  }


  // Create list of all exercises that match the current user query
  const queryExs = filteredEx.map((ex) => {
    return <p key={nanoid()} name="search" draggable onDragStart={(e) => handleOnDrag(e, ex.name)} 
                        className={classes.searchItem}>
                          <DragIndicatorIcon />
                          {ex.name}
                          <div className={classes.addIcon}
                                /*onClick={}*/>
                            <AddIcon />
                          </div>
                          
              </p>
  });

  // Create options for each type
  const typeOptions = allTypes.map((t, index) => {
    return <option key={`option-${index}`}value={t}>{t}</option>
  });

  // Create string of selected filter muscles
  let musclesStr = "";
  let length = userInput.muscles.length;
  for (let i = 0; i < length - 1; i++) {
    musclesStr += userInput.muscles[i] + ", ";
  }
  if (userInput.muscles.length !== 0) {
    musclesStr += userInput.muscles[length - 1];
  } else {
    musclesStr += "muscles"
  }


  return (
    <div className={classes.body}>

      <div className={classes.filterContainer}>
          {/* Include 2 Filters and 2 sort bys */}
        <select className={classes.inputSelect}>
          {typeOptions}
        </select>
        {/* Display filter muscles */}
        <p className={classes.inputSelect}>{musclesStr}</p>
        <select className={classes.inputSelect}>
            <option>Frequency</option>
            <option>Less used</option>
            <option>More used</option>
          </select>
          {/* Display popularity sorting */}
          <select className={classes.inputSelect}>
            <option>Popularity</option>
            <option>Less popular</option>
            <option>More popular</option>
          </select>
      </div>
      <div>
        To be implemented...
      </div>
      {filteredEx.length != 0  &&
      <div className={classes.searchItems}>
        {queryExs}
      </div>}
      
    </div>
    
  )
}