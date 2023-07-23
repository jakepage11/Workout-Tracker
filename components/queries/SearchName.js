// Component that takes in list of exercise names and will give results
// that match the user input.

import { useState, useEffect } from "react"
import classes from "./SearchName.module.css"
import {nanoid} from 'nanoid'
import SearchResults from "./SearchResults";

export default function SearchName({name, allItems, handleNameChange, index}) {
  console.log({name})
  const [filteredExs, setFilteredExs] = useState(() => {
    return [];
  });
  const [showOptions, setShowOptions] = useState(() => {
    return false;
  });

  // Update filtered exercises based on user input
  function handleQueryInput(e) {
    const query = e.target.value;
    // setUserInput(query);
    handleNameChange(query, index)
    // Order exercises on frequency of use and popularity when
    // applicable
    let newExercises = [];

    // Empty search bar should display no exercises
    if (query == "") {
      setFilteredExs([]);
    } else {
      // Check whether each exericse contains the user input string
      newExercises = allItems.filter((ex) => {
        return ex.name.toLowerCase().includes(query.toLowerCase())
      });
   
      setFilteredExs(newExercises);
    }
  }

  // TODO: Allow user to add an exercise that doesn't show up in the database

  return (
    <div className={classes.container}>
      <input  type="search"
              id="ex-name-search"
              placeholder={"Exercise Name"} 
              value={name}
              onChange={(e) => handleQueryInput(e)}
              onFocus={() => {setShowOptions(true)}}
              list="options"
              // onBlur={() => {setShowOptions(false)}}
              className={classes.formExName}/>
    
      {showOptions && 
        <SearchResults filteredExs={filteredExs} 
                       setShowOptions={setShowOptions}
                       handleNameChange={handleNameChange}
                       index={index}/>
    }
      
    </div>
  )
}