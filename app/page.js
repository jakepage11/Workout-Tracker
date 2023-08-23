'use client'

import AuthContext from "@/stores/authContext"
import { useContext } from "react"
import UserHomePage from "./UserHomePage"
import styles from "../styles/homepage.module.css"
export default function HomePageWrapper() {
  const {user, authReady} = useContext(AuthContext)
  return (
    <>
      {user && authReady && <UserHomePage />}
      {(!user || !authReady) &&  
        <div className={styles.loggedoutBackground}>
          <h2>No Workouts: not logged in</h2>
        </div>
      }
    </>
    
  )
}