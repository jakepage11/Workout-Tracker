'use client'
import AuthContext from '@/stores/authContext'
import {useState, useContext, useEffect} from 'react'
import InWorkoutContent from "./display"
// TODO: workout should be the in-workout version and the regular version.
export default function InWorkoutWrapper({params}) {
  const [currWorkout, setCurrWorkout] = useState(() => {return {}})
  const [exDescr, setExDescr] = useState(() => {return {}})
  const [hasAccess, setHasAccess] = useState(false)
  const {authReady, user} = useContext(AuthContext) 
  // Get workout data
  useEffect(() => {
    if (authReady) {
      fetch(`/.netlify/functions/inworkout?id=${params.id}`, user && { 
        cache: 'no-store',
        headers: {
          Authorization: `Bearer ${user.token.access_token}`
        }
      }).then(res => res.json()).then(data => {
        if (user && data.message === undefined) {
          // user does have access
          setCurrWorkout(data.workoutData);
          setExDescr(data.ex_descriptions);
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
    <div className='background'>
    {/* Only display the in-workout content for the correct user */}
     {hasAccess && <div>
        <InWorkoutContent workout={currWorkout} exDescrs={exDescr}/>
      </div>}
    </div>
   
    
  )
}
