import { createPortal } from "react-dom";
import styles from './ShareModal.module.css'
import modalStyles from './StartWorkoutModal.module.css'
import { useState, useEffect, useContext } from "react";
import dayjs from 'dayjs'
import AuthContext from "@/stores/authContext";

export default function ShareModal({workout, closeModal}) {
  const { user } = useContext(AuthContext)
  const [filterNames, setFilterNames] = useState(() => [])
  useEffect(() => {
    const data = async() => {
      await getUsers(user)
    }
    data();
  }, [])
  console.log({user})

  const utc = require('dayjs/plugin/utc')
  dayjs.extend(utc)
  // Create the date string (either 'Today' or 'MM/DD')
  function createDateStr() {
    const date1 = dayjs().utc(workout.date).format('YYYY-MM-DD');
    const date2 = dayjs().format('YYYY-MM-DD');
    return date1 === date2 ? 'Today' : date1.substring(5)
  }
  const time = dayjs(workout.date).utc().format('h:mm a')

  return createPortal (
    <div onClick={(e) => e.stopPropagation()}>
      {/* Use first div as an overlay that blurs the background */}
      <div className={modalStyles.background} onClick={closeModal}></div>
      {/* Container */}
      <div className={styles.contentContainer}>
        <h2 className="text-3xl flex justify-center p-4">{createDateStr()} @ {time}</h2>
        {/* Search box + Dropdown */}
        <input placeholder="Invite Others" className="h-8 w-[75%] rounded-3xl border-none px-4"></input>
      </div>
      <div>
      </div>
    </div>, 
    document.getElementById('portal-root')
  )
}

async function getUsers(user) {
  // TODO: Make fetch call to get all users in the netlify database
  await fetch('/.netlify/functions/list-users', {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${user.token.access_token}`,
      'Content-Type': 'application/json'
    }
  })
}