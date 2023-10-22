'use client'
import React, { useState, useRef, useEffect, useContext, ChangeEventHandler, ChangeEvent, MouseEventHandler } from 'react';
import { useSession } from "next-auth/react"
import classes from './CreateWorkoutForm.module.css';
import {nanoid} from "nanoid"
import { MoreVert, Close, People, LocationOn } from '@mui/icons-material';
import dayjs from 'dayjs';
import { MouseEvent } from 'react';
import { useRouter } from 'next/navigation';
import { Workout, Exercise } from '@/types/types';
import prisma from '@/prisma/dbConnection';
import ExerciseDisplay from './ExerciseDisplay';
import { ExerciseInfo } from '@/types/types';
import SetsDisplay from "./SetsDisplay"
import { IntegerType } from 'mongodb';
import { submitWorkout } from '@/app/create-workout/page';
const utc = require('dayjs/plugin/utc');
dayjs.extend(utc);

// Workout Form for user to enter information into. Takes in list of exercises, the workout (if
// we're editing one, will be null otherwise), a function to submit the workout, and the types of workouts.
export default function CreateWorkoutForm({exercisesInfo}: 
  {exercisesInfo: Array<ExerciseInfo>}) {
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

  // Keep track of whether we should show the create set screen and for which exercise
  const [showCreateSet, setShowCreateSet] = useState(() => {return false});
  const [createSetIndex, setCreateSetIndex] = useState(() => {return -1});
  const [initialLoad, setInitialLoad] = useState(() => {return true});

  // Get previous values that user had in form before the page refreshed.
  useEffect(() => {
    const cachedWorkout = window.sessionStorage.getItem("workoutData");
    console.log(cachedWorkout)
    if (cachedWorkout) {
      let newWorkout = JSON.parse(cachedWorkout);
      // Set if we've previously assigned a value
      setWorkout({...newWorkout})
    }
    setInitialLoad(false);
    
    return () => {  // when the component unmounts we want to delete the session storage
      window.sessionStorage.removeItem("workoutData");
    }
  }, []);

  // Update the local storage each time state changes
  useEffect(() => {
    console.log("workout changed")
    if (!initialLoad) {
      window.sessionStorage.setItem("workoutData", JSON.stringify(workout));
    }
  }, [workout])

  // Sends the particular workout data to the db
  async function submitWorkoutLocal(e: MouseEvent<HTMLButtonElement>) {
    e.preventDefault()
    e.stopPropagation()
    router.replace("/");
    // Call prop function
    await submitWorkout(workout)
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

  // Changes the exercise at index to ex
  function updateExercise(ex: Exercise, index: number) {
    const exercisesCopy = JSON.parse(JSON.stringify(workout.exercises))
    exercisesCopy[index] = ex;
    setWorkout(prevState => ({
      ...prevState, 
      exercises: exercisesCopy,
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

   // Deletes the exercise with the given id
   function deleteExercise(id: string) {
    console.log("delete")
    // Close Set Display is open close it
    setCreateSetIndex(-1)
    setShowCreateSet(false)
    const exsDeepCopy: Exercise[] = JSON.parse(JSON.stringify(workout.exercises))
    const exToDelete = exsDeepCopy.find(ex => ex.id === id) as Exercise
    exsDeepCopy.splice(exsDeepCopy.indexOf(exToDelete), 1)

    setWorkout(prevState => ({
      ...prevState,
      exercises: exsDeepCopy,
    }));
  }

  // Creates the exercises array that stores all exercises in the current
  // workout along with the sets that contain their own reps and load.
  const exercises = workout.exercises.map((ex, index) => {
    // TODO: Get the exercise info object using by searching the name
    const exinfo = exercisesInfo.find(exercise => exercise.name === ex.name) ?? undefined
    return <ExerciseDisplay
                    handleClick={() => displayCreateSets(index)}
                    exinfo={exinfo}
                    exercise={ex}
                    key={`ex-${ex.id}`}
                    handleDelete={() => deleteExercise(ex.id)}
                    />
  })

  // TODO: make backend call to calculate the amount of time the workout will take
  return (
    // Entire page container: search, form, set display
      <div className={classes.formContainer}>
        <div>
          ExSearch Here
          <hr className="h-2 bg-black"/>
        </div>
        {/* Middle Column */}
        <div className='flex flex-col items-center'>
          <div className={classes.middleColumn}>
            {/* type and date */}
            <div className="p-2 flex justify-around align-middle w-[100%]">
              <LocationOn className='text-white cursor-pointer'/>
              <input className="text-[20px] rounded-md px-2" 
                        type='datetime-local' 
                        value={dayjs(workout.date).format('YYYY-MM-DDTHH:mm')}
                        onChange={(e) => handleFormChanges(e)} />
              <People className='text-white cursor-pointer'/>
            </div>
            {/* Exercises along with buttons */}
            <div className="flex flex-col items-center w-[95%] bg-white h-[87%] rounded-md relative">
                <h2>Exercises</h2>
                {/* Container for list of exercises */}
                <div className={classes.exList}>
                  {exercises}
                  <div className={classes.btnContainer}>
                    <button onClick={() => addExercise("")} className="bg-[var(--pink)] w-[200px] rounded-full py-1">Add Exercise</button>
                  </div>
                </div>

                {/* Create Workout Button*/}
                <div className={classes.editBtnsContainer}>
                  <button className="text-white w-[200px] rounded-lg py-1" onClick={(e) => submitWorkoutLocal(e)}>
                    Create Workout
                  </button>
                </div>
            </div>
          </div>
        </div>
        <div className={classes.rightColumn}>
          {showCreateSet && <SetsDisplay ex={workout.exercises[createSetIndex]} 
            index={createSetIndex} handleUpdate={updateExercise} allExercises={exercisesInfo}
            handleClose={() => {setShowCreateSet(false); setCreateSetIndex(-1)}}
          />}
        </div>
      </div>
  );
}

