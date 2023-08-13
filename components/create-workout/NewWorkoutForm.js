'use client'
import React, { useState, useRef, useEffect, useContext } from 'react';
import classes from './NewWorkoutForm.module.css';
import {nanoid} from "nanoid"
import { MoreVert, Close } from '@mui/icons-material';
import CreateSets from './CreateSets';
import dayjs from 'dayjs';
import ExerciseDisplay from './ExerciseDisplay';
import AuthContext from '@/stores/authContext';
import { useRouter } from 'next/navigation';

// Component used to edit and create new workouts. Takes in list of exercises, the workout (if
// we're editing one, will be null otherwise), a function to submit the workout, and the types of workouts.
export default function NewWorkoutForm({workout, workoutTypes, allExercises}) {
  const utc = require('dayjs/plugin/utc');
  dayjs.extend(utc);
  const {login, logout, user, authReady} = useContext(AuthContext)
  const router = useRouter()
  
  const [currWorkout, setCurrWorkout] = useState(() => {
    if (workout === undefined) {  // we're creating a workout
      return {
        exercises: [
          {
            id: nanoid(),
            name: "",
            // Indicies of array correspond to set and matching indicies are the 
            // reps and load for that set.
            reps: [],
            load: [],
            orderNum: 0,
            difficulty: -1
          }
        ],
        difficulty: -1,
        date: "",
        type: "",
        completeIn: ""
      }
    } else {  // editing a workout
      const workoutState = JSON.parse(JSON.stringify(workout));
   
      return {...workoutState};
    }
    
  });

  // Store which exercise has more options overlay open 
  const [moreOptions, setMoreOptions] = useState(() => {
    return -1;
  })

  // Keep track of whether we should show the create set screen and for which ex
  const [showCreateSet, setShowCreateSet] = useState(() => {return false});
  const [createSetIndex, setCreateSetIndex] = useState(() => {return -1});
  const [initialLoad, setInitialLoad] = useState(() => {return true});

  // Store current dragged exercise index along with what exercise it
  // is currently hovering over.
  const draggedEx = useRef(-1);
  const dragOverEx = useRef(-1);

  // Get previous values that user had in form before the page refreshed.
  useEffect(() => {
    const workout = window.sessionStorage.getItem("workoutData");
    let newWorkout = JSON.parse(workout);
    // Set if we've previously assigned a value
    if (newWorkout !== null) {
      setCurrWorkout({...newWorkout})
    }
    setInitialLoad(false);
    return () => {  // when the component unmounts we want to delete the session storage
      window.sessionStorage.removeItem("workoutData");
    }
  }, []);

   // Update the local storage each time state changes
   useEffect(() => {
    if (!initialLoad) {
      window.sessionStorage.setItem("workoutData", JSON.stringify(currWorkout));
    }
  }, [currWorkout])

  // Sends the particular workout data to the db
  async function handleSubmit(workoutParam) {
    
    if (user) { // only create workout for users that are logged in
      if (workout === undefined) {  // User is creating for the first time
        const fullWorkout = {...workoutParam, user: user.email}
        const res = await fetch("/.netlify/functions/create-workout", {
          method: 'POST',
          body: JSON.stringify(fullWorkout),
          headers: {
            'Content-Type': 'application/json'
          }
        });
      } else { // editing the workout
        await fetch('/.netlify/functions/update-workout', {
          body: JSON.stringify(workoutParam),
          method: 'POST',
          headers: {
            Authorization: `Bearer ${user.token.access_token}`,
            'Content-Type': 'application/json'
          }
        })

      }
      // router.push("/");
    } else {
      login();
    }
  }

  // Adds an exercise to the current workout plan
  function addExercise(exname) {
    console.log("adding exercise")
    const lastOrder = currWorkout.exercises.length > 0 
                            ? currWorkout.exercises[currWorkout.exercises.length - 1].orderNum 
                            : 0;
    // Upon up the Create Set Screen
    setCreateSetIndex(currWorkout.exercises.length);
    setShowCreateSet(true);

    const exsCpy = [...currWorkout.exercises];
    exsCpy.push({
      id: nanoid(),
      name: exname,
      reps: [],
      load: [],
      orderNum: lastOrder + 1,
      difficulty: -1
    })
    setCurrWorkout(prevState => ({
      ...prevState,
      exercises: exsCpy
    }))
  }


  // Deletes the exercise at index
  function deleteExercise(e, index) {
    e.preventDefault();
    e.stopPropagation();
    // Delete the create set modal if needed
    if (createSetIndex == index) {
      setShowCreateSet(false);
      setCreateSetIndex(-1);
    } else if (index < createSetIndex) {
       // Update the index if an exercise before it was deleted
      setCreateSetIndex(prevState => prevState - 1);  
    }
    console.log("deleted")

    // TODO: update the order numbers
    setCurrWorkout(prevState => {
      const newList = [...prevState.exercises];
      newList.splice(index, 1);
      return {
        ...prevState,
        exercises: newList
      }
    });
  }

   // Stores the user sets values for a given exercise
   function handleSetChanges(ex, index) {
    let deepCopy = JSON.parse(JSON.stringify(currWorkout.exercises));
    // replace old exercise
    deepCopy[index] = {...ex};
    setShowCreateSet(false);
    setCreateSetIndex(-1);
    setCurrWorkout(prevState => ({
      ...prevState,
      exercises: deepCopy
    }));
  }

  // Handles changing the name of a given exercise
  function changeExName(name, index) {
    let exCpy = [...currWorkout.exercises];
    exCpy[index] = {
      ...exCpy[index],
      name: name
    }
    setCurrWorkout(prevState => ({
      ...prevState,
      exercises: exCpy
    }));
  }

  // Handles any changes made in the create sets component
  // to be reflected in this one.
  function updateExSets(ex, index) {
    let exCpy = [...currWorkout.exercises]
    exCpy[index] = {...ex}
    setCurrWorkout( prevState => ({
      ...prevState, 
      exercises: JSON.parse(JSON.stringify(exCpy))
    })
      
    )
  }

  // Displays the create set modal for the given exercise that was
  // pressed by the user
  function displayCreateSets(index) {
    setCreateSetIndex(index);
    setShowCreateSet(true);
  }

  // Submits all non-empty exercise data to a server
  // where the info is stored.
  async function handleSubmitLocal(e) {
    e.preventDefault();
    e.stopPropagation();
    // Clear the session Storage after submitting.
    window.sessionStorage.removeItem("workoutData");
    console.log("submitting")
    // Call the function given with props
    await handleSubmit(currWorkout);
  }

  // Prevents the auto submit from occuring 
  function handleKeyDown(e) {
    if (event.key === 'Enter') {
      e.preventDefault();
    }
  }

// Handles moving around exercises already in the workout (adjusting the order)
function handleFormOnDrop(e) {
  e.stopPropagation(); // prevent outer div from doing another onDrop.

  // Get object data and then create a new exercise at the given drop location.
  const ex = JSON.parse(e.dataTransfer.getData("exInfo"));
  let exsCopy = [...currWorkout.exercises];

  // Update all the orderings after dragOverEx.current
  const replaceIndex = dragOverEx.current;
  for (let i = replaceIndex; i < currWorkout.exercises.length; i++) {
    currWorkout.exercises[i].orderNum++;
  }

  // Only rearrange if exercise wasn't dropped on itself
  if (dragOverEx.current != draggedEx.current) {
    const replaceIndex = dragOverEx.current;
    // If the exercise was dropped onto an empty one then delete the empty one
    if (exsCopy[replaceIndex].name == "") {
      exsCopy.splice(replaceIndex, 1);
    }
    if (draggedEx.current != -1) { // Must be dragging from workout form so we have to delete
      exsCopy.splice(draggedEx.current, 1);
    }
    exsCopy.splice(replaceIndex, 0, ex);
  }

  // Remove blue outline
  e.currentTarget.classList.remove(classes.excontainerDrag);
  dragOverEx.current = -1;
  draggedEx.current = -1;
  setCurrWorkout(prevState => ({
    ...prevState,
    exercises: exsCopy
  }));
}

  // Handles moving around exercises already in the workout (adjusting the order)
  function handleFormOnDrop(e) {
    e.stopPropagation(); // prevent outer div from doing another onDrop.
    // Get object data and then create a new exercise at the given drop location.
      const lastOrder = currWorkout.exercises[dragOverEx.current].orderNum;
      const ex = {...JSON.parse(e.dataTransfer.getData("exInfo")),
                  orderNum: lastOrder}
      let exsCopy = [...currWorkout.exercises];
      const replaceIndex = dragOverEx.current;

      // Only rearrange if exercise wasn't dropped on itself
      if (dragOverEx.current != draggedEx.current) {
        if (draggedEx.current != -1) { // Must be dragging from workout form so we have to delete
          exsCopy.splice(draggedEx.current, 1);
        }
        exsCopy.splice(replaceIndex, 0, ex);
      }

      // Remove blue outline
      e.currentTarget.classList.remove(classes.excontainerDrag);
      dragOverEx.current = -1;
      draggedEx.current = -1;
      setCurrWorkout(prevState => ({
        ...prevState,
        exercises: exsCopy
      }))
  }

  // Adds exercise from the search bar into the workout form
  function handleOutsideFormDrop(e) {
    addExercise({
      ...JSON.parse(e.dataTransfer.getData("exInfo"))
    });
  }

  // Handles dragging an exercise currently in the workout plan
  function handleOnDrag(e, ex, index) {
    e.dataTransfer.setData("exInfo", JSON.stringify(ex));
    draggedEx.current = index;
  }

  // Handles keeping track of which exercise the dragged element is over
  function handleOnDragOver(e, index) { 
    e.preventDefault(); 
    e.currentTarget.classList.add(classes.excontainerDrag);
    dragOverEx.current = index; 
    console.log(index)
  }

  function handleDragLeave(e) {e.currentTarget.classList.remove(classes.excontainerDrag);}

  // Assign current date
  function handleDate(e) {
    const newDate = e.target.value;
    const dateObj = dayjs(newDate);
    // Extra date, hours, min, secs into new Date object

    console.log({dateObj})
    // const dateObj2 = dayjs(dateObj)
    // console.log({dateObj2})
    console.log(dateObj.date())
    const utcDate = new Date(Date.UTC(dateObj.year(), dateObj.month(), 
                                    dateObj.date(), dateObj.hour(), 
                                    dateObj.minute(), dateObj.second()))
    
    console.log({utcDate});
    setCurrWorkout(prevState => ({
      ...prevState,
      date: newDate
    }));
  }

  function handleType(e) {
    const type = e.target.value;
    setCurrWorkout(prevState => ({
      ...prevState,
      type: type
    }));
  }

  // Clears all sets of exercise at index. Leaves exercise
  // with 0 sets
  function clearSets(index) {

    setCurrWorkout(prevState => {
      let exCopy = [...prevState.exercises];
      exCopy[index].reps = [];
      exCopy[index].load = [];
      return {
        ...prevState,
        exercises: exCopy
      }
    })

  }

  // Changes whether an exercise is superset with the one above it. 
  // Flips superset to not superset and vice a versa.
  function flipSuperset(e, index) {
    e.stopPropagation();
    e.preventDefault();
    
    setCurrWorkout((prevState) => {
      let exCopy = JSON.parse(JSON.stringify(currWorkout.exercises));
      console.log(exCopy[index]);
      if (exCopy[index].orderNum !== exCopy[index - 1].orderNum) { // adding superset
        // Decrease ordering of all exerises after
        for (let i = index; i < currWorkout.exercises.length; i++) {
          exCopy[i].orderNum--;
        }
      } else {  // removing superset
        // Increase ordering of all exercises after
        for (let i = index; i < currWorkout.exercises.length; i++) {
          exCopy[i].orderNum++;
        }
      }
      
      // console.log(exCopy[index]);
      return {
        ...prevState,
        exercises: JSON.parse(JSON.stringify(exCopy))
      }
    });
  }

  // Removes the Create Set Modal from the screen
  function closeCreateSet() {
    setCreateSetIndex(-1);
    setShowCreateSet(false)
  }

  // Removes any changes the user had made in this session
  function revertChanges() {
    setCurrWorkout({...JSON.parse(JSON.stringify(workout))});
    setShowCreateSet(false)
    closeCreateSet()
    console.log("reset")
  }

  // Creates the exercises array that stores all exercises in the current
  // workout along with the sets that contain their own reps and load.
  const exercises = currWorkout.exercises.map((ex, index) => {
    let exInfo = allExercises.find(obj => obj.name === ex.name)
    let muscleStr = ""
    let equipmentStr = ""
    let tags = ""
    if (exInfo !== undefined) {
      for (let i = 0; i < exInfo.tags.length; i++) {
        tags += exInfo.tags[i] + "  "
      }
      for (let i = 0; i < exInfo.muscles.length; i++) {
        muscleStr += exInfo.muscles[i] + "  "
      }
      for (let i = 0; i < exInfo.equipment.length; i++) {
        equipmentStr += exInfo.equipment[i] + "  "
      }
    }
    muscleStr.trim();
    equipmentStr.trim();
    tags.trim();

    return <ExerciseDisplay exname={ex.name}
                    handleClick={() => displayCreateSets(index)}
                    tags={tags}
                    muscles={muscleStr}
                    equipment={equipmentStr}
                    key={`ex-${ex.id}`}
                    handleDelete={(e) => deleteExercise(e, index)}
                    numsets={ex.reps.length}
                    />
  })
      {/* <div key={ex.id} className={classes.excontainer} draggable onDragStart={(e) => handleOnDrag(e, ex, index)} 
                onDragOver={(e) => handleOnDragOver(e, index)} 
                onDrop={(e) => handleFormOnDrop(e, index)}
                onDragLeave={(e) => handleDragLeave(e)}
                onClick={() => displayCreateSets(index)}> */}

  const updatedTypes = ["Choose Type", ...workoutTypes];

  // Map each workout type into an option
  const types = updatedTypes.map((type, index) => {
    return <option key={index} value={type}>{type}</option>
  });

  // Local time put into UTC with the same time of day
  const localTime = dayjs.utc(currWorkout.date).format('YYYY-MM-DDTHH:mm')
  // TODO: make backend call to calculate the amount of time the workout will take
  return (
      <div className={classes.formContainer} onDrop={(e) => handleOutsideFormDrop(e)}>
        {/* left side with exercises listed */}
        <div className={classes.leftForm}>
          {/* type and date */}
          <div className={classes.typeDate}>
            <select className={classes.workoutType} 
                    placeholder="Workout Type" 
                    value={currWorkout.type} 
                    id="typeSelect"
                    onChange={(e) => handleType(e)}>
                {types}
            </select>
            <input className={classes.dateInput} 
                      type='datetime-local' 
                      value={localTime} 
                      onChange={(e) => handleDate(e)} />
          </div>
        {/* Exercises along with buttons */}
          <div className={classes.workoutDisplay}>
              <h2>Exercises</h2>
              <div className={classes.exList}>
                {exercises}
                <div className={classes.btnContainer}>
                  <button onClick={() => addExercise("")} className={classes.addExBtn}>Add Exercise</button>
                </div>
              </div>
              
              {/* Either show create or save changes / revert changes buttons */}
              {workout === undefined && 
                <div className={classes.editBtnsContainer}>
                  <button className={classes.submitBtn} onClick={(e) => handleSubmitLocal(e)}>Create Workout</button>
                </div>
              }
              {workout !== undefined && 
                <div className={classes.editBtnsContainer}>
                  <button className={classes.submitBtn} onClick={(e) => handleSubmitLocal(e)}>Save Changes</button>
                  <p className={classes.revertChanges}
                      onClick={revertChanges}>
                    <u>Revert Changes</u>
                  </p>
                </div>
              }
          </div>
        
        </div>
        <div className={classes.rightForm}>
          {showCreateSet && <CreateSets ex={currWorkout.exercises[createSetIndex]} 
                                    handleName={changeExName} 
                                    handleSave={handleSetChanges}
                                    index={createSetIndex}
                                    allExercises={allExercises}
                                    handleClose={() => {setShowCreateSet(false); setCreateSetIndex(-1)}}
                                    handleUpdate={updateExSets}/>}
        </div>
        
      </div>
    
  );
}

