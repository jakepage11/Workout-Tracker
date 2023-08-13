'use client'
import { useContext, useEffect, useState, use } from "react"
import classes from "../../create-workout/CreateWorkout.module.css"
import AuthContext from '@/stores/authContext';
import NewWorkoutForm from "@/components/create-workout/NewWorkoutForm.js"

export default function EditWorkoutPage({params}) {
  const {user, authReady} = useContext(AuthContext)
  const id = params.id
  const [workout, setWorkout] = useState(null)
  const [allExercises, setAllExercises] = useState(null)
  const [allTypes, setAllTypes] = useState(null)

  // Each time a new user logs in or a user logs out we want to 
  // refetch the data
  useEffect(() => {
    if (authReady) {
      const data = async () => {
        setData()
      }
      data()
    } else {
      setWorkout(null)
      setAllExercises(null)
      setAllTypes(null)
    }
  }, [user, authReady])

  // Sets each of the states with data from the backend, or
  // to null if an error occurred.
  async function setData() {
    try {
      const workout = await getWorkout(user, id)
      const exercises = await getExercises()
      const types = await getTypes()
      setWorkout(workout)
      setAllExercises(exercises)
      setAllTypes(types)
    } catch (err) {
      setWorkout(null)
      setAllExercises(null)
      setAllTypes(null)
    }
  }
  
  console.log("refresh")
  console.log({allExercises})
  console.log({allTypes})
  return (
    <div className={classes.page}>
      <div className={classes.container}>
        <div className={classes.testDiv}>
          Ex Search to be implemented soon...
        </div>

        <div className={classes.formContainer}>
          {workout && <NewWorkoutForm 
                    workoutTypes={allTypes}
                    allExercises={allExercises}
                    workout={workout}
                    />}
        </div>
      </div>
    </div>
  )
}

// Returns the workout object for the current id if the user is logged in,
// otherwise throws an error
async function getWorkout(user, id) {
  const workout = await fetch(`/.netlify/functions/workout?id=${id}`, user && {
    headers: {
      Authorization: `Bearer ${user.token.access_token}`
    }
  }).then(res => {
    if (!res.ok) {
      // encountered an error in the request
      throw Error("Couldn't access the workout info")
    }
    return res.json()
  }).then(data => {return data})
  return workout
}

// Returns all exercises if request is good, otherwise throws an error
async function getExercises() {
  // Get list of all exercises
  const exercises = await fetch('/api/all-exercises')
    .then(res => {
      if (!res.ok) {
        throw Error("Couldn't access the requested info")
      }
      return res.json()
    }).then(data => {return data.body})
  return exercises
}

// Returns all workout types if request is good, otherwise throws an error
async function getTypes() {
  // Get list of all workout types
  const types = await fetch('/api/all-types')
    .then(res => {
      if (!res.ok) {
        throw Error("Couldn't access the requested info")
      }
      return res.json()
    }).then(data => {
      return data.body
    })
  return types
}
