import { useState } from "react"
import classes from "./SearchBar.module.css"
import SearchIcon from '@mui/icons-material/Search';
import { Filter } from "@mui/icons-material";

// The search bar used to find exercises to input into workouts
export default function SearchBar({userInput, handleUserInput}) {
  return (
    <div className={classes.container}>
      <div className={classes.searchContainer}>
        <SearchIcon className={classes.searchIcon}/>
        <input placeholder="Find exercises" type="text" name="search-bar" className={classes.inputBar} value={userInput}
                onChange={e => handleUserInput(e)}/>
        
      </div>
    </div>
  )
}