'use client'
import React, { useState, useRef, useEffect, useContext, ChangeEventHandler, ChangeEvent, MouseEventHandler } from 'react';
import { useSession } from "next-auth/react"
import classes from './NewWorkoutForm.module.css';
import {nanoid} from "nanoid"
import { MoreVert, Close } from '@mui/icons-material';
import dayjs from 'dayjs';
import { useRouter } from 'next/navigation';
import { Workout, Exercise } from '@/types/types';
import prisma from '@/prisma/dbConnection';
import ExerciseDisplay from './ExerciseDisplay';
import { IntegerType } from 'mongodb';
const utc = require('dayjs/plugin/utc');
dayjs.extend(utc);

// Component used to edit and create new workouts. Takes in list of exercises, the workout (if
// we're editing one, will be null otherwise), a function to submit the workout, and the types of workouts.
export default function CreateWorkoutForm() {
  const router = useRouter()
  const {data: session, status} = useSession()
  const [workout, setWorkout] = useState<Workout>(() => {
    return {
      user: session?.user?.email as string, 
      exercises: [{
        id: nanoid(),
        name: "",
        reps: [0],
        load: [0],
        difficulty: -1,
      }],
      difficulty: -1,
      date: new Date(),
      completeIn: -1,
    }
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
  // useEffect(() => {
  //   const workout = window.sessionStorage.getItem("workoutData");
  //   let newWorkout = JSON.parse(workout);
  //   // Set if we've previously assigned a value
  //   if (newWorkout !== null) {
  //     setCurrWorkout({...newWorkout})
  //   }
  //   setInitialLoad(false);
  //   return () => {  // when the component unmounts we want to delete the session storage
  //     window.sessionStorage.removeItem("workoutData");
  //   }
  // }, []);

  // Update the local storage each time state changes
  // useEffect(() => {
  //   if (!initialLoad) {
  //     window.sessionStorage.setItem("workoutData", JSON.stringify(workout));
  //   }
  // }, [workout])

  // Sends the particular workout data to the db
  async function handleSubmit(e: MouseEvent) {
    e.preventDefault()
    e.stopPropagation()
    await prisma.workouts.create({data: {
      user: workout.user, exercises: workout.exercises as Array<Exercise>, 
      date: workout.date, type: "", completeIn: -1,
    }})
    router.replace("/");
    // } else { // editing the workout
      // TODO: add logic for updating a workout in the db
      // await fetch('/.netlify/functions/update-workout', {
      //   body: JSON.stringify(workoutParam),
      //   method: 'POST',
      //   headers: {
      //     Authorization: `Bearer ${user.token.access_token}`,
      //     'Content-Type': 'application/json'
      //   }
      // })

      // }
  }
    
  // Adds an exercise to the current workout plan
  function addExercise(exname: string) {
    console.log("adding exercise")
    // Upon up the Create Set Screen
    setCreateSetIndex(workout.exercises.length);
    setShowCreateSet(true);

    const exsCpy: Array<Exercise> = [...workout.exercises];
    exsCpy.push({
      id: nanoid(),
      name: exname,
      reps: [0],
      load: [0],
      difficulty: -1
    })
    setWorkout(prevState => ({
      ...prevState,
      exercises: exsCpy
    }))
  }


  // Deletes the exercise at index
  function deleteExercise(e: MouseEvent, index: number) {
    e.preventDefault();
    e.stopPropagation();
    const updatedExs = [...workout.exercises].splice(index, 1)

    // Delete the create set modal if needed
    // if (createSetIndex == index) {
    //   setShowCreateSet(false);
    //   setCreateSetIndex(-1);
    // } else if (index < createSetIndex) {
    //    // Update the index if an exercise before it was deleted
    //   setCreateSetIndex(prevState => prevState - 1);  
    // }

    setWorkout(prevState => ({
      ...prevState,
      exercises: updatedExs,
    }));
  }

   // Stores the user sets values for a given exercise
   function handleSetChanges(exname: string, index: number) {
    const currex = 
    // replace old exercise
    deepCopy[index] = {...ex};
    setShowCreateSet(false);
    setCreateSetIndex(-1);
    setCurrWorkout(prevState => ({
      ...prevState,
      exercises: deepCopy
    }));
  }

  // Handles setting values for the given exercise and/or set number
  function handleExChanges(e: ChangeEvent<HTMLInputElement>, exindex: number, 
    setindex: number|undefined) {
    const exsDeepCopy: Array<Exercise> = JSON.parse(JSON.stringify(workout.exercises))
    if (!setindex) { // updating name of ex
      exsDeepCopy[exindex].name = e.target.value
    } else { // updating reps or load
      if (e.target.name === "reps") {
        exsDeepCopy[exindex].reps[setindex] = Number(e.target.value)
      } else {
        exsDeepCopy[exindex].load[setindex] = Number(e.target.value)
      }
    }
    // update state
    setWorkout(prevState => ({
      ...prevState,
      exercises: exsDeepCopy, 
    }))
  }

  // Handles assigning the date, type, location, and people
  function handleFormChanges(e: ChangeEvent<HTMLInputElement>) {
    const workoutDeepCopy: Workout = JSON.parse(JSON.stringify(workout))
    workoutDeepCopy.date = new Date(e.target.value)
    setWorkout(workoutDeepCopy)
  }

  // Displays the create set modal for the given exercise that was
  // pressed by the user
  function displayCreateSets(index: number) {
    setCreateSetIndex(index);
    setShowCreateSet(true);
  }

  // Clears all sets of exercise at index.
  function clearSets(index: number) {
    let updatedExercises: Array<Exercise> = [...workout.exercises]
    updatedExercises[index].reps = []
    updatedExercises[index].load = []

    setWorkout(prevState => ({
      ...prevState,
      exercises: updatedExercises,
    }))
  }

  // Removes the Create Set Modal from the screen
  function closeCreateSet() {
    setCreateSetIndex(-1);
    setShowCreateSet(false)
  }

  // Removes any changes the user had made in this session
  // function revertChanges() {
  //   setCurrWorkout({...JSON.parse(JSON.stringify(workout))});
  //   setShowCreateSet(false)
  //   closeCreateSet()
  //   console.log("reset")
  // }

  function getExerciseAttr(exname: string) {
    // use list of exercises from the prop to
    // if (exInfo !== undefined) {
    //   for (let i = 0; i < exInfo.tags.length; i++) {
    //     tags += exInfo.tags[i] + "  "
    //   }
    //   for (let i = 0; i < exInfo.muscles.length; i++) {
    //     muscleStr += exInfo.muscles[i] + "  "
    //   }
    //   for (let i = 0; i < exInfo.equipment.length; i++) {
    //     equipmentStr += exInfo.equipment[i] + "  "
    //   }
    // }
    // muscleStr.trim();
    // equipmentStr.trim();
    // tags.trim();
    // TODO: return the ex info
  }

  // Creates the exercises array that stores all exercises in the current
  // workout along with the sets that contain their own reps and load.
  const exercises = workout.exercises.map((ex, index) => {
    const exinfo = {}
    // TODO: Get the exercise info object using by searching the name
    return <ExerciseDisplay exname={ex.name}
                    handleClick={() => displayCreateSets(index)}
                    exinfo={exinfo}
                    exercise={ex}
                    key={`ex-${ex.id}`}
                    handleDelete={(e: MouseEvent) => deleteExercise(e, index)}
                    />
  })

  // Local time put into UTC with the same time of day
  const localTime = dayjs.utc(workout.date).format('YYYY-MM-DDTHH:mm')
  // TODO: make backend call to calculate the amount of time the workout will take
  return (
      <div className={classes.formContainer}>
        {/* left side with exercises listed */}
        <div className={classes.leftForm}>
          {/* type and date */}
          <div className={classes.typeDate}>
            <input className={classes.dateInput} 
                      type='datetime-local' 
                      value={localTime} 
                      onChange={(e) => handleFormChanges(e)} />
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
                  <button className={classes.submitBtn} onClick={(e) => handleSubmit(e)}>Create Workout</button>
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

