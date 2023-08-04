'use client'
import AuthContext from '@/stores/authContext'
import {useState, useContext, useEffect} from 'react'
// TODO: workout should be the in-workout version and the regular version.
export default function InWorkoutWrapper({params}) {
  let currWorkout = {}
  const [hasAccess, setHasAccess] = useState(false)
  const {authReady, user} = useContext(AuthContext) 
  // Get workout data
  useEffect(() => {
    if (authReady) {
      fetch(`${process.env.URL}/.netlify/functions/inworkout?id=${params.id}`, user && { 
        cache: 'no-store',
        headers: {
          Authorization: `Bearer ${user.token.access_token}`,
          'Content-Type': 'application/json'
        }
      }).then(res => res.json())
            .then(data => {
              if (data.message === undefined) { // user does have access
                currWorkout = data.workoutData;
                setHasAccess(true);
              } else {
                setHasAccess(false);
              }
            })
    }
  }, [user, authReady])

  console.log({currWorkout})
  console.log({hasAccess})
 
  return (
    <div>

    </div>
  )
}
