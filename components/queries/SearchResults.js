import classes from "./SearchName.module.css"
import {nanoid} from "nanoid"

export default function SearchResults({filteredExs, setShowOptions, setUserInput, index, handleNameChange}) {
  function selectEx(name) {
    setShowOptions(false);
    handleNameChange(name, index)
  }

  // Map each filtered exercise
  const mapExercises = filteredExs.map((ex) => {
    return <option key={nanoid()} 
                  onClick={() => selectEx(ex.name)}
                  className={classes.exOption}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      selectEx(ex.name)
                    }
                  }}
                  contentEditable>
              {ex.name}
          </option>
  });

  return (
    <div className={classes.dropdown}>
      {mapExercises}
    </div>
  )
}